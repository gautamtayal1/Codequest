"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var generatePartialBoilerplate_1 = require("./generatePartialBoilerplate");
var generateFullBoilerplate_1 = require("./generateFullBoilerplate");
(0, generatePartialBoilerplate_1.default)().catch(function (err) { return console.error("error: ", err); });
(0, generateFullBoilerplate_1.default)().catch(function (err) { return console.error("error: ", err); });
