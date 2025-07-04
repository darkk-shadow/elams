import { createTheme, ThemeProvider } from "@mui/material";
import { createContext, useContext, useMemo, useState } from "react"

const ThemeContext = createContext();

const ThemeContextProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(false);

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
            },
        });
    }, [darkTheme]);

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