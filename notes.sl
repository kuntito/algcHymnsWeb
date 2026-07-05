+   to create the project, (this assumes vite is installed)
    `npm create vite@4.1.0 .`

    `.` uses the cwd as the project root

    -   framework, select `React`
    -   variant, select `TypeScript`

+   install dependencies
    `npm i`

+   Chakra UI:
    `npm i @chakra-ui/react@2.10.3`

+   zustand state management
    `npm i zustand`

+   converts time strings to milliseconds, allows me do ms("10s"):
    `npm i ms@2.1.3`
    `npm i -D @types/ms`
    
    `-D` means it's only available in the development environment

+   `git init`

+   add to `.gitignore`
    `

    # Logs
    logs
    *.log
    npm-debug.log*
    yarn-debug.log*
    yarn-error.log*
    pnpm-debug.log*
    lerna-debug.log*

    node_modules
    dist
    dist-ssr
    *.local

    # Editor directories and files
    .vscode/*
    !.vscode/extensions.json
    .idea
    .DS_Store
    *.suo
    *.ntvs*
    *.njsproj
    *.sln
    *.sw?
    .env

    .vercel
    `

+   to change default port number,
    go to `vite.config.ts`, add:

    `
    export default defineConfig({
        ...,
        server: {
            port: 5178
        },
    })
    `

+   run server with:
    `npm run dev`


*** MISC DEPENDENCY ***

+   for page navigation.
    `npm i react-router-dom`
