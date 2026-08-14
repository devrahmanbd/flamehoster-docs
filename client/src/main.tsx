import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { bootstrapAnalytics } from "./lib/analytics";

bootstrapAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
