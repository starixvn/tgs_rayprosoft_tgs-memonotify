"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AxiosAdapter = void 0;
class AxiosAdapter {
    /**
     *
     */
    constructor(_instance) {
        this._instance = _instance;
    }
    put(path, request) {
        return this._instance.put(path, request)
            .then(res => {
            return {
                statusCode: res.status,
                body: res.data
            };
        });
    }
}
exports.AxiosAdapter = AxiosAdapter;
