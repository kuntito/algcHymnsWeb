import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import appTheme from './appTheme'
import appScreenRouter from './appScreenRouter';
import { RouterProvider } from 'react-router'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={appTheme}>
        <RouterProvider router={appScreenRouter} />
    </ChakraProvider>
  </React.StrictMode>,
)
