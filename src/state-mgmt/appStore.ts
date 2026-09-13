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
}

const useAppStore = create<appStore>((set, get) => {
    const defaultFetchHymnsState: FetchHymnsState = { kind: "idle" }

    const getHymns = async () => {
        const current = get().fetchHymnsState;
        if (current.kind === "success") return;

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
        set({ fetchHymnsState: {kind: 'idle'}});
        getHymns();
    }

    return {
        fetchHymnsState: defaultFetchHymnsState,
        fetchHymns: getHymns,
        refetchHymns: refetchHymns,
    }
});

export default useAppStore;