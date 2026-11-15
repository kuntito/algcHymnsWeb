import { VerseType } from "../api/getHymns.types";
import { AddHymnRequest } from "../api/saveHymn.types";
import { removeExtraSpaces } from "../util";
import { HymnDraft, HymnVerseDraft } from "./hymnDraftStore.types";

const validateHymnTitle = (
    title: string
): boolean => {
    return title.trim() !== "";
};

const validateHymnVerses = (
    verses: HymnVerseDraft[]
): boolean => {
    const hasVerses = verses.length > 0;
    if (!hasVerses) return false;
    
    const isVerseValid = (verse: HymnVerseDraft) => {
        return verse.text.trim() !== "";
    }

    const areVersesValid = verses.every(isVerseValid);
    
    return areVersesValid;
};

export const validateHymnDraft = (
    hymnDraft: HymnDraft
): boolean => {
    const isTitleValid = validateHymnTitle(hymnDraft.title);
    const areVersesValid = validateHymnVerses(hymnDraft.verses);

    return isTitleValid && areVersesValid;
};


export const createVerseDraft = (
    verseType: VerseType
): HymnVerseDraft => {
    return {
        draftId: crypto.randomUUID(),
        verseType,
        text: "",
    };
};

/**
 * the user types each verse as one block of text,
 * the server wants each line on its own.
 *
 * so the text is split on new lines,
 * and blank lines are dropped.
 */
const toVerseLines = (
    text: string
): string[] => {
    const textLines = text.split("\n");

    const cleanedLines = textLines.map(removeExtraSpaces);

    const nonEmptyLines = cleanedLines.filter(line => line !== "");

    return nonEmptyLines;
};

/**
 * turns the draft the user filled in into the body the server expects.
 *
 * the draft keeps verses in the order the user arranged them,
 * so each verse's position becomes its `verseOrder`.
 * the server sorts by `verseOrder`, so the hymn comes back in the same order.
 *
 * the title is cleaned of extra spaces, `"Great   Is Thy"` becomes `"Great Is Thy"`.
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