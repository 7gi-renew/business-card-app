import "./App.css";
import { BrowserRouter } from "react-router";
import { Router } from "./routing/Router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
