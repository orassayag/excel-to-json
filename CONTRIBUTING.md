# Contributing

Contributions to this project are [released](https://help.github.com/articles/github-terms-of-service/#6-contributions-under-repository-license) to the public under the [project's open source license](LICENSE).

Everyone is welcome to contribute to this project. Contributing doesn't just mean submitting pull requests—there are many different ways for you to get involved, including answering questions, reporting issues, improving documentation, or suggesting new features.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request:
1. Check if the issue already exists in the [GitHub Issues](https://github.com/orassayag/excel-to-json/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Your environment details (OS, Node version)
   - Sample data files (if applicable)

### Submitting Pull Requests

1. Fork the repository
2. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes following the code style guidelines below
4. Test your changes with sample data
5. Commit with clear, descriptive messages
6. Push to your fork and submit a pull request

### Code Style Guidelines

This project uses:
- **JavaScript (ES6+)** with Node.js
- **ESLint** for code quality

Before submitting:
```bash
# Install dependencies
npm install

# Test the conversion
npm start
```

### Coding Standards

1. **Naming**: Use clear, descriptive names for variables and functions
2. **Error handling**: Include proper error handling for file operations
3. **Comments**: Add comments to explain complex logic
4. **Modularity**: Keep functions focused on single responsibilities
5. **File paths**: Use relative paths that work across different environments

### Adding New Features

When adding new features:
1. Update the main conversion logic in `back-server.js`
2. Add new service functions if needed in `src/services/`
3. Update configuration in `src/settings/settings.js` if required
4. Test with various data formats
5. Update documentation (README.md and INSTRUCTIONS.md)

### Testing Your Changes

Test the application with:
- Various Excel file formats (.xlsx)
- Text files with different quote structures
- Edge cases (empty fields, special characters, duplicate entries)
- Large datasets to ensure performance

## Questions or Need Help?

Please feel free to contact me with any question, comment, pull-request, issue, or any other thing you have in mind.

* Or Assayag <orassayag@gmail.com>
* GitHub: https://github.com/orassayag
* StackOverflow: https://stackoverflow.com/users/4442606/or-assayag?tab=profile
* LinkedIn: https://linkedin.com/in/orassayag

Thank you for contributing! 🙏
