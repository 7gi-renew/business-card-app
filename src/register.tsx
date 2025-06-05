import {
  Box,
  Button,
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

export function Register() {
  const [userSkill, setUserSkill] = useState();
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
      <Heading as="h3" size="md" textAlign="left">
        新規名刺登録
      </Heading>
      <Box mt="4" mb="6">
        <Box px="6" py="8" boxShadow="md" borderColor="gray.100">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Heading as="h4" size="sm" textAlign="left">
              好きな英単語
            </Heading>
            <FormControl mt="2">
              <Input
                type="text"
                {...register("user_id", { pattern: /^[a-zA-Z]*$/ })}
              />
            </FormControl>
            {errors.user_id && <Text>英単語で入力してください</Text>}
            <Heading as="h4" size="sm" mt="3" textAlign="left">
              お名前 *
            </Heading>
            <FormControl mt="2">
              <Input
                type="text"
                {...register("name", { required: "未入力です" })}
              />
            </FormControl>
            {errors.name && <Text>{errors.name?.message}</Text>}
            <Heading as="h4" size="sm" mt="3" textAlign="left">
              自己紹介 *
            </Heading>
            <Textarea
              size="lg"
              mt="2"
              rows="6"
              {...register("description", { required: "未入力です" })}
            />
            {errors.description && <Text>{errors.description?.message}</Text>}
            <Heading as="h4" size="sm" mt="3" textAlign="left">
              好きな技術 *
            </Heading>

            <Select
              mt="2"
              defaultValue={loading || userSkill[0]}
              {...register("skill")}
            >
              {loading ||
                userSkill.map((skill: string) => {
                  return <option value={skill}>{skill}</option>;
                })}
            </Select>

            <Heading as="h4" size="sm" mt="3" textAlign="left">
              GitHub ID
            </Heading>
            <FormControl mt="2">
              <Input type="text" {...register("github_id")} />
            </FormControl>
            <Heading as="h4" size="sm" mt="3" textAlign="left">
              Qiita ID
            </Heading>
            <FormControl mt="2">
              <Input type="text" {...register("qiita_id")} />
            </FormControl>
            <Heading as="h4" size="sm" mt="3" textAlign="left">
              X ID
            </Heading>
            <FormControl mt="2">
              <Input type="text" {...register("x_id")} />
            </FormControl>
            <Button type="submit" mt="6">
              登録
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
}
