import express, { json } from "express";
import cors from "cors";
import { Parser } from "json2csv";
import { faker as fakerEN } from "@faker-js/faker/locale/en_US";
import { faker as fakerMX } from "@faker-js/faker/locale/es_MX";
import { faker as fakerFR } from "@faker-js/faker/locale/fr";
import { generateRecord } from "./generateRecord.js";

const recordsPerPage = 10;
const app = express();
app.use(cors());
app.use(json());

app.get("/api/generate", (req, res) => {
    let { region, seed, page } = req.query;
    seed = parseInt(seed) || 0;
    page = parseInt(page) || 1;

    let fakerInstance;

    switch (region) {
        case "Mexico":
            fakerInstance = fakerMX;
            break;
        case "USA":
            fakerInstance = fakerEN;
            break;
        case "France":
            fakerInstance = fakerFR;
            break;
        default:
            fakerInstance = fakerEN;
    }

    fakerInstance.seed(seed + page);

    const data = [];
    for (let i = 0; i < recordsPerPage; i++) {
        const index = i + (page - 1) * recordsPerPage;
        const record = generateRecord(index, fakerInstance);
        data.push(record);
    }

    res.json(data);
});

app.post("/api/export", (req, res) => {
    const fields = ["index", "identifier", "name", "address", "city", "phone"];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(req.body.data);

    res.header("Content-Type", "text/csv");
    res.attachment("data.csv");
    return res.send(csv);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
