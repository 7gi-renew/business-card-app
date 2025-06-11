import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import "./App.css";
import { useEffect, useState } from "react";
import {
  getAllUserSkills,
  getSkillID,
  insertUserData,
  insertUserSkillFromID,
} from "./utils/supabase-function";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";

// import { Route, Routes } from "react-router";

type Inputs = {
  user_id: string;
  name: string;
  description: string;
  github_id?: string;
  qiita_id?: string;
  x_id?: string;
  skill: string | number;
};

type SkillName = string | undefined;

export function Register() {
  const [userSkill, setUserSkill] = useState<SkillName[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    await insertUserData(
      data.user_id,
      data.name,
      data.description,
      data.github_id,
      data.qiita_id,
      data.x_id,
    );

    const getID = await getSkillID(data.skill);

    await insertUserSkillFromID(data.user_id, getID);

    await navigate("/");
  };

  useEffect(() => {
    const getUserSkill = async () => {
      const gettingSkill = await getAllUserSkills();

      const skillName = gettingSkill.map((value) => {
        return value.name;
      });

      setUserSkill(skillName);

      setLoading(false);
    };
    getUserSkill();
  }, []);

  return (
    <>
      <Box w="100vw" h="100%" bg="gray.200">
        <Center w="100%" h="100%" pt="6" pb="6">
          <Box>
            <Heading as="h3" size="md" textAlign="center">
              新規名刺登録
            </Heading>
            <Box bg="white" mt="4">
              <Box>
                <Box
                  px="6"
                  py="8"
                  boxShadow="md"
                  borderColor="gray.100"
                  borderRadius="6"
                >
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <Heading as="h4" size="sm" textAlign="left">
                      好きな英単語 *
                    </Heading>
                    <FormControl mt="2">
                      <Input
                        data-testid="idForm"
                        type="text"
                        {...register("user_id", {
                          pattern: /^[a-zA-Z]+$/,
                          required: true,
                        })}
                      />
                    </FormControl>
                    {errors.user_id && (
                      <Text fontSize="14px" color="red.600" mt="1">
                        単語が正しく入力されていません
                      </Text>
                    )}
                    <Heading as="h4" size="sm" mt="3" textAlign="left">
                      お名前 *
                    </Heading>
                    <FormControl mt="2">
                      <Input
                        type="text"
                        data-testid="nameForm"
                        {...register("name", {
                          required: "お名前が未入力です",
                        })}
                      />
                    </FormControl>
                    {errors.name && (
                      <Text fontSize="14px" color="red.600" mt="1">
                        {errors.name?.message}
                      </Text>
                    )}
                    <Heading as="h4" size="20px" mt="3" textAlign="left">
                      自己紹介 *
                    </Heading>
                    <Textarea
                      size="lg"
                      mt="2"
                      rows={6}
                      data-testid="descriptionForm"
                      {...register("description", {
                        required: "自己紹介が未入力です",
                      })}
                    />
                    {errors.description && (
                      <Text fontSize="14px" color="red.600" mt="1">
                        {errors.description?.message}
                      </Text>
                    )}
                    <Heading as="h4" size="sm" mt="3" textAlign="left">
                      好きな技術 *
                    </Heading>

                    <Select
                      mt="2"
                      defaultValue={loading ? userSkill[0] : ""}
                      {...register("skill")}
                      data-testid="skillForm"
                    >
                      {loading ||
                        userSkill.map((skill) => {
                          return <option value={skill}>{skill}</option>;
                        })}
                    </Select>

                    <Heading as="h4" size="sm" mt="3" textAlign="left">
                      GitHub ID
                    </Heading>
                    <FormControl mt="2">
                      <Input
                        type="text"
                        data-testid="GithubForm"
                        {...register("github_id")}
                      />
                    </FormControl>
                    <Heading as="h4" size="sm" mt="3" textAlign="left">
                      Qiita ID
                    </Heading>
                    <FormControl mt="2">
                      <Input
                        type="text"
                        data-testid="qiitaForm"
                        {...register("qiita_id")}
                      />
                    </FormControl>
                    <Heading as="h4" size="sm" mt="3" textAlign="left">
                      X ID
                    </Heading>
                    <FormControl mt="2">
                      <Input
                        type="text"
                        data-testid="twitterForm"
                        {...register("x_id")}
                      />
                    </FormControl>
                    <Button
                      w="100%"
                      type="submit"
                      data-testid="submitButton"
                      mt="6"
                    >
                      登録
                    </Button>
                  </form>
                </Box>
              </Box>
            </Box>
          </Box>
        </Center>
      </Box>
    </>
  );
}
