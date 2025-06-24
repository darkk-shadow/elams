import './App.css'
import AuthProvider from './contexts/AuthProvider'
import RoutesIndex from './routes'

function App() {

  return (
    <div className='App'>
      <AuthProvider>
        <RoutesIndex />
      </AuthProvider>
    </div>
  )
}

export default App
