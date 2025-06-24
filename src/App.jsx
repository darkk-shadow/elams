import { ThemeProvider, useTheme } from '@mui/material'
import './App.css'
import AuthProvider from './contexts/AuthProvider'
import RoutesIndex from './routes'
import { useCustomTheme } from './themes/theme'

function App() {

  const defTheme = useTheme();

  const customTheme = useCustomTheme();

  return (
    <div className='App'>
      <ThemeProvider theme={customTheme || defTheme}>
      <AuthProvider>
        <RoutesIndex />
      </AuthProvider>
      </ThemeProvider>
    </div>
  )
}

export default App
