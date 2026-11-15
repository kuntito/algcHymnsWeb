import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react"
import FrameAppHeader from "../../../AppHeader"
import { SaveIcon } from "../../../appIcons/SaveIcon"
import OutlineButton from "../../../OutlineButton"
import EllipsisText from "../../../util/EllipsisText";
import { LeftChevronIcon } from "../../../appIcons/LeftChevronIcon";
import AppIconButton from "../../../util/AppIconButton";
import { useNavigate, useParams } from "react-router-dom";
import { EditIcon } from "../../../appIcons/EditIcon";
import { DeleteIcon } from "../../../appIcons/DeleteIcon";
import AppEditableText from "../../../util/AppEditableText";

interface Props {
    hymnTitle: string;
    isEditing: boolean;
    onDeleteHymn: () => void;
    onHymnTitleChange: (title: string) => void;
    onStartEdit: () => void;
    onCancelEdit: () => void;
    canUpdateHymn: boolean;
    onUpdateHymn: () => void;
}

const HeaderHymnView = ({
    hymnTitle,
    isEditing,
    onDeleteHymn,
    onHymnTitleChange,
    onStartEdit,
    onCancelEdit,
    canUpdateHymn,
    onUpdateHymn,
}: Props) => {
    const navigateTo = useNavigate();
    const iconSize = "24px";


    const handleNavBack = () => {
        if (isEditing) {
            onCancelEdit();
        } else {
            navigateTo("/");
        }
    }
    
    return (
        <FrameAppHeader>
            <HStack
                flex={1}
                gap={"16px"}
                justifyContent={"flex-start"}
            >
                <VStack
                    gap={0}
                >
                    <AppIconButton
                        icon={<LeftChevronIcon boxSize={iconSize} />}
                        iconColor="palette.holy"
                        iconColorWhenHovered="palette.testimony"
                        onClick={handleNavBack}
                    />
                    {isEditing && (
                        <Text
                            textStyle={"hush"}
                            color={"palette.holy"}    
                        >
                            cancel edit
                        </Text>)
                    }
                </VStack>
            </HStack>
            { isEditing ? (
                <Flex
                    minW={"500px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <AppEditableText
                        value={hymnTitle}
                        onChange={onHymnTitleChange}
                        placeholder="add hymn title"
                        textAlign={"center"}
                        flex={1}
                    />
                </Flex>
            ): (
                <EllipsisText
                    flex={1}
                    textAlign={"center"}
                >
                    {hymnTitle}
                </EllipsisText>
            )}
            <HStack
                flex={1}
                justifyContent={"flex-end"}
                gap={"16px"}
            >
                {
                    isEditing ? (
                        <>                        
                            <OutlineButton 
                                icon={<SaveIcon boxSize={"16px"} />}
                                text={"save changes"} 
                                onClick={onUpdateHymn}
                                isDisabled={!canUpdateHymn}
                            />
                            <AppIconButton
                                icon={<DeleteIcon boxSize={iconSize} />}
                                iconColor="palette.holyAlpha"
                                iconColorWhenHovered="palette.holy"
                                onClick={onDeleteHymn}
                            />
                        </>
                    ) : (
                        <OutlineButton 
                            icon={<EditIcon boxSize={"16px"} />}
                            text={"edit"} 
                            onClick={onStartEdit}
                        />
                        
                    )
                }
            </HStack>
        </FrameAppHeader>
    )
}

export default HeaderHymnView