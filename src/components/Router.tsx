import { MemberProvider } from '@/integrations';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/lib/scroll-to-top';
import { MemberProtectedRoute } from '@/components/ui/member-protected-route';
import ErrorPage from '@/integrations/errorHandlers/ErrorPage';

// Import pages
import Layout from '@/components/Layout';
import HomePage from '@/components/pages/HomePage';
import AuthPage from '@/components/pages/AuthPage';
import ProfilePage from '@/components/pages/ProfilePage';
import CatalogPage from '@/components/pages/CatalogPage';
import ProductDetailPage from '@/components/pages/ProductDetailPage';
import DashboardPage from '@/components/pages/DashboardPage';
import ContactPage from '@/components/pages/ContactPage';

// Layout wrapper that includes ScrollToTop
function LayoutWrapper() {
  return (
    <>
      <ScrollToTop />
      <Layout />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />, // MIXED ROUTE: Shows different content for authenticated vs anonymous users
      },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "catalog",
        element: <CatalogPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "profile",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your profile">
            <ProfilePage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access your dashboard">
            <DashboardPage />
          </MemberProtectedRoute>
        ),
      },
      {
        path: "analytics",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access analytics">
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Analytics Dashboard</h1>
                <p className="font-paragraph text-dark-grey">Analytics features coming soon...</p>
              </div>
            </div>
          </MemberProtectedRoute>
        ),
      },
      {
        path: "notifications",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to view notifications">
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Notifications</h1>
                <p className="font-paragraph text-dark-grey">Notifications center coming soon...</p>
              </div>
            </div>
          </MemberProtectedRoute>
        ),
      },
      {
        path: "upload",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to upload products">
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Upload Products</h1>
                <p className="font-paragraph text-dark-grey">Product upload interface coming soon...</p>
              </div>
            </div>
          </MemberProtectedRoute>
        ),
      },
      {
        path: "moderation",
        element: (
          <MemberProtectedRoute messageToSignIn="Sign in to access moderation tools">
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-heading font-bold text-foreground mb-4">Moderation Panel</h1>
                <p className="font-paragraph text-dark-grey">Moderation tools coming soon...</p>
              </div>
            </div>
          </MemberProtectedRoute>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
], {
  basename: import.meta.env.BASE_NAME,
});

export default function AppRouter() {
  return (
    <MemberProvider>
      <RouterProvider router={router} />
    </MemberProvider>
  );
}
