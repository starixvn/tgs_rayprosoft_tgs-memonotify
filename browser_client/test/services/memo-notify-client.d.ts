import { HttpClientAdapter } from "./http-client-adapter";
import { MemoNotifyScheduleRequest } from "./memo-notify-schedule-request";
export declare class MemoNotifyClient {
    private _http;
    /**
     *
     */
    constructor(_http: HttpClientAdapter);
    scheduleMemoNotify(memoRequest: MemoNotifyScheduleRequest): Promise<string | null>;
}
