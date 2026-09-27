import { Box, BoxProps } from "@chakra-ui/react";

interface GradientLineProps extends BoxProps {
    colorStart: string;
    colorTrail: string;
    height?: number;
}

/**
 * gradients are raw CSS strings, so Chakra never resolves tokens inside them.
 *
 * this turns a token like `palette.worship` into its CSS variable,
 * `var(--chakra-colors-palette-worship)`.
 *
 * anything that isn't a dotted token, like `red`, `#fff`, or `rgba(...)`,
 * is returned untouched.
 * 
 * - CLAUDE
 */
const toCssColor = (color: string) => {
    const tokenPattern = /^[a-z]+(\.[a-z0-9]+)+$/i;

    const isToken = tokenPattern.test(color);

    if (!isToken) return color;

    const variableName = color.replaceAll(".", "-");

    return `var(--chakra-colors-${variableName})`;
};

const GradientLine = ({
    colorStart,
    colorTrail,
    height = 1,
    ...rest
}: GradientLineProps) => {
    const startColor = toCssColor(colorStart);

    const trailColor = toCssColor(colorTrail);

    const transparentTrail = `color-mix(in srgb, ${trailColor} 0%, transparent)`;

    const gradient = `linear-gradient(to right, ${startColor} 0%, ${transparentTrail} 85%)`;

    const heightInPixels = `${height}px`;

    return (
        <Box
            width="full"
            height={heightInPixels}
            background={gradient}
            opacity={0.3}
            {...rest}
        />
    );
};

export default GradientLine;