import { HStack, Text, VStack } from "@chakra-ui/react";
import AppDialog from "../../../util/AppDialog";
import OutlineButton from "../../../OutlineButton";
import { SaveIcon } from "../../../appIcons/SaveIcon";

interface Props {
    isOpen: boolean;
    onDismiss: () => void;
    hymnTitle: string;
    verseCountsText: string;
    saveHymn: () => void;
}


const CreateHymnDialog = ({
    isOpen,
    onDismiss,
    hymnTitle,
    verseCountsText,
    saveHymn,
}: Props) => {
    return (
        <AppDialog
            isOpen={isOpen}
            onDismiss={onDismiss}
            body={
                <VStack>
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
                            onClick={saveHymn}
                        />
                    </HStack>
                </VStack>
            }
        />
    )
}

export default CreateHymnDialog