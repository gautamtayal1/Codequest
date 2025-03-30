import fs from "fs/promises"

export const LANGUAGE_MAPPING : {
  [key: string]: {
    judge0: number;
    internal: number;
    name: string;
    monaco: string
  }
} = {
  js: {judge0: 63, internal: 1, name: "Javascript", monaco: "javascript"},
  cpp: {judge0: 54, internal: 2, name: "C++", monaco: "cpp"}
}

export async function getProblems(slug: string, languageId: string) {
  const path = "../../../problems"
  const fullBoilerplateCode = fs.readFile(`${path}/${slug}/full-boilerplate/function${languageId}`)

  const inputs = await getInputs(slug)
  const outputs = await getOutputs(slug)

  return {
    inputs,
    outputs,
    fullBoilerplateCode
  }
}

async function getInputs(slug: string) : Promise<String[]> {
  const path = `../../../problems/${slug}/tests/inputs`
  const inputsFolder = fs.readdir(path)
  const inputs = await Promise.all((await inputsFolder).map(async(file) => {
    return await fs.readFile(`${path}/${file}`, "utf-8")
  }))
  return inputs
}

async function getOutputs(slug: string) : Promise<String[]> {
  const path = `../../../problems/${slug}/tests/outputs`
  const outputsFolder = fs.readdir(path)
  const outputs = await Promise.all((await outputsFolder).map(async(file) => {
    return await fs.readFile(`${path}/${file}`, "utf-8")
  }))
  return outputs
}