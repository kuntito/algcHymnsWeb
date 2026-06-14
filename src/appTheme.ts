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

const fontSizes = {
    blaze: "24px",
    modu: "16px",
    hush: "12px",
}

const appTheme = extendTheme({
    colors,
    fontSizes,
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