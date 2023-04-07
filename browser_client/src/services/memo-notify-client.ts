import { HttpClientAdapter } from "./http-client-adapter";
import { MemoNotifyScheduleRequest } from "./memo-notify-schedule-request";

export class MemoNotifyClient {
    /**
     *
     */
    constructor(private _http: HttpClientAdapter) {
    }

    scheduleMemoNotify(memoRequest: MemoNotifyScheduleRequest): Promise<string | null> {
        return this._http
            .put<MemoNotifyScheduleRequest, string>("/api/scheduler", memoRequest)
            .then(res => res.body);
    }
}