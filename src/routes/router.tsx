import { createBrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/signinPage';
import SignUpPage from '../pages/SignupPage';
import Home from '../pages/Home';
import { ProtectedRoute } from './protectRoutes';
import { AuthRedirect } from './AuthRedirect';

export const router = createBrowserRouter([
 
  {
    path: "/signin",
    element:  <AuthRedirect> <SignInPage /> </AuthRedirect>
  },
  {
    path: "/signup",
    element:  <AuthRedirect> <SignUpPage /> </AuthRedirect>
  },
  {
    path: "/",
    element:  <ProtectedRoute> <Home /> </ProtectedRoute>
  },
]);
