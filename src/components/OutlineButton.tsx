import { Box, HStack, Text } from "@chakra-ui/react"
import { AddIcon } from "./appIcons/AddIcon"
import { ReactNode } from "react"


interface Props {
    icon: ReactNode;
    text: string;
    onClick: () => void;
}

const OutlineButton = ({
    icon,
    text,
    onClick
}: Props) => {
    
    return (
        <HStack
            as={"button"}
            borderColor={"palette.holy"}
            borderWidth={"1px"}
            borderRadius={"16px"}
            paddingX={"10px"}
            paddingY={"5px"}
            cursor={"pointer"}
            transition="opacity 0.15s ease"
            _hover={{ opacity: 0.6 }}
            _active={{ opacity: 0.4 }}
            onClick={onClick}
        >
            {icon}
            <Text
                textStyle={"orion"}
            >
                {text}
            </Text>
        </HStack>
    )
}

export default OutlineButton