import { Box, BoxProps } from "@chakra-ui/react"

interface Props extends BoxProps {

}

const GradientLayer = ({ ...boxProps }) => {
    return (
        <Box
            {...boxProps}
            bgGradient="linear(to-b, #00003F 24%, #000080 69%, #01019D 100%)"
        />
    )
}

export default GradientLayer