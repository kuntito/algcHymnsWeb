import { create } from "zustand";
import { persist } from "zustand/middleware";
import { withAppendedVerse, withMovedVerse, withTitle, withUpdatedVerse, withoutVerse } from "./hymnDraft.transform";
import { HymnDraft } from "./hymnDraftStore.types";


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
        (set) => {
            const updateTitle = (newTitle: string) => {
                set(state => ({
                    hymnDraft: withTitle(state.hymnDraft, newTitle)
                }));
            }

            const addVerse = () => {
                set(state => ({
                    hymnDraft: withAppendedVerse(state.hymnDraft, "verse")
                }));
            }

            const addChorus = () => {
                set(state => ({
                    hymnDraft: withAppendedVerse(state.hymnDraft, "chorus")
                }));
            }

            const updateVerse = (
                draftId: string,
                newText: string,
            ) => {
                set(state => ({
                    hymnDraft: withUpdatedVerse(state.hymnDraft, draftId, newText)
                }));
            }

            const deleteVerse = (draftId: string) => {
                set(state => ({
                    hymnDraft: withoutVerse(state.hymnDraft, draftId)
                }));
            }

            const moveVerse = (
                fromIndex: number,
                toIndex: number,
            ) => {
                set(state => ({
                    hymnDraft: withMovedVerse(state.hymnDraft, fromIndex, toIndex)
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
