import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import { ROUTE_URL } from './others/Globals'
import AdoptionGalleryPage from './pages/AdoptionGalleryPage'
import PetDetailPage from './pages/PetDetailPage'
import CheckoutPage from './pages/CheckoutPage'
import ReceiptPage from './pages/ReceiptPage'

const browserRouter = createBrowserRouter([
   { path: ROUTE_URL.HOME, element: <HomePage /> },
   { path: ROUTE_URL.AUTH, element: <AuthPage /> },
   { path: ROUTE_URL.GALLERY, element: <AdoptionGalleryPage /> },
   { path: ROUTE_URL.PET_DETAIL, element: <PetDetailPage /> },
   { path: ROUTE_URL.CHECKOUT, element: <CheckoutPage /> },
   { path: ROUTE_URL.RECEIPT, element: <ReceiptPage /> }
])

const App: React.FC = () => {
   return <RouterProvider router={browserRouter} />
}

export default App
