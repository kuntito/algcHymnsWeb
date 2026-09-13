import { Box, VStack } from "@chakra-ui/react"
import { useEffect } from "react"
import useAppStore from "../../../state-mgmt/appStore"
import CenterSpinner from "../../util/CenterSpinner"
import RetryAction from "../../util/RetryAction"
import HeaderHymnList from "./components/HeaderHymnList"
import ListHymn from "./components/ListHymn"

const HymnListScreen = () => {
    // TODO replace with zustand hymns
    const stateHymnFetch = useAppStore(s => s.fetchHymnsState);
    const fetchHymns = useAppStore(s => s.fetchHymns);

    useEffect(() => {
        fetchHymns();
    }, [])


    // TODO check devtools, some column doesn't have unique keys on items.

    const renderContent = () => {
        switch(stateHymnFetch.kind) {
            case 'idle':
                return null;
            case 'fetching':
                return <CenterSpinner />;
            case 'error':
                return (
                    <RetryAction
                        action={fetchHymns}
                    />
                );
            case 'success':
                return (
                    <Box
                        h={"100%"}
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
                        <ListHymn 
                            hymns={stateHymnFetch.hymns}
                        />
                    </Box>
                )
        }
    }


    return (
        <VStack
            w={"100%"}
            h={"100%"}
        >
            <HeaderHymnList />
            {renderContent()}   
        </VStack>
    )
}

export default HymnListScreen