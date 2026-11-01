import { useState } from "react";
import FrameAppHeader from "../../../AppHeader"
import AppSearchBar from "../../../AppSearchBar"
import { Box, HStack } from "@chakra-ui/react";
import OutlineButton from "../../../OutlineButton";
import { AddIcon } from "../../../appIcons/AddIcon";
import { useNavigate } from "react-router-dom";

type Props = {
    query: string;
    onQueryChange: (q: string) => void;
    onClear: () => void;
};

const HeaderHymnList = ({
    query,
    onQueryChange,
    onClear,
}: Props) => {

    const navigate = useNavigate();
    
    const buttonText = "add hymn";
    const goToAddHymnScreen = () => {
        navigate(`/add`);
    }
    
    return (
        <FrameAppHeader>
            <HStack
                w={"100%"}
                h={"100%"}
                justifyContent={"center"}
                gap={"16px"}
            >
                {/* placeholder to balance the right icon */}
                <Box
                    visibility={"hidden"}
                >
                    <OutlineButton 
                        icon={<AddIcon />}
                        text={buttonText} 
                        onClick={() => {}} 
                    />
                </Box>
                <AppSearchBar 
                    query={query}
                    onQueryChange={onQueryChange}
                    onClear={onClear}
                    placeholder="search by title or lyrics"
                />
                <OutlineButton 
                    icon={<AddIcon boxSize={"12px"} />}
                    text={buttonText} 
                    onClick={goToAddHymnScreen} 
                />
            </HStack>
        </FrameAppHeader>
    )
}

export default HeaderHymnList