const fs = require("fs");
const path = require("path");

// Helper function to read file content
const readFileContent = (filePath) => {
  return fs.readFileSync(filePath, "utf8");
};

// Helper function to write file content
const writeFileContent = (filePath, content) => {
  fs.writeFileSync(filePath, content, "utf8");
};

// Recursive function to get all TypeScript files in a directory
const getAllTsFiles = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);

  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllTsFiles(filePath, fileList);
    } else if (file.endsWith(".ts")) {
      fileList.push(filePath);
    }
  });

  return fileList;
};

// Function to process each TypeScript file
const processTsFile = (filePath) => {
  let fileContent = readFileContent(filePath);
  const templateRegex = /template:\s*`([^`]+)`/;

  const match = fileContent.match(templateRegex);
  if (match) {
    const templateContent = match[1];
    const fileName = path.basename(filePath, ".ts");
    const htmlFileName = `${fileName}.component.html`.replace(
      "component.component",
      "component"
    );
    const htmlFilePath = path.join(path.dirname(filePath), htmlFileName);

    writeFileContent(htmlFilePath, templateContent);
    const newTemplateUrl = `templateUrl: '${htmlFileName}'`;
    fileContent = fileContent.replace(templateRegex, newTemplateUrl);
    writeFileContent(filePath, fileContent);
    console.log(`Reversed and created: ${htmlFilePath}`);
  }
};

// Main function to execute the script
const main = (startDir) => {
  const tsFiles = getAllTsFiles(startDir);

  tsFiles.forEach((file) => {
    processTsFile(file);
  });
};

// Starting directory
const startDir = process.argv[2] || "src";

// Execute script
main(startDir);
