import { HStack, Text, VStack } from "@chakra-ui/react";
import OutlineButton from "../../../OutlineButton";
import AppDialog from "../../../util/AppDialog";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    onConfirmCancel: () => void;
}


const DialogCancelEditHymn = ({
    isOpen,
    onDismiss,
    onConfirmCancel,
}: Props) => {
    const renderContent = () => {
        return (
            <VStack>
                <Text
                    color={"palette.holy"}
                    fontSize={"18px"}
                >
                    cancel edit?
                </Text>
                <VStack
                    h={"128px"}
                    justifyContent={"center"}
                    alignItems={"center"}
                >
                    <Text
                        color={"palette.life"}
                        textAlign={"center"}
                        fontSize={"20px"}
                    >
                        your changes will be discarded.
                    </Text>
                </VStack>
                <HStack
                    gap={"24px"}
                >
                    <OutlineButton 
                        icon={null}
                        text={"go back"}
                        onClick={onDismiss}
                    />
                    <OutlineButton 
                        icon={null}
                        text={"yes, cancel"} 
                        borderColor={"palette.life"}
                        color={"palette.life"}
                        onClick={onConfirmCancel}
                    />
                </HStack>
            </VStack>
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

export default DialogCancelEditHymn;