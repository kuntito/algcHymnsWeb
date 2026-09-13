import { Center, Text, useToast, VStack } from "@chakra-ui/react";
import AppIconButton from "./AppIconButton";
import { RefreshIcon } from "../appIcons/RefreshIcon";


interface Props {
    action: () => void;
}


const RetryAction = ({
    action
}: Props) => {
    return (
        <Center
            w={"100%"}
            h={"100%"}
        >
            <VStack>
                <Text
                    textStyle={"orion"}
                >
                    error occurred, please try again
                </Text>
                <AppIconButton
                    icon={<RefreshIcon boxSize={"24px"} />}
                    iconColor="palette.holy"
                    iconColorWhenHovered="palette.testimony"
                    onClick={action}
                />
            </VStack>
        </Center>
    )
}

export default RetryAction