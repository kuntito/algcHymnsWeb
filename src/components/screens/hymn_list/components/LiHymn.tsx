import { Center, Divider, HStack, Text, VStack } from "@chakra-ui/react"
import { Hymn } from "../../../../models/hymn";
import { HymnMatchSource } from "../../../../util";

interface Props {
    noInList: number;
    hymn: Hymn;
    onClick: () => void;
    matchSource?: HymnMatchSource;
}

const LiHymn = ({
    noInList,
    hymn,
    onClick,
    matchSource,
}: Props) => {
    const indexStr = `${noInList < 10 ? `0${noInList}` : noInList}`

    const isLyricsMatch = matchSource === "lyrics";

    return (
        <HStack
            alignItems={"center"}
            w={"100%"}
            bg={"palette.iju"}
            padding={"8px"}
            borderRadius={"16px"}
            cursor={"pointer"}
            _hover={{
                opacity: 0.7
            }}
            _active={{
                opacity: 0.5
            }}
            transition="opacity 0.2s ease"
            boxShadow="0px 4px 12px rgba(0,0,0,0.2)"
            onClick={onClick}
        >
            <Center
                w={"26px"}
                >
                <Text>
                    {indexStr}
                </Text>
            </Center>
            <Divider 
                orientation="vertical"
                height={"12px"}
                color={"palette.holyAlpha"}
                />
            <VStack
                alignItems={"start"}
                flex={1}
                gap={0}
            >
                <Text
                    lineHeight={1.2}
                    >
                    {hymn.title}
                </Text>
                {isLyricsMatch && (
                    <Text
                        textStyle={"hush"}
                        fontStyle={"italic"}
                        fontSize={"10px"}
                        fontWeight={"thin"}
                        letterSpacing={"widest"}
                        color={"palette.mover"}
                        lineHeight={1.2}                        
                    >
                        matching lyrics
                    </Text>
                )}
            </VStack>
        </HStack>
    )
}

export default LiHymn