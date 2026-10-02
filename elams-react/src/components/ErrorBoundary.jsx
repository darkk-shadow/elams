import { Component } from 'react'
import { Box, Typography, Button } from '@mui/material'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2, p: 4 }}>
          <Typography variant="h5" color="error">Something went wrong</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 600, textAlign: 'center' }}>
            {this.state.error?.message}
          </Typography>
          <Button variant="contained" onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/' }}>
            Reload App
          </Button>
        </Box>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
