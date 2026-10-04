import { Box, Center, Text, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import useAppStore from "../../../state-mgmt/appStore"
import CenterSpinner from "../../util/CenterSpinner"
import RetryAction from "../../util/RetryAction"
import HeaderHymnList from "./components/HeaderHymnList"
import ListHymn from "./components/ListHymn"
import { searchHymns } from "../../../util"

const HymnListScreen = () => {
    const stateHymnFetch = useAppStore(s => s.fetchHymnsState);
    const fetchHymns = useAppStore(s => s.fetchHymns);
    const refetchHymns = useAppStore(s => s.refetchHymns);

    const searchQuery = useAppStore(s => s.searchQuery);
    const setSearchQuery = useAppStore(s => s.setSearchQuery);
    const clearSearchQuery = useAppStore(s => s.clearSearchQuery);

    const isSearching = searchQuery.trim().length > 0;

    const searchedHymns = useMemo(() => {
        if (stateHymnFetch.kind !== 'success') return [];
    
        const allHymns = stateHymnFetch.hymns;
    
        return searchHymns(
            allHymns,
            searchQuery
        );
    }, [
        stateHymnFetch,
        searchQuery
    ]);

    useEffect(() => {
        fetchHymns();
    }, [])

    const renderContent = () => {
        switch(stateHymnFetch.kind) {
            case 'idle':
                return null;
            case 'fetching':
                return <CenterSpinner />;
            case 'error':
                return (
                    <RetryAction
                        action={refetchHymns}
                    />
                );
            case 'success': {
                const allHymns = stateHymnFetch.hymns;
                const hymnsToShow = isSearching ? searchedHymns : allHymns;
                const hasNoResults = isSearching && hymnsToShow.length === 0;

                return (
                    <Box
                        flex={1}
                        w={"100%"}
                        overflowY={"auto"}
                        sx={{
                            '&::-webkit-scrollbar': {
                                width: '4px',
                            },
                            '&::-webkit-scrollbar-track': {
                                bg: 'palette.holy',
                                borderRadius: '4px',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                bg: 'palette.iju',
                                borderRadius: '4px',
                            },
                        }}
                        justifyItems={"center"}
                    >
                        {hasNoResults ?
                            (
                                <Center
                                    w={"100%"}
                                    h={"100%"}
                                >
                                    <Text
                                        textStyle={"orion"}
                                        color={"palette.holy"}
                                    >
                                        couldn't find it.
                                    </Text>
                                </Center>
                            ) : (
                                <ListHymn 
                                    hymns={hymnsToShow}
                                />
                            )
                        }
                    </Box>
                )
            }
        }
    }


    return (
        <VStack
            w={"100%"}
            h={"100%"}
        >
            <HeaderHymnList 
                query={searchQuery}
                onQueryChange={setSearchQuery}
                onClear={clearSearchQuery}
            />
            {renderContent()}   
        </VStack>
    )
}

export default HymnListScreen