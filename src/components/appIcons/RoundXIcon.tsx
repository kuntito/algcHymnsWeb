import { createIcon } from "@chakra-ui/react";

export const RoundXIcon = createIcon({
    displayName: "RoundXIcon",
    viewBox: "0 0 16 16",
    defaultProps: {
        color: "#B4CBED",
    },
    path: [
        <rect
            key="1"
            x="2.0001"
            y="1.99998"
            width="12"
            height="12"
            rx="6"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
        />,
        <path
            key="2"
            d="M8.00033 7.99996L10.3337 10.3333M8.00033 7.99996L5.66699 5.66663M8.00033 7.99996L5.66699 10.3333M8.00033 7.99996L10.3337 5.66663"
            stroke="currentColor"
            strokeWidth="0.666667"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />,
    ],
});
