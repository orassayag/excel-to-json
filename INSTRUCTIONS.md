# Setup and Usage Instructions

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Initial Setup](#initial-setup)
3. [Configuration](#configuration)
4. [Available Commands](#available-commands)
5. [Running Scripts](#running-scripts)
6. [File Structure](#file-structure)
7. [Data Format](#data-format)
8. [Processing Features](#processing-features)
9. [Development](#development)
10. [Best Practices](#best-practices)
11. [Extending the Application](#extending-the-application)
12. [Documentation](#documentation)
13. [External Resources](#external-resources)
14. [Troubleshooting](#troubleshooting)
15. [Author](#author)

## Prerequisites

### System Requirements

- **Node.js**: Version 8 or higher
- **Package Manager**: npm or yarn
- **Operating System**: Windows, macOS, or Linux
- **Memory**: 512MB RAM minimum
- **Disk Space**: 100MB for application and dependencies

### Knowledge Prerequisites

- Basic understanding of command line/terminal
- Familiarity with JSON format

## Initial Setup

### 1. Install Dependencies

**Using npm (recommended):**

```bash
npm install
```

**Using yarn:**

```bash
yarn install
```

### 2. Open the Project

Open the project in your IDE (VSCode recommended).

## Configuration

### Settings File

Open `src/settings/settings.js` and configure:

- `NODE_ENV`: Environment mode (default: 'development')
- `SERVER_PORT`: Port for the HTTP server (default: '3001')

### Data Files

Place your source data files in the `src/data/` directory:

- **Excel files**: `quotes.xlsx` with columns:
  - Column A: Quote text
  - Column B: Person name (format: "FirstName LastName" or "LastName, FirstName")
  - Column C: Category name
- **Text files**: `quotes.txt` with semicolon-separated format:
  ```
  ID;Quote;Person Name;Category
  ```

## Available Commands

### Development Commands

**Start Application:**

```bash
# Run the conversion
npm start
```

**Debug Mode:**

```bash
# Run with Node.js debugger
npm run debug
```

**Stop Server:**

```bash
# Stop all Node.js processes (Windows)
npm run stop
```

## Running Scripts

### Convert Excel to JSON

Converts Excel and text files to JSON format:

```bash
npm start
```

**What it does:**

- Reads data from `src/data/quotes.xlsx` and `src/data/quotes.txt`
- Processes quotes, persons, and categories
- Generates JSON files in `src/dist/` directory
- Normalizes names (converts "LastName, FirstName" to "FirstName LastName")
- Removes duplicate spaces and fixes formatting
- Creates unique IDs for persons and categories

### Generate Categories

Set `isCategoryMode = true` in `back-server.js` to extract categories:

```bash
node back-server.js
```

**Output**: `src/dist/quotesCategories.json` with category objects

### Generate Persons

Set `isPersonMode = true` in `back-server.js` to extract person information:

```bash
node back-server.js
```

**Output**: `src/dist/quotesPersons.json` with person objects

### Create Quotes with IDs

With both modes set to `false`, generates quotes with linked IDs:

```bash
node back-server.js
```

**Output**: `src/dist/quotes.json` with quotes linked to person and category IDs

## File Structure

### Source Files (`src/data/`)

- `quotes.xlsx` - Excel file with quotes data
- `quotes.txt` - Text file with semicolon-separated quotes

### Output Files (`src/dist/`)

- `quotes.json` - Main quotes data with linked IDs
- `quotesCategories.json` - Categories with IDs and metadata
- `quotesPersons.json` - Persons with IDs and metadata

### Configuration

- `src/settings/settings.js` - Application settings
- `src/services/error.service.js` - Error handling utilities

## Data Format

### Input Excel Format

```
| Quote                           | Person           | Category    |
|---------------------------------|------------------|-------------|
| "To be or not to be..."         | Shakespeare      | Philosophy  |
| "I think, therefore I am"       | Descartes, René  | Philosophy  |
```

### Output JSON Format

**Quotes:**

```json
{
  "1": {
    "quote": "To be or not to be...",
    "name": "Shakespeare",
    "categoryId": 1
  }
}
```

**Categories:**

```json
{
  "1": {
    "id": 1,
    "name": "Philosophy",
    "iconName": " "
  }
}
```

**Persons:**

```json
{
  "1": {
    "id": 1,
    "name": "Shakespeare",
    "profession": " ",
    "wikipediaURL": " "
  }
}
```

## Processing Features

### Name Normalization

- Converts "LastName, FirstName" format to "FirstName LastName"
- Trims whitespace
- Removes duplicate spaces

### Text Cleaning

- Removes line breaks within quotes
- Consolidates multiple spaces
- Trims leading/trailing whitespace

### Duplicate Prevention

- Checks for existing persons and categories
- Reuses IDs for duplicate entries
- Maintains data consistency

## Development

### Debug Mode

Run the application with debugging enabled:

```bash
npm run debug
```

### Stop Server

Stop all running Node.js processes:

```bash
npm run stop
```

## Best Practices

### For Data Preparation

1. **Clean Source Data**: Ensure Excel and text files have consistent formatting
2. **Use Consistent Naming**: Follow "FirstName LastName" or "LastName, FirstName" for authors
3. **Validate Categories**: Use consistent category names to avoid duplicates
4. **Backup Original Data**: Keep copies of source files before processing

### For Development

1. **Test with Sample Data**: Use small datasets for testing
2. **Check Outputs**: Verify generated JSON files after processing
3. **Version Control**: Commit changes before making major modifications
4. **Document Changes**: Keep track of modifications to the processing logic

## Extending the Application

To add new features or modify existing functionality:

1. **Main Script**: Edit `back-server.js` for core processing logic
2. **Settings**: Modify `src/settings/settings.js` for configuration
3. **Services**: Add new utility functions in `src/services/`
4. **Error Handling**: Extend `src/services/error.service.js` for custom errors

## Documentation

- [README.md](README.md) - Project overview and features
- [CONTRIBUTING.md](CONTRIBUTING.md) - Development guidelines
- [CHANGELOG.md](CHANGELOG.md) - Version history

## External Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [xlsx Library Documentation](https://github.com/SheetJS/sheetjs)
- [JSON Format Specification](https://www.json.org/)

## Notes

- The application requires read permissions for `src/data/` directory
- Ensure proper write permissions for `src/dist/` directory
- All output files use UTF-8 encoding
- Empty or invalid entries are skipped during processing
- The first row in Excel files (headers) is automatically skipped
- Category and person names are case-insensitive for duplicate detection

## Troubleshooting

### Common Issues

**File not found errors:**

- Verify data files exist in `src/data/` directory
- Check file names match exactly: `quotes.xlsx` and `quotes.txt`

**Empty output files:**

- Ensure Excel file has correct column structure (A: Quote, B: Person, C: Category)
- Verify text file uses semicolon separators
- Check that data rows contain all required fields

**Server port in use:**

- Change `SERVER_PORT` in `src/settings/settings.js`
- Or stop existing Node processes with `npm run stop`

## Author

- **Or Assayag** - _Initial work_ - [orassayag](https://github.com/orassayag)
- Or Assayag <orassayag@gmail.com>
- GitHub: https://github.com/orassayag
- StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
- LinkedIn: https://linkedin.com/in/orassayag

## Last Updated

**Last Updated**: June 2026
**Version**: 1.0.0
