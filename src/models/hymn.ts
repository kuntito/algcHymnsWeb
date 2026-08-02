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


export const listDummyHymns: Hymn[] = [
    { id: 1, title: "Above All Power", updatedAt: new Date(), verses: [] },
    { id: 2, title: "Great Is Thy Faithfulness", updatedAt: new Date(), verses: [] },
    { id: 3, title: "Amazing Grace", updatedAt: new Date(), verses: [] },
    { id: 4, title: "How Great Thou Art", updatedAt: new Date(), verses: [] },
    { id: 5, title: "It Is Well With My Soul", updatedAt: new Date(), verses: [] },
    { id: 6, title: "Blessed Assurance", updatedAt: new Date(), verses: [] },
    { id: 7, title: "Holy Holy Holy", updatedAt: new Date(), verses: [] },
    { id: 8, title: "Be Thou My Vision", updatedAt: new Date(), verses: [] },
    { id: 9, title: "Crown Him With Many Crowns", updatedAt: new Date(), verses: [] },
    { id: 10, title: "To God Be The Glory", updatedAt: new Date(), verses: [] },
    { id: 11, title: "Come Thou Fount", updatedAt: new Date(), verses: [] },
    { id: 12, title: "And Can It Be", updatedAt: new Date(), verses: [] },
    { id: 13, title: "Immortal Invisible", updatedAt: new Date(), verses: [] },
    { id: 14, title: "All Hail The Power", updatedAt: new Date(), verses: [] },
    { id: 15, title: "Fairest Lord Jesus", updatedAt: new Date(), verses: [] },
];
