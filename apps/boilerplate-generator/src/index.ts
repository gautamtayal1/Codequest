import * as fs from "fs/promises";
import * as path from "path";

interface Structure {
  functionName: string;
  inputs: { type: string; name: string }[];
  output: { type: string; name: string };
}

async function parseStructure(structurePath: string): Promise<Structure> {
  const content = await fs.readFile(structurePath, "utf-8");
  const lines = content.split("\n").filter(line => line.trim());
  let functionName = "";
  const inputs: { type: string; name: string }[] = [];
  let output = { type: "", name: "" };

  for (const line of lines) {
    if (line.startsWith("Function Name:")) {
      functionName = line.split(": ")[1]?.trim() || "";
    } else if (line.startsWith("Input Field:")) {
      const [, field] = line.split(": ");
      const type = field?.trim() || "";
      inputs.push({ type, name: `param${inputs.length + 1}` });
    } else if (line.startsWith("Output Field:")) {
      const [, field] = line.split(": ");
      if (field) {
        const [type, name] = field.trim().split(" ");
        output = { type: type || "", name: name || "" };
      }
    }
  }

  if (!functionName || !output.type) {
    throw new Error("Invalid structure.md: missing Function Name or Output Field");
  }

  return { functionName, inputs, output };
}

async function generateBoilerplate(problemPath: string) {
  const structurePath = path.join(problemPath, "structure.md");
  const structure = await parseStructure(structurePath);

  const languages = [
    {
      name: "javascript",
      judge0Id: 63,
      typeMap: (type: string) => (type === "list<int>" ? "number[]" : ""),
      extension: "js",
    },
    {
      name: "cpp",
      judge0Id: 54,
      typeMap: (type: string) => (type === "list<int>" ? "vector<int>" : type),
      extension: "cpp",
    },
  ];

  const boilerplateDir = path.join(problemPath, "boilerplate");
  await fs.mkdir(boilerplateDir, { recursive: true });

  for (const lang of languages) {
    const inputParams = structure.inputs
      .map(i => (lang.name === "javascript" ? i.name : `${lang.typeMap(i.type)} ${i.name}`))
      .join(", ");
    const returnType = lang.name === "javascript" ? "" : `${lang.typeMap(structure.output.type)} `;
    const code =
      lang.name === "javascript"
        ? `function ${structure.functionName}(${inputParams}) {\n  // Your code here\n  return ${structure.output.name};\n}`
        : lang.name === "cpp" && structure.inputs.some(i => i.type === "list<int>")
        ? `#include <vector>\n${returnType}${structure.functionName}(${inputParams}) {\n  // Your code here\n  return ${structure.output.name};\n}`
        : `${returnType}${structure.functionName}(${inputParams}) {\n  // Your code here\n  return ${structure.output.name};\n}`;

    await fs.writeFile(`${boilerplateDir}/function.${lang.extension}`, code, "utf-8");
    console.log(`Generated ${lang.name} boilerplate at ${boilerplateDir}/function.${lang.extension}`);
  }
}

generateBoilerplate("../../problems").catch(err => console.error("Error:", err));