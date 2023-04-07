export class MemoNotifyClient {
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
