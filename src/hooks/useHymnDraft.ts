import { useState } from "react";
import { HymnDraft } from "./useHymnDraft.types";
import { createVerseDraft, validateHymnDraft } from "./useHymnDraft.helpers";
import { VerseType } from "../api/getHymns.types";
import { arrayMove } from "@dnd-kit/sortable";


const emptyHymnDraft: HymnDraft = {
    title: "",
    verses: [],
};

// TODO docstring
export const useHymnDraft = (
    initialDraft: HymnDraft = emptyHymnDraft
) => {
    const [hymnDraft, setHymnDraft] = useState<HymnDraft>(initialDraft);

    const isDraftValid = validateHymnDraft(hymnDraft);


    const updateHymnTitle = (
        newTitle: string
    ) => {
        setHymnDraft(prev => ({
            ...prev,
            title: newTitle
        }));
    }

    const appendVerseDraft = (
        verseType: VerseType
    ) => {
        const newVerseDraft = createVerseDraft(verseType);

        setHymnDraft(prev => ({
            ...prev,
            verses: [...prev.verses, newVerseDraft]
        }));
    }

    const addVerse = () => {
        appendVerseDraft("verse");
    }

    const addChorus = () => {
        appendVerseDraft("chorus");
    }


    const updateVerse = (
        draftId: string,
        newText: string,
    ) => {
        setHymnDraft(prev => {
            const updatedVerseDrafts = prev.verses.map(verseDraft => {
                const isTarget = verseDraft.draftId === draftId;

                if (isTarget) { 
                    return { 
                        ...verseDraft,
                        text: newText
                    };
                }
                
                return verseDraft;

            });

            return {
                ...prev,
                verses: updatedVerseDrafts 
            };
        });
    }

    const deleteVerse = (
        draftId: string
    ) => {
        setHymnDraft(prev => {
            const remainingVerseDrafts = prev.verses.filter(
                verse => verse.draftId !== draftId
            );

            return {
                ...prev,
                verses: remainingVerseDrafts
            };
        });
    }

    /**
     * the user can drag verses around to reorder the hymn.
     *
     * when a drop happens, the dragged verse takes the place of the
     * verse it was dropped on, and everything between shifts over by one.
     */
    const moveVerse = (
        fromIndex: number,
        toIndex: number,
    ) => {
        setHymnDraft(prev => ({
            ...prev,
            verses: arrayMove(prev.verses, fromIndex, toIndex)
        }));
    }

    return {
        hymnDraft,
        isDraftValid,
        addVerse,
        addChorus,
        updateHymnTitle,
        updateVerse,
        deleteVerse,
        moveVerse,
    };
};