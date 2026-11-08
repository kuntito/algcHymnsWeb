import { create } from "zustand";
import { persist } from "zustand/middleware";
import { arrayMove } from "@dnd-kit/sortable";
import { VerseType } from "../api/getHymns.types";
import { createVerseDraft, draftToRequest } from "./hymnDraftStore.helpers";
import { HymnDraft } from "./hymnDraftStore.types";
import { hymnsDataSource } from "../api/hymnsDataSource";


const emptyHymnDraft: HymnDraft = {
    title: "",
    verses: [],
};


interface HymnDraftStore {
    hymnDraft: HymnDraft;
    updateTitle: (newTitle: string) => void;
    addVerse: () => void;
    addChorus: () => void;
    updateVerse: (draftId: string, newText: string) => void;
    deleteVerse: (draftId: string) => void;
    moveVerse: (fromIndex: number, toIndex: number) => void;
    discardDraft: () => void;
}

/**
 * holds the hymn being created.
 *
 * it's saved to the browser, so closing the tab or leaving the
 * screen doesn't lose the user's progress.
 *
 * this is kept apart from `useAppStore` on purpose. saving needs
 * zustand's `persist`, and keeping it here means the main store
 * doesn't have to deal with it.
 *
 * clear it with `discardDraft`, after the hymn is created or when
 * the user wants to start over.
 */
const useHymnDraftStore = create<HymnDraftStore>()(
    persist(
        (set, get) => {
            const updateTitle = (newTitle: string) => {
                set(state => ({
                    hymnDraft: {
                        ...state.hymnDraft,
                        title: newTitle
                    }
                }));
            }

            const appendVerseDraft = (verseType: VerseType) => {
                const newVerseDraft = createVerseDraft(verseType);

                set(state => ({
                    hymnDraft: {
                        ...state.hymnDraft,
                        verses: [...state.hymnDraft.verses, newVerseDraft]
                    }
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
                set(state => {
                    const updatedVerseDrafts = state.hymnDraft.verses.map(verseDraft => {
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
                        hymnDraft: {
                            ...state.hymnDraft,
                            verses: updatedVerseDrafts
                        }
                    };
                });
            }

            const deleteVerse = (draftId: string) => {
                set(state => {
                    const remainingVerseDrafts = state.hymnDraft.verses.filter(
                        verse => verse.draftId !== draftId
                    );

                    return {
                        hymnDraft: {
                            ...state.hymnDraft,
                            verses: remainingVerseDrafts
                        }
                    };
                });
            }

            const moveVerse = (
                fromIndex: number,
                toIndex: number,
            ) => {
                set(state => ({
                    hymnDraft: {
                        ...state.hymnDraft,
                        verses: arrayMove(state.hymnDraft.verses, fromIndex, toIndex)
                    }
                }));
            }

            const discardDraft = () => {
                set({ hymnDraft: emptyHymnDraft });
            }

            return {
                hymnDraft: emptyHymnDraft,
                updateTitle,
                addVerse,
                addChorus,
                updateVerse,
                deleteVerse,
                moveVerse,
                discardDraft,
            }
        },
        {
            name: "algc-hymn-draft",
            // only the data is saved, the functions are rebuilt on load.
            partialize: (state) => ({
                hymnDraft: state.hymnDraft,
            }),
        }
    )
);

export default useHymnDraftStore;
