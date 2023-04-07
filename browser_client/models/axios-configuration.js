import axios from "axios";
export default function axiosConfigFactory(channelName, isWindows) {
    if (isWindows)
        return axios.create({
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
        return axios.create({
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
