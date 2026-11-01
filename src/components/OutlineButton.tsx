import { Box, HStack, StackProps, Text } from "@chakra-ui/react"
import { AddIcon } from "./appIcons/AddIcon"
import { ReactNode } from "react"


interface Props extends StackProps {
    icon: ReactNode;
    text: string;
    onClick: () => void;
    isDisabled: boolean;
}

const OutlineButton = ({
    icon,
    text,
    onClick,
    isDisabled,
    ...stackProps
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
            disabled={isDisabled}
            _disabled={{
                opacity: 0.3,
                cursor: "not-allowed",
                _hover: { opacity: 0.3 },
                _active: { opacity: 0.3 },
            }}
            onClick={onClick}
            alignItems={"center"}
            justifyContent={"center"}
            {...stackProps}
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