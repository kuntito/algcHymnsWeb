import { HStack, Text, VStack } from "@chakra-ui/react";
import { HymnVerse } from "../../../../models/hymn"
import GradientLine from "../../../util/GradientLine";

interface Props {
    verse: HymnVerse;
}

const LiHymnChorus = ({
    verse
}: Props) => {
    if (verse.verseType != "chorus") return null;
    
    return (
        <VStack
            w={"full"}
        >
            <HStack
                w={"full"}
                alignItems={"center"}
            >
                <Text
                    textStyle={"orion"}
                    color={"palette.testimony"}
                >
                    chorus
                </Text>
                <GradientLine
                    colorStart="palette.testimony"
                    colorTrail="palette.creed"
                    mt={"4px"} // looks better this way.
                />
            </HStack>
            <VStack
                w={"full"}
                gap={0}
                alignItems={"start"}
            >
                {
                    verse.verseLines.map((line, idx) => {
                        return (
                            <Text
                                key={idx}
                                textStyle={"orion"}
                                color={"palette.testimony"}
                            >
                                {line}
                            </Text>
                        );
                    })
                }
            </VStack>
        </VStack>
    )
}

export default LiHymnChorus