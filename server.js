/*
const fs = require('fs');

const personsJSONList = Object.values(require('./src/data/quotesPersons'));
const quotesJSONList = require('./src/data/quotes');
const newQuotesJSONList = {};
const fileName = './src/dist/quotes.json';

const getPersonId = (personName) => {
    const person = personsJSONList.find(c => c.name.toLowerCase().trim() === personName.toLowerCase().trim());
    if (!person) {
        return -1;
    }
    return person.id;
};

const writeData = (jsonData) => {
    fs.appendFile(fileName, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
        if (err) return console.log(err);
        console.log('Done!');
    });
};

const createNewQuotes = () => {
    const values = Object.keys(quotesJSONList);

    for (let i = 0; i < values.length; i++) {
        const key = values[i];
        const value = quotesJSONList[key];
        const personId = getPersonId(value.name);
        if (personId === -1) {
            continue;
        }
        newQuotesJSONList[key] = {
            quote: value.quote,
            personId: personId,
            categoryId: value.categoryId
        };
    }
    writeData(newQuotesJSONList);
};

createNewQuotes();
 */

// ==================================================

const fs = require('fs');

const isPersonsMode = true;
let quotePersonId = 1;
const quotesJSONList = Object.values(require('./src/data/quotes'));
let personsJSONList = isPersonsMode ? {} : Object.values(require('./src/dist/quotesPersons'));
const personsList = [];
const fileName = `./src/dist/quotes${isPersonsMode ? 'Persons' : ''}.json`;

const removeBreakLines = (text) => {
    return text.replace(/\s+/g, ' ').trim();
};

const createQuotesPersons = (personName) => {
    const personIndex = personsList.findIndex(c => c.name === removeBreakLines(personName).toLowerCase().trim());
    if (personIndex > -1) {
        return;
    }
    const lowerName = personName.toLowerCase();
    personsJSONList[quotePersonId] = {
        name: removeBreakLines(personName)
    };
    personsList.push({
        id: quotePersonId,
        name: removeBreakLines(lowerName).trim()
    });
    quotePersonId++;
};

const getPersonId = (personName) => {
    const category = personsJSONList.find(c => c.name.toLowerCase().trim() === personName.toLowerCase().trim());
    if (!category) {
        return -1;
    }
    return category.id;
};

const writeData = (jsonData) => {
    fs.appendFile(fileName, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
        if (err) return console.log(err);
        console.log('Done!');
    });
};

const createPersonsJSON = () => {
    for (let i = 0; i < quotesJSONList.length; i++) {
        const quote = quotesJSONList[i];
        createQuotesPersons(quote.name);
    }

    personsJSONList =
        Object.values(personsJSONList)
            .sort((a, b) => {
                if (a.name < b.name) { return -1; }
                if (a.name > b.name) { return 1; }
                return 0;
            });
    quotePersonId = 1;
    for (let i = 0; i < personsJSONList.length; i++) {
        const obj = {
            id: quotePersonId,
            name: personsJSONList[i].name,
            profession: ' ',
            wikipediaURL: ' '
        };
        personsJSONList[i] = obj;
        quotePersonId++;
    }
    const arrayToObject = (array) =>
        array.reduce((obj, item) => {
            obj[item.id] = item;
            return obj;
        }, {});
    personsJSONList = arrayToObject(personsJSONList);
    writeData(personsJSONList);
};

createPersonsJSON();

/* (async () => {
    await createPersonsJSON();
})(); */