import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
} from "@chakra-ui/react";
import "./App.css";
// import { Route, Routes } from "react-router";

import { useForm, SubmitHandler } from "react-hook-form";
import { matchID } from "./utils/supabase-function";
import { useNavigate } from "react-router";
import { useState } from "react";

export function Home() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  type Inputs = {
    id: string;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setError(false);
    const getID = data.id;

    console.log(getID);
    const matchingIDData = await matchID(getID);

    if (matchingIDData === "matching") {
      navigate(`/cards/${getID}`);
    } else {
      setError(true);
    }
  };

  return (
    <>
      <Heading as="h2" size="lg">
        デジタル名刺アプリ
      </Heading>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <FormLabel>ID</FormLabel>
            <Input type="text" {...register("id")} />
            {error && <p>該当のIDはありません</p>}
          </FormControl>
          <Button type="submit" mt="4">
            検索
          </Button>
        </form>
      </Box>
    </>
  );
}
