import { BrowserRouter, HashRouter } from "react-router-dom";
import { AppShell } from "./AppShell";

export function AppRouter() {
  const Router = import.meta.env.MODE === "artifact" ? HashRouter : BrowserRouter;
  return <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><AppShell /></Router>;
}
