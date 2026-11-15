import { arrayMove } from "@dnd-kit/sortable";
import { VerseType } from "../api/getHymns.types";
import { createVerseDraft } from "./hymnDraftStore.helpers";
import { HymnDraft } from "./hymnDraftStore.types";

// each function takes a draft and returns a new one, it never changes the original.
// the draft store and the edit screen both use these, so the logic lives in one place.

export const withTitle = (
    draft: HymnDraft,
    newTitle: string,
): HymnDraft => {
    return {
        ...draft,
        title: newTitle,
    };
};

export const withAppendedVerse = (
    draft: HymnDraft,
    verseType: VerseType,
): HymnDraft => {
    const newVerseDraft = createVerseDraft(verseType);

    return {
        ...draft,
        verses: [...draft.verses, newVerseDraft],
    };
};

export const withUpdatedVerse = (
    draft: HymnDraft,
    draftId: string,
    newText: string,
): HymnDraft => {
    const updatedVerseDrafts = draft.verses.map(verseDraft => {
        const isTarget = verseDraft.draftId === draftId;

        if (isTarget) {
            return {
                ...verseDraft,
                text: newText,
            };
        }

        return verseDraft;
    });

    return {
        ...draft,
        verses: updatedVerseDrafts,
    };
};

export const withoutVerse = (
    draft: HymnDraft,
    draftId: string,
): HymnDraft => {
    const remainingVerseDrafts = draft.verses.filter(
        verse => verse.draftId !== draftId
    );

    return {
        ...draft,
        verses: remainingVerseDrafts,
    };
};

export const withMovedVerse = (
    draft: HymnDraft,
    fromIndex: number,
    toIndex: number,
): HymnDraft => {
    return {
        ...draft,
        verses: arrayMove(draft.verses, fromIndex, toIndex),
    };
};