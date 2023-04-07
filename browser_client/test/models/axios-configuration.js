"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
function axiosConfigFactory(channelName, isWindows) {
    if (isWindows)
        return axios_1.default.create({
            baseURL: "http://localhost",
            socketPath: `\\\\.\\pipe\\${channelName}`,
            headers: {
                common: {
                    "Host": "localhost",
                }
            },
            insecureHTTPParser: true
        });
    else
        return axios_1.default.create({
            baseURL: "http://localhost",
            socketPath: `/tmp/${channelName}.sock`,
            headers: {
                common: {
                    "Host": "localhost",
                    "Accept-Encoding": ["gzip", "compress", "deflate"],
                }
            }
        });
}
exports.default = axiosConfigFactory;
