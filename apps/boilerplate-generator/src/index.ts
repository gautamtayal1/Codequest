import generateAllBoilerplate from "./generatePartialBoilerplate";
import generateFullBoilerplate from "./generateFullBoilerplate";

generateAllBoilerplate().catch(err => console.error("error: ", err)) 
generateFullBoilerplate().catch(err => console.error("error: ", err)) 