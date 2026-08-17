import { Route, Switch, useLocation } from "wouter";
import DocsMotionLayer from "./components/DocsMotionLayer";
import DocsRouteTransition from "./components/DocsRouteTransition";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";
import type { DocsVersion } from "./lib/docs";

function Router() {
  const [location] = useLocation();

  return (
    <DocsRouteTransition key={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/docs" component={Home} />
        <Route path="/docs/:version/:slug">
          {(params) => <Guide slug={params.slug} version={params.version as DocsVersion} />}
        </Route>
        <Route path="/docs/:slug">
          {(params) => <Guide slug={params.slug} version="v0.9" />}
        </Route>
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
