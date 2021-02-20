const fs = require('fs');
const XLSX = require('xlsx');
const readline = require('readline');

let quoteId = 1;
let quoteCategoryId = 1;
let quotePersonId = 1;
const isCategoryMode = false;
const isPersonMode = false;
const categoriesList = [];
const personsList = [];
let categoriesJSONList = isCategoryMode ? {} : Object.values(require('./src/dist/quotesCategories'));
let personsJSONList = isPersonMode ? {} : Object.values(require('./src/dist/quotesPersons'));
const fileName = `./src/dist/quotes${isCategoryMode ? 'Categories' : isPersonMode ? 'Persons' : ''}.json`;

const removeBreakLines = (text) => {
    return text.replace(/\s+/g, ' ').trim();
};

const removeDuplicateSpaces = (text) => {
    return text.replace(/ +(?= )/g, '');
};

const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};

const createQuotesCategories = (categoryName) => {
    const categoryIndex = categoriesList.findIndex(c => c.name === removeBreakLines(categoryName).toLowerCase().trim());
    if (categoryIndex > -1) {
        return;
    }
    const lowerName = categoryName.toLowerCase();
    categoriesJSONList[quoteCategoryId] = {
        name: removeBreakLines(capitalize(lowerName))
    };
    categoriesList.push({
        id: quoteCategoryId,
        name: removeBreakLines(lowerName).trim()
    });
    quoteCategoryId++;
};

const getCategoryId = (categoryName) => {
    const category = categoriesJSONList.find(c => c.name.toLowerCase().trim() === categoryName.toLowerCase().trim());
    if (!category) {
        return -1;
    }
    return category.id;
};

const createQuotesPersons = (personName) => {
    const personIndex = personsList.findIndex(c => c.name === removeBreakLines(personName).toLowerCase().trim());
    if (personIndex > -1) {
        return;
    }
    const lowerName = personName.toLowerCase();
    personsJSONList[quotePersonId] = {
        name: removeBreakLines(capitalize(lowerName))
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

const asyncForEach = async (array, callback) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
};

const fixQuote = (text) => {
    text = removeDuplicateSpaces(text);
    text = text.trim();
    return text;
};

const fixName = (name) => {
    if (name.indexOf(', ') > -1) {
        const splitName = name.split(',');
        name = `${splitName[1].trim()} ${splitName[0]}`;
    }
    return name;
};

const getJSONDataXLSX = () => {
    return new Promise(async (resolve, reject) => {
        const workbook = XLSX.readFile('./src/data/quotes.xlsx');
        const sheetNameList = workbook.SheetNames;
        const jsonData = {};
        await asyncForEach(sheetNameList, (y) => {
            const sheet = workbook.Sheets[y];
            const objectsList = Object.keys(sheet);
            for (let i = 1; i < objectsList.length; i = i + 3) {
                const currentId = parseInt(objectsList[i].replace(/^\D+/g, ''));
                const object = sheet[`A${currentId}`];
                if (!object) {
                    break;
                }
                let quote = sheet[`A${currentId}`].v;
                let name = sheet[`B${currentId}`].v;
                const categoryName = sheet[`C${currentId}`].v;
                if (!name || !quote || quote === 'Quotes' || !categoryName) {
                    continue;
                }
                else {
                    if (isCategoryMode) {
                        createQuotesCategories(categoryName);
                    }
                    else {
                        const categoryId = getCategoryId(categoryName);
                        if (categoryId === -1) {
                            continue;
                        }
                        quote = fixQuote(quote);
                        name = fixName(name);
                        if (!quote || !name) {
                            continue;
                        }
                        jsonData[quoteId] = {
                            quote: quote,
                            name: name,
                            categoryId: categoryId
                        };
                        quoteId++;
                    }
                }
            }
        });
        resolve(jsonData);
    });
};

const getJSONDataTXT = () => {
    return new Promise(async (resolve, reject) => {
        const fileStream = fs.createReadStream('./src/data/quotes.txt');
        const jsonData = {};
        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        for await (const line of rl) {
            if (!line) {
                continue;
            }
            const splitLine = line.split(';');
            let quote = splitLine[1];
            let name = splitLine[2];
            const categoryName = splitLine[3];
            if (!name || !quote || !categoryName) {
                continue;
            }
            else {
                const categoryId = getCategoryId(categoryName);
                if (categoryId === -1) {
                    continue;
                }
                quote = fixQuote(quote);
                name = fixName(name);
                if (!quote || !name) {
                    continue;
                }
                jsonData[quoteId] = {
                    quote: quote,
                    name: name,
                    categoryId: categoryId
                };
                quoteId++;
            }
        }
        resolve(jsonData);
    });
};

const writeData = (jsonData) => {
    fs.appendFile(fileName, JSON.stringify(jsonData, null, 2), 'utf-8', (err) => {
        if (err) return console.log(err);
        console.log('Done!');
    });
};

(async () => {
    const jsonDataXLSX = await getJSONDataXLSX();
    const jsonDataTXT = await getJSONDataTXT();
    if (isCategoryMode && !isPersonMode) {
        categoriesJSONList =
            Object.values(categoriesJSONList)
                .sort((a, b) => {
                    if (a.name < b.name) { return -1; }
                    if (a.name > b.name) { return 1; }
                    return 0;
                });
        quoteCategoryId = 1;
        for (let i = 0; i < categoriesJSONList.length; i++) {
            const obj = {
                id: quoteCategoryId,
                name: categoriesJSONList[i].name,
                iconName: ' '
            };
            categoriesJSONList[i] = obj;
            quoteCategoryId++;
        }
        const arrayToObject = (array) =>
            array.reduce((obj, item) => {
                obj[item.id] = item;
                return obj;
            }, {});
        categoriesJSONList = arrayToObject(categoriesJSONList);
        writeData(categoriesJSONList);
    }
    else if (!isCategoryMode && isPersonMode) {

    }
    else {
        writeData(jsonDataXLSX);
        writeData(jsonDataTXT);
    }
})();