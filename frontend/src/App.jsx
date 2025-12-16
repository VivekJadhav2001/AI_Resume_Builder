import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Preview from './pages/Preview'
import Home from './pages/Home'
import Form from './pages/Form'
import NavBar from './components/NavBar'
import ErrorFallback from './components/ErrorFallback.jsx'
import { ErrorBoundary } from 'react-error-boundary'
import ProtectedRoute from './components/ProtectedRoute'
import { ROUTES_PATH } from './constant';
import DownloadSuccess from './pages/DownloadSuccess.jsx'

function App() {


  return (
    <BrowserRouter>
      <NavBar />
      <ErrorBoundary FallbackComponent={ErrorFallback}>

        <Routes>
           {/* Public Route */}
            <Route path={ROUTES_PATH.HOME} element={<Home />} />
         {/* Protected Form Route */}
        <Route 
          path={ROUTES_PATH.FORM_SECTIONS} 
          element={
            <ProtectedRoute route={ROUTES_PATH.FORM_SECTIONS}>
              <Form />
            </ProtectedRoute>
          } 
        />
                  {/* Protected Preview Route */}
        <Route 
          path={ROUTES_PATH.PREVIEW} 
          element={
            <ProtectedRoute route={ROUTES_PATH.PREVIEW}>
              <Preview />
            </ProtectedRoute>
          } 
        />
        {/* Download Resume Success Page */}
        <Route path={ROUTES_PATH.RESUME_SUCCESS} element={<DownloadSuccess />} />
        </Routes>
      </ErrorBoundary>

    </BrowserRouter >


  )
}

export default App
