import { envConfig } from "../config/envConfig";
import { DeleteHymnResponse } from "./deleteHymn.types";
import { GetHymnsResponse } from "./getHymns.types";
import { AddHymnRequest, AddHymnResponse } from "./saveHymn.types";

const BASE_URL = envConfig.VITE_ALGC_API_BASE_URL;
const algcApiClient = {
    getHymns: async (

    ): Promise<GetHymnsResponse> => {
        const url = `${BASE_URL}/api/algc/allHymns`;
        const res = await fetch (
            url,
            {
                headers: { 'ngrok-skip-browser-warning': 'true' }
            }
        );

        return res.json();
    },
    addHymn: async (
        reqBody: AddHymnRequest
    ): Promise<AddHymnResponse> => {
        const url = `${BASE_URL}/api/algc/hymn`;
        const res = await fetch(
            url,
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(reqBody),
            }
        );

        return res.json();
    },
    deleteHymn: async (
        hymnId: number
    ): Promise<DeleteHymnResponse> => {
        const url = `${BASE_URL}/api/algc/hymn/${hymnId}`;
        const res = await fetch(
            url,
            {
                method: "DELETE",
                headers: { 'ngrok-skip-browser-warning': 'true' },
            }
        );

        return res.json();
    }
}

export default algcApiClient;