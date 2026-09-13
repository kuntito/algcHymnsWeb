import { createIcon } from "@chakra-ui/react";

export const LeftChevronIcon = createIcon({
    displayName: "LeftChevronIcon",
    viewBox: "0 0 24 24",
    defaultProps: {
        fill: "none",
        color: "palette.infamous"
    },
    path: (
        <path
            d="M15 4L7 12L15 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    ),
});
