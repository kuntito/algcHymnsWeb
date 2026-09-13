import { Tooltip, TooltipProps } from "@chakra-ui/react"


export const AppTooltip = ({
    label,
    children,
    ...rest
}: TooltipProps) => {
    return <Tooltip
        label={label}
        bg={"palette.holyAlpha"}
        borderRadius={"8px"}
        px={"8px"}
        py={"4px"}
        sx={{
            fontSize: "12px",
            fontWeight: "normal",
            fontFamily: "monospace",
        }}
        placement="auto"
        {...rest}
    >
        {children}
    </Tooltip>
}