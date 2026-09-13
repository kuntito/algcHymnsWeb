import { TextProps, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { AppTooltip } from "./AppTooltip";

interface Props extends TextProps {
    children: React.ReactNode;
}

const EllipsisText = ({
    children: text,
    ...props
}: Props) => {
    const textRef = useRef<HTMLParagraphElement>(null);
    const [isTextVisible, setIsTextVisible] = useState(true);

    useEffect(() => {
        const el = textRef.current;
        if (el) {
            setIsTextVisible(el.scrollWidth <= el.offsetWidth);
        }
    }, [text]);

    return (
        <AppTooltip
            label={text}
            isDisabled={isTextVisible}
        >
            <Text
                ref={textRef}
                textStyle={"orion"}
                color={"palette.holy"}
                overflow="hidden"
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                pointerEvents="auto"
                cursor={isTextVisible ? "default" : "pointer"}
                {...props}
            >
                {text}
            </Text>
        </AppTooltip>
    )
}


export default EllipsisText;