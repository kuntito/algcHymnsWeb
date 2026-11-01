import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import HeaderAddHymn from "./components/HeaderAddHymn";
import { useHymnDraft } from "../../../hooks/useHymnDraft";

const AddHymnScreen = () => {

    const {
        hymnDraft,
        updateHymnDraft,
        isDraftValid,
    } = useHymnDraft();
    
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
            <HeaderAddHymn 
                hymnTitle={hymnDraft.title}
                onHymnTitleChange={updateHymnDraft("title")}
                canSaveHymn={isDraftValid}
            />
            {renderContent()}
        </VStack>
    )
}

export default AddHymnScreen