import { HymnApi, VerseType } from "./getHymns.types";

/// request
type AddHymnVerseRequest = {
    verseType: VerseType;
    verseOrder: number;
    lines: string[];
};

export type AddHymnRequest = {
    title: string;
    hymnVerses: AddHymnVerseRequest[];
};


/// response
interface AddHymnSuccess {
    success: true;
    hymn: HymnApi;
}

interface AddHymnFail {
    success: false;
    clientErrorMessage?: string;
    debug?: object;
}

export type AddHymnResponse = 
    | AddHymnSuccess | AddHymnFail;