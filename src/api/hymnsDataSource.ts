import { safeApiCall } from "../util";
import algcApiClient from "./apiClient";
import { AddHymnRequest } from "./saveHymn.types";

export const hymnsDataSource = {
    getHymns: () => safeApiCall(
        () => algcApiClient.getHymns(),
        "fetches all hymns from the api"
    ),
    addHymn: (reqBody: AddHymnRequest) => safeApiCall(
        () => algcApiClient.addHymn(reqBody),
        "adds a new hymn through the api"
    ),
    deleteHymn: (hymnId: number) => safeApiCall(
        () => algcApiClient.deleteHymn(hymnId),
        "deletes a hymn"
    ),
}