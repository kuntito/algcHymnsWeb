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
}

const useAppStore = create<appStore>((set, get) => {
    const defaultFetchHymnsState: FetchHymnsState = { kind: "idle" }

    const getHymns = async () => {
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

    return {
        fetchHymnsState: defaultFetchHymnsState,
        fetchHymns: getHymns,
    }
});

export default useAppStore;