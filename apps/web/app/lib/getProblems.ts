import fs from "fs/promises"
import path from "path"

const basePath = "/app/apps/problems"


export async function getProblems(slug: string, languageId: string) {
  const fullBoilerplateCode = fs.readFile(
    path.join(basePath, slug, "full-boilerplate", `function.${languageId}`),
    "utf-8"
  )

  const inputs = await getInputs(slug)
  const outputs = await getOutputs(slug)

  return {
    inputs,
    outputs,
    fullBoilerplateCode,
  }
}

async function getInputs(slug: string): Promise<string[]> {
  const dir = path.join(basePath, slug, "tests", "inputs")
  const files = await fs.readdir(dir)
  return Promise.all(files.map((file) => fs.readFile(path.join(dir, file), "utf-8")))
}

async function getOutputs(slug: string): Promise<string[]> {
  const dir = path.join(basePath, slug, "tests", "outputs")
  const files = await fs.readdir(dir)
  return Promise.all(files.map((file) => fs.readFile(path.join(dir, file), "utf-8")))
}
