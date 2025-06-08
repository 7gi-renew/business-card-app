import { UserDataRecord } from "../domain/record";
import { supabase } from "./supabase";

export const getUserData = async (value?: number | string) => {
  const response = await supabase
    .from("users")
    .select("*")
    .eq("user_id", value);

  if (response.error) {
    throw new Error(response.error.message);
  }

  const newData = response.data.map((value) => {
    return UserDataRecord.newUserDataRecord(
      value.name,
      value.description,
      value.github_id,
      value.qiita_id,
      value.x_id,
    );
  });

  return newData;
};

export const getUserSkillId = async (value: string | undefined) => {
  const response = await supabase
    .from("user_skill")
    .select("*")
    .eq("user_id", value)
    .single();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

export const getSkill = async (value: string | undefined) => {
  const response = await supabase
    .from("user_skill")
    .select("*")
    .eq("user_id", value)
    .single();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

// idと合致するユーザースキルを取得する
export const getUserSkills = async (value: number | undefined) => {
  const response = await supabase
    .from("skills")
    .select("*")
    .eq("id", value)
    .single();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

export const getAllUserSkills = async () => {
  const response = await supabase.from("skills").select("*");

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};

// usersの挿入
export const insertUserData = async (
  id: string,
  name: string,
  description: string,
  githubid?: string,
  qiitaid?: string,
  x_id?: string,
) => {
  const { data, error } = await supabase.from("users").insert({
    user_id: id,
    name: name,
    description: description,
    github_id: githubid,
    qiita_id: qiitaid,
    x_id: x_id,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// スキル名と合致するスキルidを取得する
export const getSkillID = async (skill: string | number) => {
  const response = await supabase
    .from("skills")
    .select("*")
    .eq("name", skill)
    .single();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data.id;
};

// 上で取得したidをもとにuser_skillテーブルに値を追加する
export const insertUserSkillFromID = async (
  userid: string,
  skillid: number,
) => {
  const { data, error } = await supabase.from("user_skill").insert({
    user_id: userid,
    skill_id: skillid,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// 記載されたIDの値とDBの値を照合し、合っていればメッセージを返す
export const matchID = async (value?: string) => {
  const response = await supabase
    .from("users")
    .select("*")
    .eq("user_id", value)
    .single();

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data;
};
