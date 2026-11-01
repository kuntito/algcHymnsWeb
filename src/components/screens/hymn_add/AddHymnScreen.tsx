import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAddHymn from "./components/HeaderAddHymn";

const AddHymnScreen = () => {
    
    const contentWidth = "444px";

    const renderContent = (

    ): ReactNode => {
        // switch() {
            
        // }
        return null;
    }
    
    return (
        <VStack
            w={"100%"}
            h={"100%"}
        >
            <HeaderAddHymn />
            {renderContent()}
        </VStack>
    )
}

export default AddHymnScreen