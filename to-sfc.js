#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const startDir = process.argv[2] || "src";
const maxLines = parseInt(process.argv[3], 10) || 20;

// Helper function to read file content
const readFileContent = (filePath) => {
  return fs.readFileSync(filePath, "utf8");
};

// Helper function to write file content
const writeFileContent = (filePath, content) => {
  fs.writeFileSync(filePath, content, "utf8");
};

// Recursive function to get all TypeScript files ending with '.component.ts' in a directory
const getAllTsFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllTsFiles(filePath, fileList);
    } else if (file.endsWith(".component.ts")) {
      fileList.push(filePath);
    }
  });

  return fileList;
};

// Function to process each TypeScript file
const processTsFile = (filePath, maxLines) => {
  let fileContent = readFileContent(filePath);
  const templateUrlRegex = /templateUrl:\s*'([^']+)'/;

  const match = fileContent.match(templateUrlRegex);
  if (match) {
    const templateUrl = match[1];
    const htmlFilePath = path.join(path.dirname(filePath), templateUrl);

    if (fs.existsSync(htmlFilePath)) {
      const htmlContent = readFileContent(htmlFilePath);
      const lineCount = htmlContent.split("\n").length;

      if (lineCount < maxLines) {
        const newTemplate = `template: \`${htmlContent.replace(/`/g, "\\`")}\``;
        fileContent = fileContent.replace(templateUrlRegex, newTemplate);
        writeFileContent(filePath, fileContent);
        fs.unlinkSync(htmlFilePath); // Delete the HTML file
        console.log(`Updated and deleted: ${htmlFilePath}`);
      } else {
        console.log(`Skipped ${htmlFilePath}: ${lineCount} lines`);
      }
    } else {
      console.error(`HTML file not found: ${htmlFilePath}`);
    }
  }
};

// Main function to execute the script
const main = (startDir, maxLines) => {
  const tsFiles = getAllTsFiles(startDir);

  tsFiles.forEach((file) => {
    processTsFile(file, maxLines);
  });
};

// Execute script
main(startDir, maxLines);
