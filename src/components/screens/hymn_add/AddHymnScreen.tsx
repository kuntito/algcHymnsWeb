import { VStack } from "@chakra-ui/react";
import HeaderAddHymn from "./components/HeaderAddHymn";
import HymnEditLyrics from "./components/HymnEditLyrics";
import useHymnDraftStore from "../../../state-mgmt/hymnDraftStore";
import { validateHymnDraft } from "../../../state-mgmt/hymnDraftStore.helpers";

const AddHymnScreen = () => {

    const hymnDraft = useHymnDraftStore(s => s.hymnDraft);
    const updateTitle = useHymnDraftStore(s => s.updateTitle);
    const addVerse = useHymnDraftStore(s => s.addVerse);
    const addChorus = useHymnDraftStore(s => s.addChorus);
    const updateVerse = useHymnDraftStore(s => s.updateVerse);
    const deleteVerse = useHymnDraftStore(s => s.deleteVerse);
    const moveVerse = useHymnDraftStore(s => s.moveVerse);

    const isDraftValid = validateHymnDraft(hymnDraft);
    
    
    return (
        <VStack
            w={"100%"}
            h={"100%"}
            overflow={"hidden"}
        >
            <HeaderAddHymn 
                hymnTitle={hymnDraft.title}
                onHymnTitleChange={updateTitle}
                canSaveHymn={isDraftValid}
            />
            <HymnEditLyrics
                hymnDraft={hymnDraft}
                onVerseTextChange={updateVerse}
                onDeleteVerse={deleteVerse}
                onAddChorus={addChorus}
                onAddVerse={addVerse}
                onMoveVerse={moveVerse}
                flex={1}
                minH={0}
            />
        </VStack>
    )
}

export default AddHymnScreen