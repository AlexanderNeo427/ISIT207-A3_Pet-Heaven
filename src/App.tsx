import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { ROUTE_URL } from './others/Globals'

const browserRouter = createBrowserRouter([
   { path: ROUTE_URL.HOME, element: <HomePage /> },
   { path: ROUTE_URL.AUTH, element: <AuthPage /> }
])

const App: React.FC = () => {
   return <RouterProvider router={browserRouter} />
}

export default App
