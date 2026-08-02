import { Text, Box, VStack } from "@chakra-ui/react"
import HeaderHymnList from "./components/HeaderHymnList"
import ListHymn from "./components/ListHymn"
import { listDummyHymns } from "../../../models/hymn"

const HymnListScreen = () => {
    // TODO replace with zustand hymns
    const hymns = listDummyHymns;

    return (
        <VStack
            w={"100%"}
            h={"100%"}
        >
            <HeaderHymnList />
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
                    hymns={hymns}
                />
            </Box>
        </VStack>
    )
}

export default HymnListScreen