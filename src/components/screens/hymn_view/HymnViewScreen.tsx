import { Box, Center, Text, VStack } from "@chakra-ui/react"
import HeaderHymnView from "./components/HeaderHymnView"
import { useParams } from "react-router-dom";
import useAppStore from "../../../state-mgmt/appStore";
import { useState } from "react";
import ListHymnLyrics from "./components/ListHymnLyrics";
import DialogDeleteHymn from "./components/DialogDeleteHymn";
import DialogCancelEditHymn from "./components/DialogCancelEditHymn";
import { useLocalHymnDraft } from "../../../hooks/useLocalHymnDraft";
import { hymnToDraft } from "../../../hooks/useLocalHymnDraft.helpers";
import HymnEditLyrics from "../hymn_add/components/HymnEditLyrics";
import DialogUpdateHymn from "./components/DialogUpdateHymn";


const HymnViewScreen = () => {
    const { hymnId } = useParams();

    const stateHymnFetch = useAppStore(s => s.fetchHymnsState);

    const hymn = stateHymnFetch.kind === 'success'
        ? stateHymnFetch.hymns.find(h => h.id === Number(hymnId))
        : null;

    const [isEditing, setEditing] = useState(false);

    const {
        hymnDraft,
        isDraftValid,
        isDraftChanged,
        startDraft,
        updateTitle,
        addVerse,
        addChorus,
        updateVerse,
        deleteVerse,
        moveVerse,
    } = useLocalHymnDraft();
    
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

    const openDeleteDialog = () => {
        setIsOpenDeleteDialog(true);
    }

    const closeDeleteDialog = () => {
        setIsOpenDeleteDialog(false);
    }

    const [isShowCancelEditDialog, setShowCancelEditDialog] = useState(false);

    const showCancelEditDialog = () => {

        setShowCancelEditDialog(true);
    }

    const hideCancelEditDialog = () => {
        setShowCancelEditDialog(false);
    }

    const handleStartEdit = () => {
        if (hymn == null) return;

        startDraft(hymnToDraft(hymn));
        setEditing(true);
    }

    const handleCancelEdit = () => {
        if (isDraftChanged) {
            showCancelEditDialog();
            return;
        }

        setEditing(false);
    }

    const handleConfirmCancelEdit = () => {
        hideCancelEditDialog();
        setEditing(false);
    }

    const [isOpenUpdateDialog, setIsOpenUpdateDialog] = useState(false);

    const openUpdateDialog = () => {
        setIsOpenUpdateDialog(true);
    }

    const closeUpdateDialog = () => {
        setIsOpenUpdateDialog(false);
    }

    const handleHymnUpdated = () => {
        closeUpdateDialog();
        setEditing(false);
    }

    if (hymn == null) {
        return (
            <Center
                w={"100%"}
                h={"100%"}
            >
                <Text
                    textStyle={"orion"}
                    color={"palette.holy"}
                >
                    couldn't load hymn
                </Text>
            </Center>
        )
    }

    const renderContent = () => {
        return (
            isEditing ? (
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
            ) : (
                <Box
                    flex={1}
                    w={"100%"}
                    overflowY={"auto"}
                    sx={{
                        '&::-webkit-scrollbar': {
                            width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                            bg: 'palette.holy',
                            borderRadius: '4px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            bg: 'palette.iju',
                            borderRadius: '4px',
                        },
                    }}
                    justifyItems={"center"}
                >
                    <ListHymnLyrics verses={hymn.verses} />
                </Box>
            )
        )
    }

    return (
        <>
            <VStack
                w={"100%"}
                h={"100%"}
            >
                <HeaderHymnView
                    hymnTitle={isEditing ? hymnDraft.title : hymn.title}
                    isEditing={isEditing}
                    onDeleteHymn={openDeleteDialog}
                    onHymnTitleChange={updateTitle}
                    onStartEdit={handleStartEdit}
                    onCancelEdit={handleCancelEdit}
                    canUpdateHymn={isDraftValid && isDraftChanged}
                    onUpdateHymn={openUpdateDialog}
                />
                { renderContent() }
            </VStack>
            <DialogDeleteHymn
                isOpen={isOpenDeleteDialog}
                onDismiss={closeDeleteDialog}
                hymnId={hymn.id}
                hymnTitle={hymn.title}
            />
            <DialogCancelEditHymn
                isOpen={isShowCancelEditDialog}
                onDismiss={hideCancelEditDialog}
                onConfirmCancel={handleConfirmCancelEdit}
            />
            <DialogUpdateHymn
                isOpen={isOpenUpdateDialog}
                onDismiss={closeUpdateDialog}
                onUpdated={handleHymnUpdated}
                hymnId={hymn.id}
                hymnDraft={hymnDraft}
            />
        </>
    )
}

export default HymnViewScreen