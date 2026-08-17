import { Route, Switch, useLocation } from "wouter";
import DocsMotionLayer from "./components/DocsMotionLayer";
import { ThemeProvider } from "./contexts/ThemeContext";
import { normalizeEdition, type DocsEdition } from "./lib/docs";
import Guide from "./pages/Guide";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function Router() {
  const [location] = useLocation();
  return (
    <Switch key={location}>
      <Route path="/" component={() => <Home edition="shared" />} />
      <Route path="/docs" component={() => <Home edition="shared" />} />
      <Route path="/docs/:edition/:slug">{(params) => <Guide edition={normalizeEdition(params.edition)} slug={params.slug} />}</Route>
      <Route path="/docs/:edition">{(params) => <Home edition={normalizeEdition(params.edition)} />}</Route>
      <Route path="/shared/:slug">{(params) => <Guide edition="shared" slug={params.slug} />}</Route>
      <Route path="/dedicated/:slug">{(params) => <Guide edition="dedicated" slug={params.slug} />}</Route>
      <Route path="/shared" component={() => <Home edition="shared" />} />
      <Route path="/dedicated" component={() => <Home edition="dedicated" />} />
      <Route path="/legacy/:slug">{(params) => <Guide edition="shared" slug={params.slug} />}</Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return <ThemeProvider defaultTheme="light"><DocsMotionLayer /><Router /></ThemeProvider>;
}
