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

  const inputReadCode = inputTypes.map((type, index) => {
    if (type === "int") {
      return `const param${index} = parseInt(input.shift());`;
    } else if (type === "int[]") {
      return `const size_param${index} = parseInt(input.shift());\nconst param${index} = input.splice(0, size_param${index}).map(Number);`;
    } else {
      return `const param${index} = input.shift();`;
    }
  }).join("\n");

  const jsCode = `// ##USER_CODE_HERE##\n\nconst input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n').join(' ').split(' ');
${inputReadCode}\nconst result = ${functionName}(${inputTypes.map((_, i) => `param${i}`).join(", ")});\nconsole.log(result);`;

  await fs.writeFile(path.resolve(boilerplateDir, "function.js"), jsCode);
}

async function generateCppBoilerplate(functionName: string, inputTypes: string[], outputType: string, outputName: string, basePath: string) {
  const boilerplateDir = path.resolve(basePath, "full-boilerplate");
  await fs.mkdir(boilerplateDir, { recursive: true });

  const paramList = inputTypes.map((type, i) => `${type} param${i}`).join(", ");
  const cppCode = `#include <iostream>\n#include <vector>\n#include <string>\n\n// ##USER_CODE_HERE##\n\nint main() {\n  int size_arr; std::cin >> size_arr;\n  std::vector<int> arr(size_arr);\n  for(int i = 0; i < size_arr; i++) std::cin >> arr[i];\n\n  int size_arr2; std::cin >> size_arr2;\n  std::vector<int> arr2(size_arr2);\n  for(int i = 0; i < size_arr2; i++) std::cin >> arr2[i];\n\n  int result = ${functionName}(arr, arr2);\n  std::cout << result << std::endl;\n  return 0;\n}`;

  await fs.writeFile(path.resolve(boilerplateDir, "function.cpp"), cppCode);
}

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

        } catch (err) {
          console.error(`Error in ${folder.name}:`, err);
        }
      }
    }
  } catch (err) {
    console.error("Failed to read problems directory:", err);
  }
}
