import generateAllBoilerplate from "./generatePartialBoilerplate.js";
import generateFullBoilerplate from "./generateFullBoilerplate.js";

generateAllBoilerplate().catch((err: unknown) => console.error("error: ", err)) 
generateFullBoilerplate().catch((err: unknown) => console.error("error: ", err)) 