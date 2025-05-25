import { Button } from "@chakra-ui/react";
import "./App.css";
import { BrowserRouter, Link } from "react-router";
import { Router } from "./routing/Router";

// import { Route, Routes } from "react-router";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Button colorScheme="blue">Button</Button>
        <Link to="/cards/:id">リンク</Link>
        <Router />
      </BrowserRouter>
    </>
  );
}
