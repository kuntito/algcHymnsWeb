import { Box, HStack, Text } from "@chakra-ui/react"
import FrameAppHeader from "../../../AppHeader"
import { SaveIcon } from "../../../appIcons/SaveIcon"
import OutlineButton from "../../../OutlineButton"
import EllipsisText from "../../../util/EllipsisText";
import { LeftChevronIcon } from "../../../appIcons/LeftChevronIcon";
import AppIconButton from "../../../util/AppIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "../../../appIcons/EditIcon";

interface Props {
    hymnTitle: string;
    isEditing: boolean;
}

const HeaderHymnView = ({
    hymnTitle,
    isEditing,
}: Props) => {
    const navigateTo = useNavigate();
    const iconSize = "24px";

    
    return (
        <FrameAppHeader>
            <AppIconButton
                icon={<LeftChevronIcon boxSize={iconSize} />}
                iconColor="palette.holy"
                iconColorWhenHovered="palette.testimony"
                onClick={() => navigateTo("/")}
            />
            <HStack
                flex={1}
                h={"100%"}
                gap={"16px"}
                minW={0}
            >
                <EllipsisText
                    flex={1}
                    textAlign={"center"}
                >
                    {hymnTitle}
                </EllipsisText>
            </HStack>
            {
                isEditing ? (
                    // TODO cant save hymn unless edited.
                    <OutlineButton 
                        icon={<SaveIcon boxSize={"16px"} />}
                        text={"save"} 
                        onClick={() => { }} 
                    />
                ) : (
                    <OutlineButton 
                        icon={<EditIcon boxSize={"16px"} />}
                        text={"edit"} 
                        onClick={() => { }} 
                    />
                    
                )
            }
        </FrameAppHeader>
    )
}

export default HeaderHymnView