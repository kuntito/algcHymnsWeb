import { Box, VStack, HStack, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../../../state-mgmt/appStore";
import OutlineButton from "../../../OutlineButton";
import AppDialog from "../../../util/AppDialog";
import CenterSpinner from "../../../util/CenterSpinner";
import { DeleteIcon } from "../../../appIcons/DeleteIcon";
import appToastConfig from "../../../../config/toastConfig";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    hymnId: number;
    hymnTitle: string;
}



const DialogDeleteHymn = ({
    isOpen,
    onDismiss,
    hymnId,
    hymnTitle,
}: Props) => {
    const deleteHymn = useAppStore(s => s.deleteHymn);
    const navigateTo = useNavigate();

    const [isDeleting, setIsDeleting] = useState(false);

    const toast = useToast();
    const handleDelete = async () => {
        setIsDeleting(true);

        const isDeleted = await deleteHymn(hymnId);

        setIsDeleting(false);

        if (!isDeleted) {
            toast({
                ...appToastConfig,
                description: "delete failed.",
                status: "error"
            });
            return;
        }

        toast({
            ...appToastConfig,
            description: `deleted '${hymnTitle}'`,
            status: "success"
        });

        if (isDeleted) {
            onDismiss();
            // replace, so the back button can't return to the deleted hymn.
            navigateTo("/", { replace: true });
        }
    }

    const renderContent = () => {
        return (
            <Box
                position={"relative"}
            >
                <VStack
                    visibility={isDeleting ? "hidden" : "visible"}
                >
                    <Text
                        color={"palette.holy"}
                        fontSize={"18px"}
                    >
                        delete hymn?
                    </Text>
                    <VStack
                        h={"128px"}
                        justifyContent={"center"}
                        alignItems={"center"}
                    >
                        <Text
                            fontWeight={"bold"}
                            fontSize={"16px"}
                            color={"palette.holy"}
                            textAlign={"center"}
                        >
                            {hymnTitle}
                        </Text>
                        <Text
                            textStyle={"hush"}
                            color={"palette.memphis"}
                        >
                            this can't be undone.
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
                            icon={<DeleteIcon color={"palette.life"} />}
                            text={"delete"} 
                            borderColor={"palette.life"}
                            color={"palette.life"}
                            onClick={handleDelete}
                        />
                    </HStack>
                </VStack>
                {isDeleting && (
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
            canDismiss={!isDeleting}
            body={renderContent()}
        />
    )
}

export default DialogDeleteHymn