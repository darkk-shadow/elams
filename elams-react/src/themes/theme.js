import { createTheme, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

export const useCustomTheme = (mode) => {
    const customTheme = 
            createTheme({
                palette: {
                    mode: mode=="dark"? "dark" : "light"
                },
            }
        )

    return customTheme;
}