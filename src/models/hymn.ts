type VerseType = "verse" | "chorus";

export type HymnVerse = {
    id: number;
    verseType: VerseType;
    verseOrder: number;
    verseLines: string[];   
};


export type Hymn = {
    id: number;
    title: string;
    updatedAt: Date;
    verses: HymnVerse[];
};


export const dummyHymn: Hymn = {
    id: 1,
    title: "Great Is Thy Faithfulness",
    updatedAt: new Date("2026-01-01"),
    verses: [
        {
            id: 0,
            verseType: "verse",
            verseOrder: 1,
            verseLines: [
                "Great is Thy faithfulness, O God my Father",
                "There is no shadow of turning with Thee",
                "Thou changest not, Thy compassions they fail not",
                "As Thou hast been, Thou forever will be"
            ]
        },
        {
            id: 1,
            verseType: "chorus",
            verseOrder: 1,
            verseLines: [
                "Great is Thy faithfulness",
                "Great is Thy faithfulness",
                "Morning by morning new mercies I see",
                "All I have needed Thy hand hath provided",
                "Great is Thy faithfulness, Lord unto me"
            ]
        },
        {
            id: 2,
            verseType: "verse",
            verseOrder: 2,
            verseLines: [
                "Summer and winter and springtime and harvest",
                "Sun, moon and stars in their courses above",
                "Join with all nature in manifold witness",
                "To Thy great faithfulness, mercy and love"
            ]
        },
        {
            id: 3,
            verseType: "chorus",
            verseOrder: 2,
            verseLines: [
                "Great is Thy faithfulness",
                "Great is Thy faithfulness",
                "Morning by morning new mercies I see",
                "All I have needed Thy hand hath provided",
                "Great is Thy faithfulness, Lord unto me"
            ]
        },
    ]
};

