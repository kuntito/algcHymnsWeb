import { Box, Divider, StackProps, VStack } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface Props<T> extends StackProps {
    data: T[];
    renderItem: (item: T, idx: number) => ReactNode;
    showDivider?: boolean;
    edgePadding?: number;
    gap?: string;
}


/**
 * a generic list component.
 * 
 * it provides edge padding i.e. padding before the first list item and padding before the last list item
 * 
 * it provides an optional divider between list items.
 * 
 * pass items as an array, `data` and a function to render the item, `renderItem`.
 */
const ItemList = <T,>({
    data,
    renderItem,
    showDivider,
    edgePadding = 4,
    ...stackProps
}: Props<T>) => {    
    return (
        <VStack
            w={"100%"}
            gap={0}
            divider={showDivider ? <Divider /> : undefined}
            {...stackProps}
        >
            {data.length && <EdgePadding padding={edgePadding} />}
            {data.map((item, idx) => renderItem(item, idx))}
            {data.length && <EdgePadding padding={edgePadding} />}
        </VStack>
    );
};

const EdgePadding = ({ padding }: { padding: number }) => {
    return <Box
        height={padding}
        w={"100%"}
        flexShrink={0}
    />;
};

export default ItemList;