import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import TestHomePage from './pages/TestHomePage.tsx'
import TestLoginPage from './pages/TestLoginPage.tsx'

const browserRouter = createBrowserRouter([
   {
      path: "/",
      element: <TestLoginPage/>
   },
   {
      path: "/home",
      element: <TestHomePage />
   }
])

const App: React.FC = () => {
   return <RouterProvider router={browserRouter}/>
}

export default App
