import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogOverlay,
    HStack,
} from "@chakra-ui/react";
import { useRef } from "react";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    body?: React.ReactNode;
    footer?: React.ReactNode;
    size?: string;
    bgColor?: string;
    // false while something is in progress, like a save or delete,
    // so escape, outside clicks and the close button do nothing.
    canDismiss?: boolean;
}

const AppDialog = ({ 
    isOpen,
    onDismiss,
    body,
    footer,
    size = 'sm',
    bgColor = "palette.iju",
    canDismiss = true,
}: Props) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            motionPreset="scale"
            leastDestructiveRef={cancelRef}
            onClose={onDismiss}
            isOpen={isOpen}
            isCentered
            size={size}
            closeOnEsc={canDismiss}
            closeOnOverlayClick={canDismiss}
        >
            <AlertDialogOverlay />
            <AlertDialogContent
                borderRadius={"16px"}
                overflow={"hidden"}
            >
                {canDismiss && (
                    <AlertDialogCloseButton
                        color={"palette.holy"}
                    />
                )}
                <AlertDialogBody
                    pt={"32px"}
                    pb={"32px"}
                    bg={bgColor}
                >{body}</AlertDialogBody>
                {footer && (
                    <AlertDialogFooter
                        bg={bgColor}
                    >
                        <HStack
                            w={"100%"}
                            justifyContent={"center"}
                        >
                            {footer}
                        </HStack>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AppDialog;
