import { Center, HStack, Input } from "@chakra-ui/react";
import { SearchIcon } from "./appIcons/SearchIcon";
import AppIconButton from "./util/AppIconButton";
import { CloseIcon } from "./appIcons/CloseIcon";

interface Props {
    query: string;
    onQueryChange: (q: string) => void;
    onClear: () => void;
}

const AppSearchBar = ({
    query,
    onQueryChange,
    onClear
}: Props) => {

    const iconColor = "palette.dim";
    const handleQueryChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = e.target.value;
        onQueryChange(value);
    }

    return (
        <HStack
            bg={"palette.holy"}
            h={"40px"}
            borderRadius={50}
            ps={"16px"}
            pe={"10px"}
            w={"444px"}
        >
            <SearchIcon color={iconColor} />
            <Input 
                value={query}
                onChange={handleQueryChange}
                variant={"unstyled"}
                color={"palette.creed"}
            />
            <Center
                boxSize={"24px"}
            >
                {
                    query && (
                        <AppIconButton
                            icon={(
                                <CloseIcon
                                    boxSize={"16px"}
                                />
                            )}
                            iconColor={iconColor}
                            onClick={onClear}
                        />
                    )
                }
            </Center>
        </HStack>
    )
}

export default AppSearchBar