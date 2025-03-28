import generateAllBoilerplate from "./generatePartialBoilerplate";
import generateFullBoilerplate from "./generteFullBoilerplate";

generateAllBoilerplate().catch(err => console.error("error: ", err)) 
generateFullBoilerplate().catch(err => console.error("error: ", err)) 