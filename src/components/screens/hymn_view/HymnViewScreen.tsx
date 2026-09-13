import { Center, Text, VStack } from "@chakra-ui/react"
import HeaderHymnView from "./components/HeaderHymnView"
import { dummyHymn } from "../../../models/hymn"
import { useParams } from "react-router-dom";
import useAppStore from "../../../state-mgmt/appStore";


const HymnViewScreen = () => {
    const { hymnId } = useParams();

    const stateHymnFetch = useAppStore(s => s.fetchHymnsState);

    const hymn = stateHymnFetch.kind === 'success'
        ? stateHymnFetch.hymns.find(h => h.id === Number(hymnId))
        : null;

    if (hymn == null) {
        return (
            <Center
                w={"100%"}
                h={"100%"}
            >
                <Text
                    textStyle={"orion"}
                    color={"palette.holy"}
                >
                    couldn't load hymn
                </Text>
            </Center>
        )
    }

    return (
        <VStack
            w={"100%"}
            h={"100%"}
        >
            <HeaderHymnView hymnTitle={hymn.title} />
            
        </VStack>
    )
}

export default HymnViewScreen