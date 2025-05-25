import { Cards } from "../Cards";
import { IdPage } from "../IdPage";
import "../App.css";
import { Route, Routes } from "react-router";

export function Router() {
  return (
    <>
      <Routes>
        <Route path="/cards" element={<Cards />} />
        <Route path="/cards/:id" element={<IdPage />} />
      </Routes>
    </>
  );
}
