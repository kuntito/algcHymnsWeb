import { HymnApi } from "./getHymns.types";

interface UpdateHymnSuccess {
    success: true;
    hymn: HymnApi;
}

interface UpdateHymnFail {
    success: false;
    clientErrorMessage?: string;
    debug?: object;
}

export type UpdateHymnResponse = 
    | UpdateHymnSuccess | UpdateHymnFail;