import { HStack, VStack } from "@chakra-ui/react";
import { HymnVerseDraft } from "../../../hooks/useHymnDraft.types";
import AppEditableText from "../../util/AppEditableText";
import HeaderEditHymnVerse from "./HeaderEditHymnVerse";

interface Props {
    verseNumber: number;
    verseDraft: HymnVerseDraft;
    isSelected: boolean;
    onVerseTextChange: (value: string) => void;
    onDragVerseItem: () => void;
    onDeleteVerseDraft: () => void;
    onSelect: () => void;
}

const LiEditHymnVerse = ({
    verseNumber,
    verseDraft,
    isSelected,
    onVerseTextChange,
    onDragVerseItem,
    onDeleteVerseDraft,
    onSelect,
}: Props) => {
    const isChorus = verseDraft.verseType == "chorus";
    const verseTitle = isChorus ? "chorus" : `verse ${verseNumber}`;

    const borderColor = "palette.worship";
    const borderWidth = isSelected ? "2px" : "1px";
    const bg = isSelected ? "palette.creed" : undefined;

    const selectedScale = 1.03;
    const scale = isSelected ? selectedScale : 1;

    return (
        <VStack
            w={"100%"}
            gap={0}
            px={"16px"}
            borderRadius={"16px"}
            borderColor={borderColor}
            borderWidth={borderWidth}
            bg={bg}
            transform={`scale(${scale})`}
            transformOrigin={"center"}
            transition={"transform 0.2s ease"}
            onClick={onSelect}
        >
            <HeaderEditHymnVerse 
                verseTitle={verseTitle}
                onDragVerseItem={onDragVerseItem}
                onDeleteVerseDraft={onDeleteVerseDraft}
                isSelected={isSelected}
            />
            <HStack>
                <AppEditableText
                    value={verseDraft.text}
                    onChange={onVerseTextChange}
                    w={"100%"}
                    minHeight={"64px"}
                />
            </HStack>
        </VStack>
    )
}

export default LiEditHymnVerse