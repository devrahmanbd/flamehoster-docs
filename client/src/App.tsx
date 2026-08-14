/* Brick Docs design reminder: enterprise developer documentation with an obsidian canvas, electric-cyan signal color, asymmetric three-column reading layout, and restrained motion. */
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
