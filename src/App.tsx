import { Box, Flex, Center, Image, VStack } from '@chakra-ui/react';
import AppHeader from './components/AppHeader';
import OutlineButton from './components/OutlineButton';
import { AddIcon } from './components/appIcons/AddIcon';
import GradientLayer from './components/util/GradientLayer';
import AppFrame from './components/util/AppFrame';

function App() {

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
                opacity={0.1}
                boxSize={"200px"}
            />

        </Center>
        <Box
            position={"absolute"}
            inset={0}
            flexDirection={"column"}
            overflowY={"auto"}
        >
            <VStack            
                w={"100%"}
                h={"100%"}
                
            >
                {/* app content goes here */}
            </VStack>
        </Box>
    </Flex>
  )
}

export default App
