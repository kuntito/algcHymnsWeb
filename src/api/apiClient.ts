import { envConfig } from "../config/envConfig";
import { GetHymnsResponse } from "./getHymns.types";

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
    }
}

export default algcApiClient;