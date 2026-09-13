import { safeApiCall } from "../util";
import algcApiClient from "./apiClient";

export const hymnsDataSource = {
    getHymns: () => safeApiCall(
        () => algcApiClient.getHymns(),
        "fetches all hymns from the api"
    )
}