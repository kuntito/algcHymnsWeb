import { VerseType } from "../api/getHymns.types";

export type HymnVerseDraft = {
    draftId: string;
    verseType: VerseType;
    text: string;
};

export type HymnDraft = {
    title: string;
    verses: HymnVerseDraft[];
};
