import { create } from "zustand";
import { Hymn } from "../models/hymn";
import { hymnsDataSource } from "../api/hymnsDataSource";

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



    return {
        fetchHymnsState: defaultFetchHymnsState,
        fetchHymns: getHymns,
        refetchHymns: refetchHymns,
        searchQuery: defaultSearchQuery,
        setSearchQuery,
        clearSearchQuery,
    }
});

export default useAppStore;