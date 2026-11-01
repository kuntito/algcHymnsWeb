import { VStack } from "@chakra-ui/react";
import { useHymnDraft } from "../../../hooks/useHymnDraft";
import HeaderAddHymn from "./components/HeaderAddHymn";
import HymnEditLyrics from "./HymnEditLyrics";

const AddHymnScreen = () => {

    const {
        hymnDraft,
        isDraftValid,
        updateHymnTitle,
        addVerse,
        addChorus,
        updateVerse,
        deleteVerse,
    } = useHymnDraft();
    
    
    return (
        <VStack
            w={"100%"}
            h={"100%"}
            overflow={"hidden"}
        >
            <HeaderAddHymn 
                hymnTitle={hymnDraft.title}
                onHymnTitleChange={updateHymnTitle}
                canSaveHymn={isDraftValid}
            />
            <HymnEditLyrics
                hymnDraft={hymnDraft}
                onVerseTextChange={updateVerse}
                onDeleteVerse={deleteVerse}
                onAddChorus={addChorus}
                onAddVerse={addVerse}
                flex={1}
                minH={0}
            />
        </VStack>
    )
}

export default AddHymnScreen