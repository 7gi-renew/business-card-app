import "./App.css";
import { useParams } from "react-router";
// import { Route, Routes } from "react-router";

export function IdPage() {
  const { id } = useParams();
  // const { search } = useLocation();

  return (
    <>
      <p>IDは{id}です</p>
    </>
  );
}
