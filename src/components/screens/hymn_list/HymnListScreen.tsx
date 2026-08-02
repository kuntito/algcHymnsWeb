import { Text, Box, VStack } from "@chakra-ui/react"
import HeaderHymnList from "./components/HeaderHymnList"

const HymnListScreen = () => {
    return (
        <VStack
            w={"100%"}
            h={"100%"}
        >
            <HeaderHymnList />
            <Box
                w={"100%"}
                h={"100%"}
            >
                <Text>content</Text>
            </Box>
        </VStack>
    )
}

export default HymnListScreen