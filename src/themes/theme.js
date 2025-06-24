import { createTheme, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export const useCustomTheme = () => {
    const theme = useTheme()
    const [customTheme, setCustomTheme] = useState();

    useEffect(()=>{
        setCustomTheme(
            createTheme({
                components: {
                    MuiPaper: {
                        styleOverrides: {
                            root: {
                                border: `1px solid ${theme.palette.primary.main}`,
                                padding: "1em"
                            }
                        }
                    }
                }
            }
        ))
    }, [theme])

    return customTheme;
}