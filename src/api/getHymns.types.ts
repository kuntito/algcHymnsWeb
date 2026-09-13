type VerseType = "verse" | "chorus";

type HymnVerseApi = {
    id: number;
    verseType: VerseType;
    verseOrder: number;
    verseLines: string[];
}

type HymnApi = {
    id: number;
    title: string;
    updatedAt: Date;
    verses: HymnVerseApi[];
}

interface GetHymnsSuccess {
    success: true;
    hymnCount: number,
    allHymns: HymnApi[],
}

interface GetHymnsFail {
    success: false;
    debug: object;
}

export type GetHymnsResponse = 
    | GetHymnsSuccess | GetHymnsFail;