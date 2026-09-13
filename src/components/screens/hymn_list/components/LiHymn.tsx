import { Center, Divider, HStack, Text } from "@chakra-ui/react"
import { Hymn } from "../../../../models/hymn";

interface Props {
    index: number;
   hymn: Hymn;
   onClick: () => void;
}

const LiHymn = ({
    index,
    hymn,
    onClick,
}: Props) => {
    const indexStr = `${index < 10 ? `0${index}` : index}`

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
            <Text
                flex={1}
            >
                {hymn.title}
            </Text>
        </HStack>
    )
}

export default LiHymn