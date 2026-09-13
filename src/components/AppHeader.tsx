import { Box, Divider, HStack, VStack } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
    children: ReactNode;
}

const FrameAppHeader = ({
    children
}: Props) => {
    return (
        <VStack
            w={"100%"}
            h={"64px"}
            gap={0}
        >
            <HStack
                w={"100%"}
                flex={1}
                gap={"16px"}
                px={"24px"}
                alignItems={"center"}
            >
                {children}
            </HStack>
            <Divider
                borderColor={"palette.holyAlpha"}
            />
        </VStack>
    )
}

export default FrameAppHeader