import { Image, Box, BoxProps, Center, Flex } from "@chakra-ui/react"
import { ReactNode } from "react"
import { Outlet } from "react-router-dom";
import GradientLayer from "./GradientLayer";


const AppFrame = () => {
    return (
        <Flex
            w={"100vw"}
            h={"100vh"}
            position={"relative"}
            display={"flex"}
            flexDirection={"column"}
        >
            <GradientLayer
                position="absolute"
                inset={0}
            />
            <Center
                position="absolute"
                inset={0}        
            >
                <Image 
                    src='algc_logo.png'
                    opacity={0.05}
                    boxSize={"200px"}
                />

            </Center>
            <Box
                position={"absolute"}
                inset={0}
            >
                <Outlet />
            </Box>
        </Flex>
    )
}

export default AppFrame;