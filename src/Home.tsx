import {
  Box,
  Button,
  Center,
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
      <Box w="100vw" h="100vh" bg="gray.200">
        <Center w="100vw" h="100vh">
          <Box>
            <Heading as="h2" size="lg" textAlign="center">
              デジタル名刺アプリ
            </Heading>
            <Box w="320px" margin="0 auto" display="flex" alignItems="center">
              <Box
                w="100%"
                px="4"
                py="6"
                bg="white"
                mt="4"
                borderRadius="6"
                boxShadow="md"
              >
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FormControl>
                    <FormLabel>ID</FormLabel>
                    <Input
                      bg="white"
                      type="text"
                      borderColor=""
                      data-testid="checkForm"
                      {...register("id")}
                    />
                    {error && <p>該当のIDはありません</p>}
                  </FormControl>
                  <Button
                    type="submit"
                    data-testid="searchBtn"
                    mt="6"
                    w="100%"
                    bg="teal.500"
                    border="none"
                    color="white"
                    _hover={{
                      background: "teal.400",
                    }}
                  >
                    検索
                  </Button>
                </form>
              </Box>
            </Box>
            <Box mt={6} textAlign="center">
              <Link
                data-testid="registerLink"
                onClick={() => navigate("/cards/register")}
                _hover={{
                  textUnderlinePosition: "none",
                  color: "gray.500",
                }}
              >
                新規登録はこちら
              </Link>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
}
