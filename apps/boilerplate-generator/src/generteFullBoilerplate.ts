import * as fs from "fs/promises";
import * as path from "path";

async function readStructure(filePath: string) {
  const content = await fs.readFile(filePath, "utf-8");
  const lines = content.split("\n").filter(line => line.trim());

  let functionName = "";
  let inputTypes: string[] = [];
  let outputType = "";
  let outputName = "";

  for (const line of lines) {
    const parts = line.split(": ");
    if (line.startsWith("Function Name:") && parts[1]) {
      functionName = parts[1].trim();
    }
    if (line.startsWith("Input Field:") && parts[1]) {
      inputTypes = parts[1].trim().split(",").map(type => type.trim());
    }
    if (line.startsWith("Output Field:") && parts[1]) {
      const [type, name] = parts[1].trim().split(" ");
      outputType = type ?? "";
      outputName = name ?? "";
    }
  }
  return { functionName, inputTypes, outputType, outputName };
}

async function generateJSBoilerplate(functionName: string, inputTypes: string[], outputName: string, basePath: string) {
  const boilerplateDir = path.resolve(basePath, "full-boilerplate");
  await fs.mkdir(boilerplateDir, { recursive: true });

  const paramList = inputTypes.map((_, i) => `param${i}`).join(", ");
  
  const jsCode = `function ${functionName}(${paramList}) {
  // Your code here
  return ${outputName};
}`;
  await fs.writeFile(path.resolve(boilerplateDir, "function.js"), jsCode);
}

async function generateCppBoilerplate(functionName: string, inputTypes: string[], outputType: string, outputName: string, basePath: string) {
  const boilerplateDir = path.resolve(basePath, "full-boilerplate");
  await fs.mkdir(boilerplateDir, { recursive: true });

  const paramList = inputTypes.map((type, i) => `${type} param${i}`).join(", ");

  const cppCode = `${outputType} ${functionName}(${paramList}) {
  // Your code here
  return ${outputName};
}`;
  await fs.writeFile(path.resolve(boilerplateDir, "function.cpp"), cppCode);
}

// Generate for All Problems

export default async function generateFullBoilerplate() {
  const problemsDir = path.resolve(process.cwd(), "../problems");
  try {
    const problemFolders = await fs.readdir(problemsDir, { withFileTypes: true });

    for (const folder of problemFolders) {
      if (folder.isDirectory()) {
        const problemPath = path.resolve(problemsDir, folder.name);
        const structurePath = path.resolve(problemPath, "Structure.md");

        try {
          const { functionName, inputTypes, outputType, outputName } = await readStructure(structurePath);

          await generateJSBoilerplate(functionName, inputTypes, outputName, problemPath);
          await generateCppBoilerplate(functionName, inputTypes, outputType, outputName, problemPath);

          console.log(`Generated boilerplate for ${folder.name}`);
        } catch (err) {
          console.error(`Error in ${folder.name}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("Failed to read problems directory:", err);
  }
}
