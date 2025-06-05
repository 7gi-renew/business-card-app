import { Button } from "@chakra-ui/react";
import "./App.css";
import { useNavigate } from "react-router";
// import { Route, Routes } from "react-router";

export function Cards() {
  const navigate = useNavigate();

  const clickButton = () => {
    navigate("/");
  };

  return (
    <>
      <Button onClick={clickButton} colorScheme="red">
        ボタン！
      </Button>
    </>
  );
}
