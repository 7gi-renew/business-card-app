import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
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

  const onSubmit: SubmitHandler<Inputs> = async (value) => {
    setError(false);
    const getID = value.id;

    const matchingData = await matchID(getID);
    const matchingDataID = matchingData.user_id;

    if (matchingDataID === getID) {
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
            <Input type="text" data-testid="checkForm" {...register("id")} />
            {error && <p>該当のIDはありません</p>}
          </FormControl>
          <Button type="submit" data-testid="searchBtn" mt="4">
            検索
          </Button>
        </form>
      </Box>
      <></>
      <Box mt={6}>
        <Link
          data-testid="registerLink"
          onClick={() => navigate("/cards/register")}
        >
          新規登録はこちら
        </Link>
      </Box>
    </>
  );
}
