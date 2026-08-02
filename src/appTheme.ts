import { extendTheme } from "@chakra-ui/react"

const colors = {
    palette: {
        iju: "#393182",
        cathedral: "#1A1A7A",
        creed: "#00003F",
        life: "#FFFFFF",
        holy: "#B4CBED",
        worship: "#00BBF0",
        testimony: "#AABDC7",
        dim: "#424242",
        debit: "#FD5273",
        raze: "#68B439",
    }
}

const textStyles = {
    blaze: {
        fontSize: "24px",
        fontWeight: "normal",
    },
    orion: {
        fontSize: "16px",
        fontWeight: "normal",
    },
    hush: {
        fontSize: "12px",
        fontWeight: "normal",
    },
    tiny: {
        fontSize: "8px",
        fontWeight: "normal",
    },
    mono: {
        fontSize: "10px",
        fontWeight: "normal",
        fontFamily: "monospace"
    }
}


const appTheme = extendTheme({
    colors,
    textStyles,
    styles: {
        global: {
            body: {
                background: "palette.creed",
                color: "palette.holy",
            }
        }
    },
})

export default appTheme;