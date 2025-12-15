import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Auth from "@/pages/Auth";
import Home from "@/pages/Home";
import SearchPage from "@/pages/Search";
import CafeDetail from "@/pages/CafeDetail";
import Favorites from "@/pages/Favorites";
import Profile from "@/pages/Profile";
import Order from "@/pages/Order";
import { CollectionsProvider } from "./context/CollectionsContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Redirect to="/auth" />} />
      <Route path="/auth" component={Auth} />
      <Route path="/home" component={Home} />
      <Route path="/search" component={SearchPage} />
      <Route path="/cafe/:id" component={CafeDetail} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/profile" component={Profile} />
      <Route path="/order" component={Order} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <CollectionsProvider>
        <Router />
      </CollectionsProvider>
    </QueryClientProvider>
  );
}

export default App;
