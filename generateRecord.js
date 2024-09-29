function generateRecord(index, faker) {
    const record = {
        index: index,
        identifier: faker.string.uuid(),
        name: `${faker.person.firstName()} ${faker.person.lastName()}`,
        address: faker.location.streetAddress({ useFullAddress: true }),
        city: faker.location.city(),
        phone: faker.phone.number({ style: "international" }),
    };

    return record;
}

// Existing error introduction logic...
/*     const maxErrors = Math.floor(errorsPerRecord);
    const additionalErrorProbability = errorsPerRecord - maxErrors;
    let totalErrors = maxErrors;

    if (Math.random() < additionalErrorProbability) {
        totalErrors += 1;
    }

    for (let i = 0; i < totalErrors; i++) {
        applyRandomError(record, faker);
    }

function applyRandomError(record, faker) {
    const fields = ["name", "address", "city", "phone"];
    const field = fields[Math.floor(Math.random() * fields.length)];
    const errorType = Math.floor(Math.random() * 3);

    switch (errorType) {
        case 0:
            record[field] = deleteRandomCharacter(record[field]);
            break;
        case 1:
            record[field] = addRandomCharacter(record[field], faker);
            break;
        case 2:
            record[field] = swapAdjacentCharacters(record[field]);
            break;
    }
}

function deleteRandomCharacter(str) {
    if (str.length === 0) return str;
    const index = Math.floor(Math.random() * str.length);
    return str.slice(0, index) + str.slice(index + 1);
}

function addRandomCharacter(str, faker) {
    const index = Math.floor(Math.random() * (str.length + 1));
    const char = faker.string.alpha({ length: 1 });
    return str.slice(0, index) + char + str.slice(index);
}

function swapAdjacentCharacters(str) {
    if (str.length < 2) return str;
    const index = Math.floor(Math.random() * (str.length - 1));
    return str.slice(0, index) + str[index + 1] + str[index] + str.slice(index + 2);
} */

export { generateRecord };
