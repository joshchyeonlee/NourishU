import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette:{
        background: {
            default: "#F7EFDF",
            paper: "#FFF9EC",
        },
        primary: {
            main: "#4F772D",
        },
        secondary: {
            main: "#6A994E",
        },
        error: {
            main: "#BC4749",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
        fontSize: 16,
        allVariants:{
            color:"#03191E"
        }
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    background: "#FFF9EC",
                }
            }
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    background: "#FFF9EC",
                }
            }
        },
    }
})

export default theme;