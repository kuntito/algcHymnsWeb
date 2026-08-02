import { useState } from "react";
import FrameAppHeader from "../../../AppHeader"
import AppSearchBar from "../../../AppSearchBar"
import { Box, HStack } from "@chakra-ui/react";
import OutlineButton from "../../../OutlineButton";
import { AddIcon } from "../../../appIcons/AddIcon";

const HeaderHymnList = () => {
    // TODO should probably be in zustand slice
    const [query, setQuery] = useState("");
    const onClear = () => {
        setQuery("");
    }

    const buttonText = "add hymn";
    
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
                    onQueryChange={setQuery}
                    onClear={onClear}
                />
                <OutlineButton 
                    icon={<AddIcon />}
                    text={buttonText} 
                    onClick={() => { }} 
                />
            </HStack>
        </FrameAppHeader>
    )
}

export default HeaderHymnList