import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react"
import useIsMobile from "../util/useMobile";

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(false);
    const {isMobile} = useIsMobile();

    const theme = useMemo(() => {
        return createTheme({
            palette: {
                mode: darkTheme ? "dark" : "light",
            },
            components: {
                MuiPaper: {
                    styleOverrides: {
                        root: {
                            padding: "1em",
                            borderRadius: "1em",
                        },
                    },
                },
                MuiModal: {
                    styleOverrides: {
                        root: {
                            top: '50%',
                            left: '50%',
                            width: isMobile? null : 400,
                            transform: 'translate(-50%, -50%)',
                        },
                        backdrop: {
                            top: '50%',
                            left: '50%',
                            width: "100vw",
                            height: "100vh",
                            transform: 'translate(-50%, -50%)',
                        }
                    }
                },
                MuiMenu: {
                    styleOverrides:{
                        root: {
                            top: '50%',
                            left: '50%',
                            width: "100vw",
                            height: "100vh",
                            transform: 'translate(-50%, -50%)',
                        },

                    }
                }
            },
        });
    }, [darkTheme, isMobile]);

    const toggleTheme = () => {
        setDarkTheme((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );

}

export const useCustomTheme = () => {
    return useContext(ThemeContext)
}

export default ThemeContextProvider;