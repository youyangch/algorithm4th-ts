"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readline = void 0;
const fs_1 = __importDefault(require("fs"));
function readline(filename) {
    return new Promise((resolve, reject) => {
        fs_1.default.readFile(filename, (err, buffer) => {
            if (err) {
                reject(err);
            }
            else {
                let data = buffer.toString().split(/\n|\r\n/);
                resolve(data);
            }
        });
    });
}
exports.readline = readline;
