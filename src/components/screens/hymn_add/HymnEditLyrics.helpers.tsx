import { HymnVerseDraft } from "../../../hooks/useHymnDraft.types";

/**
 * only normal verses get numbers, choruses are skipped.
 *
 * verse -> chorus -> verse -> chorus
 * gives verse 1 and verse 2.
 * 
 * the result maps each verse's draftId to its verse number in the list,
 * so a chorus simply has no entry.
 */
export const getVerseNumbers = (
    verses: HymnVerseDraft[]
): Map<string, number> => {
    const verseNumbers = new Map<string, number>();
    let verseCount = 0;

    for (const verse of verses) {
        const isNormalVerse = verse.verseType === "verse";
        if (isNormalVerse) {            
            verseCount += 1;
            verseNumbers.set(
                verse.draftId,
                verseCount
            );
        }
    }

    return verseNumbers;
};


/**
 * describes how many verses and choruses a hymn has, i.e. 2 verses · 1 chorus.
 *
 * counts that are zero are left out, so a hymn with only verses
 * just says how many verses. an empty hymn gives an empty string.
 */
export const describeVerseCounts = (
    verses: HymnVerseDraft[]
): string => {
    const verseCount = verses.filter(v => v.verseType === "verse").length;
    const chorusCount = verses.filter(v => v.verseType === "chorus").length;

    const verseLabel = verseCount === 1 ? "verse" : "verses";
    const chorusLabel = chorusCount === 1 ? "chorus" : "choruses";

    const parts: string[] = [];

    if (verseCount > 0) {
        parts.push(`${verseCount} ${verseLabel}`);
    }

    if (chorusCount > 0) {
        parts.push(`${chorusCount} ${chorusLabel}`);
    }

    return parts.join(" · ");
};