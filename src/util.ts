import { Hymn } from "./models/hymn";

/**
 * wraps an API call in a try-catch block.
 *
 * if the call fails, it logs the error along with fnDesc.
 * fnDesc should describe what the call does — enough for a debugger to know what failed.
 *
 * returns null on failure.
 */
export const safeApiCall = async <T>(
    fn: () => Promise<T>,
    fnDesc: string,
): Promise<T | null> => {
    try {
        return await fn();
    } catch (e) {
        console.log(
            `api call failed: '${fnDesc}'`,
            e
        );
    }
    return null;
}


export type HymnMatchSource = "title" | "lyrics";

export type SearchedHymn = Hymn & {
    matchSource: HymnMatchSource;
};

/**
 * finds hymns that contain the query in their title or lyrics.
 *
 * title matches come first, then hymns that only match in their lyrics.
 * each result is tagged with where the match happened, so the UI can
 * show it.
 *
 * an empty query returns nothing. the screen decides what to show
 * when the user isn't searching.
 */
export const searchHymns = (
    hymns: Hymn[],
    query: string,
): SearchedHymn[] => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return [];

    const isTitleMatch = (hymn: Hymn) => {
        return hymn.title
            .toLowerCase()
            .includes(normalizedQuery);
    }

    const isLyricsMatch = (hymn: Hymn) => {
        return hymn.verses.some(verse =>
            verse.verseLines.some(line =>
                line
                    .toLowerCase()
                    .includes(normalizedQuery)
            )
        );
    }

    const titleMatches: SearchedHymn[] = hymns
        .filter(isTitleMatch)
        .map(hymn => ({
            ...hymn,
            matchSource: "title"
        }));

    const lyricsOnlyMatches: SearchedHymn[] = hymns
        .filter(hymn => !isTitleMatch(hymn) && isLyricsMatch(hymn))
        .map(hymn => ({
            ...hymn,
            matchSource: "lyrics"
        }));

    return [
        ...titleMatches,
        ...lyricsOnlyMatches
    ];
}