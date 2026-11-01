import { Box, HStack, StackProps, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { HymnDraft } from "../../../hooks/useHymnDraft.types";
import OutlineButton from "../../OutlineButton";
import ItemList from "../../util/AppItemList";
import { describeVerseCounts, getVerseNumbers } from "./HymnEditLyrics.helpers";
import LiEditHymnVerse from "./LiEditHymnVerse";

interface Props extends StackProps {
    hymnDraft: HymnDraft;
    onVerseTextChange: (draftId: string, text: string) => void;
    onDeleteVerse: (draftId: string) => void;
    onAddVerse: () => void;
    onAddChorus: () => void;
}


const HymnEditLyrics = ({
    hymnDraft,
    onVerseTextChange,
    onDeleteVerse,
    onAddChorus,
    onAddVerse,
    ...stackProps
}: Props) => {
    const [idSelectedVerse, setIdSelectedVerse] = useState<string | null>(null);

    const verseNumbers = getVerseNumbers(hymnDraft.verses);

    const verseCountsText = describeVerseCounts(hymnDraft.verses);

    const contentWidth = "600px";

    return (
        <VStack
            h={"100%"}
            w={"100%"}
            overflow={"hidden"}
            {...stackProps}
        >
            <VStack
                h={"100%"}
                w={"100%"}
                overflow={"hidden"}
                py={"16px"}
            >
                <HStack
                    w={contentWidth}
                    pt={"16px"}
                    justifyContent={"space-between"}
                >
                    <Text
                        textStyle={"hush"}
                        color={"palette.memphis"}
                    >
                        {verseCountsText}
                    </Text>
                </HStack>
                <Box
                    flex={1}
                    w={"100%"}
                    overflowY={"auto"}
                    px={"4px"}
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            bg: 'palette.worshipAlpha',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            bg: 'palette.holy',
                            borderRadius: '4px',
                        },
                    }}
                >
                    <ItemList 
                        data={hymnDraft.verses}
                        renderItem={(v) => (
                            <LiEditHymnVerse 
                                key={v.draftId}
                                verseDraft={v}
                                // choruses are excluded from `verseNumbers`
                                // they'd be undefined, thus, `0` keeps TS happy.
                                // the value is ignored for choruses.
                                verseNumber={verseNumbers.get(v.draftId) ?? 0}
                                isSelected={v.draftId === idSelectedVerse}
                                onVerseTextChange={() => setIdSelectedVerse(v.draftId)}
                                onDragVerseItem={() => {}}
                                onDeleteVerseDraft={() => onDeleteVerse(v.draftId)}
                                onSelect={() => setIdSelectedVerse(v.draftId)}
                            />
                        )}
                        gap="16px"
                        edgePadding={0}
                        w={contentWidth}
                        mx={"auto"}
                    />
                </Box>
            </VStack>
            <HStack
                alignContent={"center"}
                gap={"24px"}
                py={"16px"}
            >
                <OutlineButton 
                    icon={null}
                    text="add verse"
                    onClick={onAddVerse}
                    bg={"palette.cathedral"}
                    color={"palette.life"}
                />
                <OutlineButton 
                    icon={null}
                    text="add chorus"
                    onClick={onAddChorus}
                />
            </HStack>
        </VStack>
    )
}

export default HymnEditLyrics