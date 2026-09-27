import { HStack, Text, VStack } from "@chakra-ui/react";
import { HymnVerse } from "../../../../models/hymn"
import GradientLine from "../../../util/GradientLine";

interface Props {
    verse: HymnVerse;
    verseNumber: number;
}

const LiHymnVerse = ({
    verse,
    verseNumber,
}: Props) => {
    if (verse.verseType != "verse") return null;

    return (
        <VStack
            w={"full"}
        >
            <HStack
                w={"full"}
                alignItems={"center"}
            >
                <HStack
                    color={"palette.worship"}
                >
                <Text
                        textStyle={"orion"}
                    >
                        verse
                    </Text>
                    <Text
                        textStyle={"orion"}
                    >
                        {verseNumber}
                    </Text>
                </HStack>
                <GradientLine
                    colorStart="palette.worship"
                    colorTrail="palette.creed"
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
                                color={"palette.life"}
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

export default LiHymnVerse