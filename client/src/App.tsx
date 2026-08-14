/* Brick Docs design reminder: docs-first routing with stable short URLs plus explicit versioned aliases for releases. */
import { Route, Switch } from "wouter";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Guide from "./pages/Guide";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/docs" component={Home} />
      <Route path="/docs/:version/:slug" component={Guide} />
      <Route path="/docs/:slug" component={Guide} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <Router />
    </ThemeProvider>
  );
}
