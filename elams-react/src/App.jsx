import { CssBaseline } from '@mui/material'
import './App.css'
import AuthProvider from './contexts/AuthProvider'
import RoutesIndex from './routes'
import ThemeContextProvider from './contexts/ThemeContextProvider'
import { SnackbarProvider } from 'notistack'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <CssBaseline />
        <AuthProvider>
          <SnackbarProvider>
            <RoutesIndex />
          </SnackbarProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  )
}

export default App
