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
            <Box
                flex={1}
                w={"100%"}
                px={"24px"}
            >

                {children}
            </Box>
            <Divider
                borderColor={"palette.holyAlpha"}
            />
        </VStack>
    )
}

export default FrameAppHeader