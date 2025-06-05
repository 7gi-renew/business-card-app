import { Cards } from "../Cards";
import { IdPage } from "../IdPage";
import "../App.css";
import { Route, Routes } from "react-router";
import { Register } from "../register";
import { Home } from "../Home";

export function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/cards/register" element={<Register />} />
        <Route path="/cards/:id" element={<IdPage />} />
      </Routes>
    </>
  );
}
