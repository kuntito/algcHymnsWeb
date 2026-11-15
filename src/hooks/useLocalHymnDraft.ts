import { useState } from "react";
import { withAppendedVerse, withMovedVerse, withTitle, withUpdatedVerse, withoutVerse } from "../state-mgmt/hymnDraft.transform";
import { emptyHymnDraft } from "../state-mgmt/hymnDraftStore";
import { validateHymnDraft } from "../state-mgmt/hymnDraftStore.helpers";
import { HymnDraft } from "../state-mgmt/hymnDraftStore.types";
import { isSameDraft } from "./useLocalHymnDraft.helpers";

/**
 * a hymn draft held in local state, for editing an existing hymn.
 *
 * it offers the same actions as the draft store, so screens read the same way.
 * unlike the store, nothing is saved to the browser.
 *
 * `startDraft` loads a draft, like when the user starts editing,
 * and remembers it, so `isDraftChanged` can tell if anything changed since.
 */
export const useLocalHymnDraft = () => {
    const [initialDraft, setInitialDraft] = useState<HymnDraft>(emptyHymnDraft);

    const [hymnDraft, setHymnDraft] = useState<HymnDraft>(emptyHymnDraft);

    const startDraft = (draft: HymnDraft) => {
        setInitialDraft(draft);
        setHymnDraft(draft);
    }

    const updateTitle = (newTitle: string) => {
        setHymnDraft(prev => withTitle(prev, newTitle));
    }

    const addVerse = () => {
        setHymnDraft(prev => withAppendedVerse(prev, "verse"));
    }

    const addChorus = () => {
        setHymnDraft(prev => withAppendedVerse(prev, "chorus"));
    }

    const updateVerse = (draftId: string, newText: string) => {
        setHymnDraft(prev => withUpdatedVerse(prev, draftId, newText));
    }

    const deleteVerse = (draftId: string) => {
        setHymnDraft(prev => withoutVerse(prev, draftId));
    }

    const moveVerse = (fromIndex: number, toIndex: number) => {
        setHymnDraft(prev => withMovedVerse(prev, fromIndex, toIndex));
    }

    const isDraftValid = validateHymnDraft(hymnDraft);
    const isDraftChanged = !isSameDraft(initialDraft, hymnDraft);

    return {
        hymnDraft,
        isDraftValid,
        isDraftChanged,
        startDraft,
        updateTitle,
        addVerse,
        addChorus,
        updateVerse,
        deleteVerse,
        moveVerse,
    };
};
