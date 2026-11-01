import { useState } from "react";
import { HymnDraft } from "./useHymnDraft.types";
import { validateHymnDraft } from "./useHymnDraft.helpers";


const emptyHymnDraft: HymnDraft = {
    title: "",
    verses: [],
};

// TODO docstring
export const useHymnDraft = (
    initialDraft: HymnDraft = emptyHymnDraft
) => {
    const [hymnDraft, setHymnDraft] = useState<HymnDraft>(initialDraft);

    const updateHymnDraft = <K extends keyof HymnDraft>(
        field: K
    ) => (
        value: HymnDraft[K]
    ) => {
        setHymnDraft(prev => ({
            ...prev,
            [field]: value
        }));
    }

    const isDraftValid = validateHymnDraft(hymnDraft);

    return {
        hymnDraft,
        updateHymnDraft,
        isDraftValid,
    };
};