import { Switch, Route, Redirect } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/use-auth";
import { EnhancedHeader } from "@/components/layout/enhanced-header";
import { ThemeContextProvider } from "@/contexts/theme-context";

// Pages
import Login from "@/pages/login";
import EnhancedDashboard from "@/pages/enhanced-dashboard";
import Mood from "@/pages/mood";
import SOS from "@/pages/sos";
import Mindfulness from "@/pages/mindfulness";
import Chat from "@/pages/chat";
import Resources from "@/pages/resources";
import ProfileSettings from "@/pages/profile-settings";
import NotFound from "@/pages/not-found";

// Protected Route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // const { user } = useAuth();
  // if (!user) {
  //   return <Redirect to="/login" />;
  // }
  return (
    <div className="min-h-screen bg-background">
      <EnhancedHeader />
      <main className="animate-fade-in">
        {children}
      </main>
    </div>
  );
}

// Public Route wrapper (for login page)
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  
  if (user) {
    return <Redirect to="/dashboard" />;
  }
  
  return <>{children}</>;
}

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path="/login">
        <PublicRoute>
          <Login />
        </PublicRoute>
      </Route>
      
      {/* Protected routes */}
      <Route path="/dashboard">
        <ProtectedRoute>
          <EnhancedDashboard />
        </ProtectedRoute>
      </Route>
      
      <Route path="/mood">
        <ProtectedRoute>
          <Mood />
        </ProtectedRoute>
      </Route>
      
      <Route path="/sos">
        <ProtectedRoute>
          <SOS />
        </ProtectedRoute>
      </Route>
      
      <Route path="/mindfulness">
        <ProtectedRoute>
          <Mindfulness />
        </ProtectedRoute>
      </Route>
      
      <Route path="/chat">
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      </Route>
      
      <Route path="/resources">
        <ProtectedRoute>
          <Resources />
        </ProtectedRoute>
      </Route>
      
      <Route path="/settings">
        <ProtectedRoute>
          <ProfileSettings />
        </ProtectedRoute>
      </Route>
      
      {/* Root redirect */}
      <Route path="/">
        {() => {
          const { user } = useAuth();
          return <Redirect to={user ? "/dashboard" : "/login"} />;
        }}
      </Route>
      
      {/* 404 fallback */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <CssBaseline />
        <AuthProvider>
          <TooltipProvider>
            <div className="min-h-screen">
              <Router />
            </div>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  );
}

export default App;
