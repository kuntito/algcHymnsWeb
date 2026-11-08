import { Box, HStack, Text, useToast, VStack } from "@chakra-ui/react";
import AppDialog from "../../../util/AppDialog";
import OutlineButton from "../../../OutlineButton";
import { SaveIcon } from "../../../appIcons/SaveIcon";
import CenterSpinner from "../../../util/CenterSpinner";
import { useState } from "react";
import useHymnDraftStore from "../../../../state-mgmt/hymnDraftStore";
import useAppStore from "../../../../state-mgmt/appStore";
import appToastConfig from "../../../../config/toastConfig";
import { describeVerseCounts } from "./HymnEditLyrics.helpers";
import { useNavigate } from "react-router-dom";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
}


const CreateHymnDialog = ({
    isOpen,
    onDismiss,
}: Props) => {
    const hymnDraft = useHymnDraftStore(s => s.hymnDraft);
    const discardDraft = useHymnDraftStore(s => s.discardDraft);
    const createHymn = useAppStore(s => s.createHymn);

    const hymnTitle = hymnDraft.title;
    const verseCountsText = describeVerseCounts(hymnDraft.verses);

    const [isSaving, setIsSaving] = useState(false);

    const navigateTo = useNavigate();

    const toast = useToast();
    const handleSave = async () => {
        setIsSaving(true);

        const isCreated = await createHymn(hymnDraft);

        setIsSaving(false);

        if (!isCreated){ 
            toast({
                ...appToastConfig,
                description: "something went wrong, try again.",
                status: "error"
            });
            return;
        }

        toast({
            ...appToastConfig,
            description: `added ${hymnTitle}`,
            status: "success"
        });

        discardDraft();
        onDismiss();

        navigateTo("/");
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
            canDismiss={!isSaving}
            body={renderContent()}
        />
    )
}

export default CreateHymnDialog