import { Box, HStack, Text } from "@chakra-ui/react"
import FrameAppHeader from "../../../AppHeader"
import { SaveIcon } from "../../../appIcons/SaveIcon"
import OutlineButton from "../../../OutlineButton"
import EllipsisText from "../../../util/EllipsisText";
import { LeftChevronIcon } from "../../../appIcons/LeftChevronIcon";
import AppIconButton from "../../../util/AppIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "../../../appIcons/EditIcon";
import { DeleteIcon } from "../../../appIcons/DeleteIcon";

interface Props {
    hymnTitle: string;
    isEditing: boolean;
    onDeleteHymn: () => void;
}

const HeaderHymnView = ({
    hymnTitle,
    isEditing,
    onDeleteHymn,
}: Props) => {
    const navigateTo = useNavigate();
    const iconSize = "24px";

    
    return (
        <FrameAppHeader>
            <HStack
                flex={1}
                gap={"16px"}
                justifyContent={"flex-start"}
            >
                <AppIconButton
                    icon={<LeftChevronIcon boxSize={iconSize} />}
                    iconColor="palette.holy"
                    iconColorWhenHovered="palette.testimony"
                    onClick={() => navigateTo("/")}
                />
            </HStack>
            <EllipsisText
                flex={1}
                textAlign={"center"}
            >
                {hymnTitle}
            </EllipsisText>
            <HStack
                flex={1}
                justifyContent={"flex-end"}
                gap={"16px"}
            >
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
                <AppIconButton
                    icon={<DeleteIcon boxSize={iconSize} />}
                    iconColor="palette.holyAlpha"
                    iconColorWhenHovered="palette.holy"
                    onClick={onDeleteHymn}
                />
            </HStack>
        </FrameAppHeader>
    )
}

export default HeaderHymnView