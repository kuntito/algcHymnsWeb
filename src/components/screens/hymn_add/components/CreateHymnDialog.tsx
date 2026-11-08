import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import AppDialog from "../../../util/AppDialog";
import OutlineButton from "../../../OutlineButton";
import { SaveIcon } from "../../../appIcons/SaveIcon";
import CenterSpinner from "../../../util/CenterSpinner";
import { useState } from "react";
import useHymnDraftStore from "../../../../state-mgmt/hymnDraftStore";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    hymnTitle: string;
    verseCountsText: string;
}


const CreateHymnDialog = ({
    isOpen,
    onDismiss,
    hymnTitle,
    verseCountsText,
}: Props) => {
    const saveHymn = useHymnDraftStore(s => s.createHymn);

    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);

        const isSaved = await saveHymn();

        setIsSaving(false);

        if (isSaved) {
            onDismiss();
        }
    }
    
    const renderContent = () => {
        return (
            <Box
                position={"relative"}
            >
                <VStack
                    visibility={isSaving ? "hidden" : "visible"}
                >
                    <Text
                        color={"palette.holy"}
                        fontSize={"18px"}
                    >
                        add hymn?
                    </Text>
                    <VStack
                        h={"128px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Text
                            fontWeight={"bold"}
                            fontSize={"16px"}
                            color={"palette.life"}
                        >
                            {hymnTitle}
                        </Text>
                        <Text
                            textStyle={"hush"}
                            color={"palette.memphis"}
                        >
                            {verseCountsText}
                        </Text>
                    </VStack>
                    <HStack
                        gap={"24px"}
                    >
                        <OutlineButton 
                            icon={null}
                            text={"cancel"} 
                            onClick={onDismiss}
                        />
                        <OutlineButton 
                            icon={(
                                <SaveIcon
                                    color={"palette.life"}
                                    boxSize={"16px"}
                                />)
                            }
                            text={"save"} 
                            borderColor={"palette.life"}
                            color={"palette.life"}
                            onClick={handleSave}
                        />
                    </HStack>
                </VStack>
                {isSaving && (
                    <CenterSpinner
                        position={"absolute"}
                        inset={0}
                    />
                )}

            </Box>
        );
    }


    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={renderContent()}
        />
    )
}

export default CreateHymnDialog