/* Brick Docs design reminder: every public URL must resolve to a real knowledge-base page with a clear escape route. */
import { Route, Switch, useLocation } from "wouter";
import DocsMotionLayer from "./components/DocsMotionLayer";
import DocsRouteTransition from "./components/DocsRouteTransition";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";
function Router() {
  // make sure to consider if you need authentication for certain routes
  const [location] = useLocation();

  return (
    <DocsRouteTransition key={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/docs" component={Home} />
        <Route path="/docs/:version/:slug" component={Guide} />
        <Route path="/docs/:slug" component={Guide} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </DocsRouteTransition>
  );
}

export default function App() {
  return (
    <>
      <DocsMotionLayer />
      <ThemeProvider defaultTheme="dark">
        <Router />
      </ThemeProvider>
    </>
  );
}
