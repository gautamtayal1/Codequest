"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = generateFullBoilerplate;
var fs = require("fs/promises");
var path = require("path");
function readStructure(filePath) {
    return __awaiter(this, void 0, void 0, function () {
        var content, lines, functionName, inputTypes, outputType, outputName, _i, lines_1, line, parts, _a, type, name_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, fs.readFile(filePath, "utf-8")];
                case 1:
                    content = _b.sent();
                    lines = content.split("\n").filter(function (line) { return line.trim(); });
                    functionName = "";
                    inputTypes = [];
                    outputType = "";
                    outputName = "";
                    for (_i = 0, lines_1 = lines; _i < lines_1.length; _i++) {
                        line = lines_1[_i];
                        parts = line.split(": ");
                        if (line.startsWith("Function Name:") && parts[1]) {
                            functionName = parts[1].trim();
                        }
                        if (line.startsWith("Input Field:") && parts[1]) {
                            inputTypes = parts[1].trim().split(",").map(function (type) { return type.trim(); });
                        }
                        if (line.startsWith("Output Field:") && parts[1]) {
                            _a = parts[1].trim().split(" "), type = _a[0], name_1 = _a[1];
                            outputType = type !== null && type !== void 0 ? type : "";
                            outputName = name_1 !== null && name_1 !== void 0 ? name_1 : "";
                        }
                    }
                    return [2 /*return*/, { functionName: functionName, inputTypes: inputTypes, outputType: outputType, outputName: outputName }];
            }
        });
    });
}
function generateJSBoilerplate(functionName, inputTypes, outputName, basePath) {
    return __awaiter(this, void 0, void 0, function () {
        var boilerplateDir, inputReadCode, jsCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boilerplateDir = path.resolve(basePath, "full-boilerplate");
                    return [4 /*yield*/, fs.mkdir(boilerplateDir, { recursive: true })];
                case 1:
                    _a.sent();
                    inputReadCode = inputTypes.map(function (type, index) {
                        if (type === "int") {
                            return "const param".concat(index, " = parseInt(input.shift());");
                        }
                        else if (type === "int[]") {
                            return "const size_param".concat(index, " = parseInt(input.shift());\nconst param").concat(index, " = input.splice(0, size_param").concat(index, ").map(Number);");
                        }
                        else {
                            return "const param".concat(index, " = input.shift();");
                        }
                    }).join("\n");
                    jsCode = "// ##USER_CODE_HERE##\n\nconst input = require('fs').readFileSync('/dev/stdin', 'utf8').trim().split('\\n').join(' ').split(' ');\n".concat(inputReadCode, "\nconst result = ").concat(functionName, "(").concat(inputTypes.map(function (_, i) { return "param".concat(i); }).join(", "), ");\nconsole.log(result);");
                    return [4 /*yield*/, fs.writeFile(path.resolve(boilerplateDir, "function.js"), jsCode)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function generateCppBoilerplate(functionName, inputTypes, outputType, outputName, basePath) {
    return __awaiter(this, void 0, void 0, function () {
        var boilerplateDir, paramList, cppCode;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    boilerplateDir = path.resolve(basePath, "full-boilerplate");
                    return [4 /*yield*/, fs.mkdir(boilerplateDir, { recursive: true })];
                case 1:
                    _a.sent();
                    paramList = inputTypes.map(function (type, i) { return "".concat(type, " param").concat(i); }).join(", ");
                    cppCode = "#include <iostream>\n#include <vector>\n#include <string>\n\n// ##USER_CODE_HERE##\n\nint main() {\n  int size_arr; std::cin >> size_arr;\n  std::vector<int> arr(size_arr);\n  for(int i = 0; i < size_arr; i++) std::cin >> arr[i];\n\n  int size_arr2; std::cin >> size_arr2;\n  std::vector<int> arr2(size_arr2);\n  for(int i = 0; i < size_arr2; i++) std::cin >> arr2[i];\n\n  int result = ".concat(functionName, "(arr, arr2);\n  std::cout << result << std::endl;\n  return 0;\n}");
                    return [4 /*yield*/, fs.writeFile(path.resolve(boilerplateDir, "function.cpp"), cppCode)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function generateFullBoilerplate() {
    return __awaiter(this, void 0, void 0, function () {
        var problemsDir, problemFolders, _i, problemFolders_1, folder, problemPath, structurePath, _a, functionName, inputTypes, outputType, outputName, err_1, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    problemsDir = path.resolve(process.cwd(), "../problems");
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 11, , 12]);
                    return [4 /*yield*/, fs.readdir(problemsDir, { withFileTypes: true })];
                case 2:
                    problemFolders = _b.sent();
                    _i = 0, problemFolders_1 = problemFolders;
                    _b.label = 3;
                case 3:
                    if (!(_i < problemFolders_1.length)) return [3 /*break*/, 10];
                    folder = problemFolders_1[_i];
                    if (!folder.isDirectory()) return [3 /*break*/, 9];
                    problemPath = path.resolve(problemsDir, folder.name);
                    structurePath = path.resolve(problemPath, "Structure.md");
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 8, , 9]);
                    return [4 /*yield*/, readStructure(structurePath)];
                case 5:
                    _a = _b.sent(), functionName = _a.functionName, inputTypes = _a.inputTypes, outputType = _a.outputType, outputName = _a.outputName;
                    return [4 /*yield*/, generateJSBoilerplate(functionName, inputTypes, outputName, problemPath)];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, generateCppBoilerplate(functionName, inputTypes, outputType, outputName, problemPath)];
                case 7:
                    _b.sent();
                    console.log("Generated boilerplate for ".concat(folder.name));
                    return [3 /*break*/, 9];
                case 8:
                    err_1 = _b.sent();
                    console.error("Error in ".concat(folder.name, ":"), err_1);
                    return [3 /*break*/, 9];
                case 9:
                    _i++;
                    return [3 /*break*/, 3];
                case 10: return [3 /*break*/, 12];
                case 11:
                    err_2 = _b.sent();
                    console.error("Failed to read problems directory:", err_2);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
