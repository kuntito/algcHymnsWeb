import { HStack, VStack } from "@chakra-ui/react";
import { HymnVerseDraft } from "../../../../state-mgmt/hymnDraftStore.types";
import HeaderEditHymnVerse from "./HeaderEditHymnVerse";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import VerseTextArea from "./VerseTextArea";

interface Props {
    verseNumber: number;
    verseDraft: HymnVerseDraft;
    isSelected: boolean;
    onVerseTextChange: (value: string) => void;
    onDeleteVerseDraft: () => void;
    onSelect: () => void;
}

const LiEditHymnVerse = ({
    verseNumber,
    verseDraft,
    isSelected,
    onVerseTextChange,
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

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: verseDraft.draftId });

    // dnd-kit moves the card with a translate while dragging.
    // the selected scale also uses transform, so both are combined here,
    // otherwise one would overwrite the other.
    const dragTranslate = CSS.Translate.toString(transform) ?? "";
    const combinedTransform = `${dragTranslate} scale(${scale})`;

    const dragTransition = transition ?? "transform 0.2s ease";

    return (
        <VStack
            w={"100%"}
            gap={0}
            px={"16px"}
            pb={"16px"}
            borderRadius={"16px"}
            borderColor={borderColor}
            borderWidth={borderWidth}
            bg={bg}
            transformOrigin={"center"}
            onClick={onSelect}
            ref={setNodeRef}
            transform={combinedTransform}
            transition={dragTransition}
            zIndex={isDragging ? 1 : "auto"}
            opacity={isDragging ? 0.8 : 1}
        >
            <HeaderEditHymnVerse 
                verseTitle={verseTitle}
                onDeleteVerseDraft={onDeleteVerseDraft}
                isSelected={isSelected}
                dragAttributes={attributes}
                dragListeners={listeners}
            />
            <HStack
                w={"100%"}
            >
                <VerseTextArea
                    value={verseDraft.text}
                    onChange={onVerseTextChange}
                    onFocus={onSelect}
                    placeholder="write lyrics..."
                    w={"100%"}
                />
            </HStack>
        </VStack>
    )
}

export default LiEditHymnVerse