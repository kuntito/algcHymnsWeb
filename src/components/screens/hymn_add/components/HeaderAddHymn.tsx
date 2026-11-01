import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import FrameAppHeader from "../../../AppHeader"
import AppIconButton from "../../../util/AppIconButton"
import { LeftChevronIcon } from "../../../appIcons/LeftChevronIcon"
import { useNavigate } from "react-router-dom"
import OutlineButton from "../../../OutlineButton"
import { SaveIcon } from "../../../appIcons/SaveIcon"

const HeaderAddHymn = () => {
    const navigateTo = useNavigate();

    const iconSize = "24px";

    return (
        <FrameAppHeader>
            <HStack
                w={"100%"}
                h={"100%"}
                justifyContent={"center"}
                gap={"16px"}
            >
                <HStack
                    flex={1}
                    justifyContent={"start"}
                    gap={"16px"}
                >
                    <AppIconButton
                        icon={<LeftChevronIcon boxSize={iconSize} />}
                        iconColor="palette.holy"
                        iconColorWhenHovered="palette.testimony"
                        onClick={() => navigateTo("/")}
                    />
                </HStack>
                <Flex
                    minW={"500px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    border={"1px solid red"}
                >
                    <Text>
                        TODO hymn title
                    </Text>
                </Flex>
                <HStack
                    flex={1}
                    justifyContent={"end"}
                    gap={"16px"}
                >
                    <OutlineButton 
                        icon={<SaveIcon boxSize={"16px"} />}
                        text={"create hymn"} 
                        onClick={() => { }} 
                    />
                </HStack>
            </HStack>
        </FrameAppHeader>
    )
}

export default HeaderAddHymn