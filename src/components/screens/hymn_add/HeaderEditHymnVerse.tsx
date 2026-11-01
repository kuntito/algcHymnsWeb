import { Divider, HStack, Text, VStack } from "@chakra-ui/react"
import AppIconButton from "../../util/AppIconButton"
import { DragIcon } from "../../appIcons/DragIcon"
import { RoundXIcon } from "../../appIcons/RoundXIcon";

interface Props {
    verseTitle: string;
    onDragVerseItem: () => void;
    onDeleteVerseDraft: () => void;
    isSelected: boolean;
}

const HeaderEditHymnVerse = ({
    verseTitle,
    onDragVerseItem,
    onDeleteVerseDraft,
    isSelected,
}: Props) => {

    const iconColor = "palette.holy";
    const fontWeight = isSelected ? "bold" : "normal";

    const handleDeleteClick = (
        e: React.MouseEvent<HTMLButtonElement>
    ) => {
        e.stopPropagation();
        onDeleteVerseDraft();
    }

    return (
        <VStack
            w={"100%"}
            gap={"4px"}
        >
            <HStack
                justifyContent={"space-between"}
                w={"100%"}
            >
                <Text
                    fontWeight={fontWeight}
                    textStyle={"orion"}
                    color={"palette.holy"}
                >
                    {verseTitle}
                </Text>
                <HStack
                    gap={"16px"}
                >
                    <AppIconButton
                        icon={(
                            <DragIcon
                                boxSize={"16px"}
                            />
                        )}
                        iconColor={iconColor}
                        onClick={onDragVerseItem}
                    />
                    <AppIconButton
                        icon={(
                            <RoundXIcon
                                boxSize={"16px"}
                            />
                        )}
                        iconColor={iconColor}
                        onClick={handleDeleteClick}
                    />
                </HStack>
            </HStack>
            <Divider
                borderColor={"palette.holyAlpha"}
            />
        </VStack>
    )
}

export default HeaderEditHymnVerse;