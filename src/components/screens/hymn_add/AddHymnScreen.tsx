import { VStack } from "@chakra-ui/react";
import HeaderAddHymn from "./components/HeaderAddHymn";
import HymnEditLyrics from "./components/HymnEditLyrics";
import useHymnDraftStore from "../../../state-mgmt/hymnDraftStore";
import { validateHymnDraft } from "../../../state-mgmt/hymnDraftStore.helpers";
import { useState } from "react";
import CreateHymnDialog from "./components/CreateHymnDialog";
import { describeVerseCounts } from "./components/HymnEditLyrics.helpers";

const AddHymnScreen = () => {

    const hymnDraft = useHymnDraftStore(s => s.hymnDraft);
    const updateTitle = useHymnDraftStore(s => s.updateTitle);
    const addVerse = useHymnDraftStore(s => s.addVerse);
    const addChorus = useHymnDraftStore(s => s.addChorus);
    const updateVerse = useHymnDraftStore(s => s.updateVerse);
    const deleteVerse = useHymnDraftStore(s => s.deleteVerse);
    const moveVerse = useHymnDraftStore(s => s.moveVerse);

    const isDraftValid = validateHymnDraft(hymnDraft);

    const [isOpenCreateDialog, setIsOpenCreateDialog] = useState(false);

    const openCreateDialog = () => {
        setIsOpenCreateDialog(true);
    }
    const closeCreateDialog = () => {
        setIsOpenCreateDialog(false);
    }

    const verseCountsText = describeVerseCounts(hymnDraft.verses);
    
    return (
        <>
            <VStack
                w={"100%"}
                h={"100%"}
                overflow={"hidden"}
            >
                <HeaderAddHymn 
                    hymnTitle={hymnDraft.title}
                    onHymnTitleChange={updateTitle}
                    canSaveHymn={isDraftValid}
                    onCreateHymn={openCreateDialog}
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
            {isDraftValid && (
                <CreateHymnDialog
                    isOpen={isOpenCreateDialog}
                    onDismiss={closeCreateDialog}
                    hymnTitle={hymnDraft.title}
                    verseCountsText={verseCountsText}
                />)
            }
        </>
    )
}

export default AddHymnScreen