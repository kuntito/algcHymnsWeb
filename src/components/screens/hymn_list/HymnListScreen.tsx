import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import useAppStore from "../../../state-mgmt/appStore"
import CenterSpinner from "../../util/CenterSpinner"
import RetryAction from "../../util/RetryAction"
import HeaderHymnList from "./components/HeaderHymnList"
import ListHymn from "./components/ListHymn"
import { searchHymns } from "../../../util"
import { contentWidth } from "../../../config/appConfig"

// TODO cache hymn list and let user refresh to get the latest.
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
                    <VStack
                        h={"100%"}
                        w={"100%"}
                        overflow={"hidden"}
                        py={"16px"} 
                        gap={0}
                    >
                        {
                            hymnsToShow.length > 0 && (
                                <HStack
                                    w={"full"}
                                    pt={"16px"}
                                    justifyContent={"space-between"}
                                    width={contentWidth}
                                >
                                    <Text
                                        textStyle={"hush"}
                                        color={"palette.holy"}
                                    >
                                        {hymnsToShow.length === 1 ? "1 hymn" : `${hymnsToShow.length} hymns`}
                                    </Text>
                                </HStack>
                            )
                        }
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
                                        contentWidth={contentWidth}
                                    />
                                )
                            }
                        </Box>
                    </VStack>
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
                searchBarWidth={contentWidth}
            />
            {renderContent()}   
        </VStack>
    )
}

export default HymnListScreen