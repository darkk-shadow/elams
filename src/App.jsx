import { ThemeProvider, useTheme } from '@mui/material'
import './App.css'
import AuthProvider from './contexts/AuthProvider'
import RoutesIndex from './routes'
import { useCustomTheme } from './themes/theme'
import { useState } from 'react'
import ThemeContextProvider from './contexts/ThemeContextProvider'

function App() {

  const defTheme = useTheme();

  const [darkTheme, setDarkTheme] = useState(false);

  const customTheme = useCustomTheme(darkTheme?"dark":"light");

  return (
    <div className='App'>
      <ThemeContextProvider>
      <AuthProvider>
        <RoutesIndex />
      </AuthProvider>
      </ThemeContextProvider>
      
    </div>
  )
}

export default App
