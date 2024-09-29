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

export { generateRecord };
