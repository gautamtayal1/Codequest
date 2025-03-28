import * as fs from "fs/promises";
import * as path from "path";

// Read and parse Structure.md
async function readStructure(filePath: string) {
  const content = await fs.readFile(filePath, "utf-8");
  const lines = content.split("\n").filter(line => line.trim());

  let functionName = "";
  let inputType = "";
  let outputType = "";
  let outputName = "";

  for (const line of lines) {
    const parts = line.split(": ");
    if (line.startsWith("Function Name:") && parts[1]) {
      functionName = parts[1].trim();
    }
    if (line.startsWith("Input Field:") && parts[1]) {
      inputType = parts[1].trim();
    }
    if (line.startsWith("Output Field:") && parts[1]) {
      const [type, name] = parts[1].trim().split(" ");
      if (type && name) {
        outputType = type;
        outputName = name;
      }
    }
  }
  return { functionName, inputType, outputType, outputName };
}

// Generate boilerplate for one problem
async function generateBoilerplate(problemPath: string) {
  // Use absolute path resolution to ensure correct file location
  const basePath = path.resolve(__dirname, problemPath);
  const structurePath = path.join(basePath, "Structure.md");
  
  console.log("Looking for Structure.md at:", structurePath);
  
  try {
    const { functionName, inputType, outputType, outputName } = await readStructure(structurePath);

    const boilerplateDir = path.join(basePath, "boilerplate");
    await fs.mkdir(boilerplateDir, { recursive: true });

    const jsCode = `function ${functionName}(list) {\n  // Your code here\n  return ${outputName};\n}`;
    await fs.writeFile(path.join(boilerplateDir, "function.js"), jsCode);

    const cppCode = `#include <vector>\n${outputType} ${functionName}(std::vector<${outputType}> list) {\n  // Your code here\n  return ${outputName};\n}`;
    await fs.writeFile(path.join(boilerplateDir, "function.cpp"), cppCode);

    console.log("Generated boilerplate files in", boilerplateDir);
  } catch (err) {
    console.error("Error reading Structure.md:", err);
    throw err;
  }
}

export default async function generateAllBoilerplate() {
  const problemsDir = path.join(__dirname, "../../problems")
  const entries = await fs.readdir(problemsDir, {withFileTypes: true})

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const problemPath = path.join(problemsDir, entry.name)
      try{
        await generateBoilerplate(problemPath)
      } catch (err) {
        console.error("failed to process: ", entry.name)
      }
    }
  }
}
