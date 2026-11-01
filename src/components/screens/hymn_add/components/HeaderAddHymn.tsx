import { Box, Flex, HStack, Text } from "@chakra-ui/react"
import FrameAppHeader from "../../../AppHeader"
import AppIconButton from "../../../util/AppIconButton"
import { LeftChevronIcon } from "../../../appIcons/LeftChevronIcon"
import { useNavigate } from "react-router-dom"
import OutlineButton from "../../../OutlineButton"
import { SaveIcon } from "../../../appIcons/SaveIcon"
import AppEditableText from "../../../util/AppEditableText"

interface Props {
    hymnTitle: string;
    onHymnTitleChange: (title: string) => void;
    canSaveHymn: boolean;
}

const HeaderAddHymn = ({
    hymnTitle,
    onHymnTitleChange,
    canSaveHymn,
}: Props) => {
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
                {/* TODO guard typing unaccepted characeters and toast where necessary same way you did for the yc26 app */}
                <Flex
                    minW={"500px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <AppEditableText 
                        value={hymnTitle}
                        onChange={onHymnTitleChange}
                        placeholder="add hymn title"
                        flex={1}
                    />
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
                        isDisabled={!canSaveHymn}
                    />
                </HStack>
            </HStack>
        </FrameAppHeader>
    )
}

export default HeaderAddHymn