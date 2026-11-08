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
}

const AppDialog = ({ 
    isOpen,
    onDismiss,
    body,
    footer,
    size = 'sm',
    bgColor = "palette.iju",
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
        >
            <AlertDialogOverlay />
            <AlertDialogContent
                borderRadius={"16px"}
                overflow={"hidden"}
            >
                <AlertDialogCloseButton 
                    color={"palette.holy"}
                />
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
