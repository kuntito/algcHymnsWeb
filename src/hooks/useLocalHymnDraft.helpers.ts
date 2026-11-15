import { AddHymnRequest } from "../api/saveHymn.types";
import { Hymn } from "../models/hymn";
import { HymnDraft } from "../state-mgmt/hymnDraftStore.types";
import { removeExtraSpaces } from "../util";

/**
 * the user types each verse as one block of text,
 * the server wants each line on its own.
 *
 * so the text is split on new lines, each line is cleaned
 * of extra spaces, and blank lines are dropped.
 */
const toVerseLines = (
    text: string
): string[] => {
    const rawLines = text.split("\n");

    const cleanedLines = rawLines.map(removeExtraSpaces);

    const nonEmptyLines = cleanedLines.filter(line => line !== "");

    return nonEmptyLines;
};

/**
 * turns the draft the user filled in into the body the server expects.
 *
 * the draft keeps verses in the order the user arranged them,
 * so each verse's position becomes its `verseOrder`.
 * the server sorts by `verseOrder`, so the hymn comes back in the same order..
 */
export const draftToRequest = (
    hymnDraft: HymnDraft
): AddHymnRequest => {
    const title = removeExtraSpaces(hymnDraft.title);

    const hymnVerses = hymnDraft.verses.map((verse, index) => ({
        verseType: verse.verseType,
        verseOrder: index,
        lines: toVerseLines(verse.text),
    }));

    return {
        title,
        hymnVerses,
    };
};


/**
 * compares two drafts by what would be sent to the server,
 * so differences the user can't see, like `draftId` or extra spaces,
 * don't count as changes.
 */
export const isSameDraft = (
    draftA: HymnDraft,
    draftB: HymnDraft,
): boolean => {
    const requestA = JSON.stringify(draftToRequest(draftA));
    const requestB = JSON.stringify(draftToRequest(draftB));

    return requestA === requestB;
};


/**
 * turns a saved hymn into a draft, so it's ready for editing.
 */
export const hymnToDraft = (
    hymn: Hymn
): HymnDraft => {
    const verses = hymn.verses.map(verse => ({
        draftId: crypto.randomUUID(),
        verseType: verse.verseType,
        text: verse.verseLines.join("\n"),
    }));

    return {
        title: hymn.title,
        verses,
    };
};