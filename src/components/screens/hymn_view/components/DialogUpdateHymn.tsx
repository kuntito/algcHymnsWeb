import { useToast, Box, VStack, HStack, Text } from "@chakra-ui/react";
import { useState } from "react";
import appToastConfig from "../../../../config/toastConfig";
import useAppStore from "../../../../state-mgmt/appStore";
import { HymnDraft } from "../../../../state-mgmt/hymnDraftStore.types";
import { SaveIcon } from "../../../appIcons/SaveIcon";
import OutlineButton from "../../../OutlineButton";
import AppDialog from "../../../util/AppDialog";
import CenterSpinner from "../../../util/CenterSpinner";
import { describeVerseCounts } from "../../hymn_add/components/HymnEditLyrics.helpers";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    onUpdated: () => void;
    hymnId: number;
    hymnDraft: HymnDraft;
}

const DialogUpdateHymn = ({
    isOpen,
    onDismiss,
    onUpdated,
    hymnId,
    hymnDraft,
}: Props) => {
    const updateHymn = useAppStore(s => s.updateHymn);

    const [isUpdating, setIsUpdating] = useState(false);

    const toast = useToast();

    const hymnTitle = hymnDraft.title;
    const verseCountsText = describeVerseCounts(hymnDraft.verses);

    const handleSave = async () => {
        setIsUpdating(true);

        const isUpdated = await updateHymn(hymnId, hymnDraft);

        setIsUpdating(false);

        if (!isUpdated) {
            toast({
                ...appToastConfig,
                description: "update failed, try again.",
                status: "error"
            });
            return;
        }

        toast({
            ...appToastConfig,
            description: `updated '${hymnTitle}'`,
            status: "success"
        });

        onUpdated();
    }

    const renderContent = () => {
        return (
            <Box
                position={"relative"}
            >
                <VStack
                    visibility={isUpdating ? "hidden" : "visible"}
                >
                    <Text
                        color={"palette.holy"}
                        fontSize={"18px"}
                    >
                        save changes?
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
                            textAlign={"center"}
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
                            text={"update"} 
                            borderColor={"palette.life"}
                            color={"palette.life"}
                            onClick={handleSave}
                        />
                    </HStack>
                </VStack>
                {isUpdating && (
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
            canDismiss={!isUpdating}
            body={renderContent()}
        />
    )
}

export default DialogUpdateHymn