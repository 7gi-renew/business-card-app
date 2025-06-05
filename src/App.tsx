// import { Button } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter } from "react-router";
import { Router } from "./routing/Router";

// import { Route, Routes } from "react-router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </>
  );
}
