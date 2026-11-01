import { VerseType } from "../api/getHymns.types";
import { HymnDraft, HymnVerseDraft } from "./useHymnDraft.types";

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