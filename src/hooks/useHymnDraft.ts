import { useState } from "react";

type HymnDraft = {
    title: string;
};

const emptyHymnDraft: HymnDraft = {
    title: "",
};

const validateHymnDraft = (
    hymnDraft: HymnDraft
): boolean => {
    const isTitleValid = hymnDraft.title.trim() !== "";

    return isTitleValid;
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