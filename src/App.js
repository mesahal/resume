import { lazy, Suspense } from "react";
import Portfolio from "./components/Portfolio";

const Studio = lazy(() => import("./concepts/Studio"));
const House = lazy(() => import("./concepts/House"));
const Concepts = lazy(() => import("./concepts/Concepts"));

function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/__concepts/studio") {
    return <Suspense fallback={<p>Opening the idea room…</p>}><Studio /></Suspense>;
  }
  if (window.location.pathname.replace(/\/$/, "") === "/__concepts/house") {
    return <Suspense fallback={<p>Opening the house…</p>}><House /></Suspense>;
  }
  if (window.location.pathname === "/__concepts" || window.location.pathname.startsWith("/__concepts/")) {
    return <Suspense fallback={<p>Opening design previews…</p>}><Concepts /></Suspense>;
  }
  return (
    <div className="relative">
      <Portfolio />
    </div>
  );
}

export default App;
