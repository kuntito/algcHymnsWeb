import { create } from "zustand";
import { Hymn } from "../models/hymn";
import { hymnsDataSource } from "../api/hymnsDataSource";
import { HymnDraft } from "./hymnDraftStore.types";
import { draftToRequest } from "./hymnDraftStore.helpers";

type FetchHymnsState = 
    | { kind: 'idle' }
    | { kind: 'fetching' }
    | { 
        kind: 'success',
        hymns: Hymn[],
    }
    | {
        kind: 'error'
    };

interface appStore {
    fetchHymnsState: FetchHymnsState;
    fetchHymns: () => Promise<void>;
    refetchHymns: () => Promise<void>;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    clearSearchQuery: () => void;
    deleteHymn: (hymnId: number) => Promise<boolean>;
    createHymn: (hymnDraft: HymnDraft) => Promise<boolean>;
    updateHymn: (
        hymnId: number,
        hymnDraft: HymnDraft
    ) => Promise<boolean>;
}

const useAppStore = create<appStore>((set, get) => {
    const defaultFetchHymnsState: FetchHymnsState = { kind: "idle" }

    const getHymns = async () => {
        
        const current = get().fetchHymnsState;
        
        const isAlreadyLoaded = current.kind === "success";
        const isAlreadyFetching = current.kind === "fetching";

        if (isAlreadyLoaded || isAlreadyFetching) return;

        set({
            fetchHymnsState: {
                kind: 'fetching'
            }
        });

        const res = await hymnsDataSource.getHymns();

        if (res == null || !res.success) {
            set({
                fetchHymnsState: {
                    kind: 'error'
                }
            })
            return;
        }
        
        set({
            fetchHymnsState: {
                kind: 'success',
                hymns: res.allHymns
            }
        })

    }

    const refetchHymns = async () => {
        set({ fetchHymnsState: defaultFetchHymnsState});
        await getHymns();
    }

    const defaultSearchQuery = "";

    const setSearchQuery = (query: string) => {
        set({ searchQuery: query });
    }

    const clearSearchQuery = () => {
        set({ searchQuery: defaultSearchQuery });
    }

    /**
     * deletes a hymn on the server,
     * then drops it from the local list.
     * 
     * returns whether the hymn was deleted.
     */
    const deleteHymn = async (
        hymnId: number
    ): Promise<boolean> => {
        const res = await hymnsDataSource.deleteHymn(hymnId);

        const isDeleted = res != null && res.success;
        if (!isDeleted) return false;

        const current = get().fetchHymnsState;
        const hasLoadedHymns = current.kind === "success";

        if (hasLoadedHymns) {
            const remainingHymns = current.hymns.filter(
                hymn => hymn.id !== hymnId
            );

            set({
                fetchHymnsState: {
                    kind: 'success',
                    hymns: remainingHymns,
                }
            });
        }

        return true;
    }

    /**
     * adds a newly created hymn to the local list,
     * so it shows without a refetch.
     *
     * if the list hasn't loaded yet, there's nothing to add to.
     * the next fetch will include it anyway.
     */
    const appendHymn = (
        hymn: Hymn
    ) => {
        const current = get().fetchHymnsState;
        const hasLoadedHymns = current.kind === "success";
        if (!hasLoadedHymns) return;

        set({
            fetchHymnsState: {
                kind: 'success',
                hymns: [...current.hymns, hymn],
            }
        });
    }


    /**
     * sends a draft to the server as a new hymn,
     * then adds the created hymn to the local list.
     *
     * returns whether the hymn was created.
     */
    const createHymn = async (
        hymnDraft: HymnDraft
    ): Promise<boolean> => {
        const reqBody = draftToRequest(hymnDraft);

        const res = await hymnsDataSource.addHymn(reqBody);

        const isCreated = res != null && res.success;
        if (!isCreated) return false;

        appendHymn(res.hymn);

        return true;
    }
    
    /**
     * sends the edited draft to the server,
     * then swaps the old hymn in the local list for the updated one.
     *
     * returns whether the hymn was updated.
     */
    const updateHymn = async (
        hymnId: number,
        hymnDraft: HymnDraft,
    ): Promise<boolean> => {
        const reqBody = draftToRequest(hymnDraft);

        const res = await hymnsDataSource.updateHymn(
            hymnId,
            reqBody
        );

        const isUpdated = res != null && res.success;
        if (!isUpdated) return false;

        const current = get().fetchHymnsState;
        const hasLoadedHymns = current.kind === "success";

        if (hasLoadedHymns) {
            const updatedHymns = current.hymns.map(hymn => {
                const isTarget = hymn.id === hymnId;

                if (isTarget) return res.hymn;

                return hymn;
            });

            set({
                fetchHymnsState: {
                    kind: 'success',
                    hymns: updatedHymns,
                }
            });
        }

        return true;
    }

    return {
        fetchHymnsState: defaultFetchHymnsState,
        fetchHymns: getHymns,
        refetchHymns: refetchHymns,
        searchQuery: defaultSearchQuery,
        setSearchQuery,
        clearSearchQuery,
        deleteHymn,
        createHymn,
        updateHymn,
    }
});

export default useAppStore;