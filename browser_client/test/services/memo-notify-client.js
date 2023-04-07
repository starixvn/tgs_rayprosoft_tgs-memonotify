"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoNotifyClient = void 0;
class MemoNotifyClient {
    /**
     *
     */
    constructor(_http) {
        this._http = _http;
    }
    scheduleMemoNotify(memoRequest) {
        return this._http
            .put("/api/scheduler", memoRequest)
            .then(res => res.body);
    }
}
exports.MemoNotifyClient = MemoNotifyClient;
