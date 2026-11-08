import { Box, Center, Text, VStack } from "@chakra-ui/react"
import HeaderHymnView from "./components/HeaderHymnView"
import { useParams } from "react-router-dom";
import useAppStore from "../../../state-mgmt/appStore";
import { useState } from "react";
import EditHymnFrame from "./components/EditHymnFrame";
import ListHymnLyrics from "./components/ListHymnLyrics";
import DialogDeleteHymn from "./components/DialogDeleteHymn";


const HymnViewScreen = () => {
    const { hymnId } = useParams();

    const stateHymnFetch = useAppStore(s => s.fetchHymnsState);

    const hymn = stateHymnFetch.kind === 'success'
        ? stateHymnFetch.hymns.find(h => h.id === Number(hymnId))
        : null;

    const [isEditing, setEditing] = useState(false);
    
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

    const openDeleteDialog = () => {
        setIsOpenDeleteDialog(true);
    }

    const closeDeleteDialog = () => {
        setIsOpenDeleteDialog(false);
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

    // TODO impl edit hymn.
    const renderContent = () => {
        return (
            isEditing ? (
                <EditHymnFrame />
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
                    hymnTitle={hymn.title}
                    isEditing={isEditing}
                    onDeleteHymn={openDeleteDialog}
                />
                { renderContent() }
            </VStack>
            <DialogDeleteHymn
                isOpen={isOpenDeleteDialog}
                onDismiss={closeDeleteDialog}
                hymnId={hymn.id}
                hymnTitle={hymn.title}
            />
        </>
    )
}

export default HymnViewScreen