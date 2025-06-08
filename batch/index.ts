import { supabase } from "../src/utils/supabase";

async function deleteBeforeData() {
  // 前日の開始時刻を設定
  const yesterdayStart = new Date();
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);
  yesterdayStart.setUTCHours(0, 0, 0, 0);

  // 前日の開始時刻を設定
  const yesterdayFin = new Date();
  yesterdayFin.setDate(yesterdayFin.getDate() - 1);
  yesterdayFin.setUTCHours(23, 59, 59, 999);

  //   usersテーブルからデータを削除
  const deletedUsersResult = await supabase
    .from("users")
    .delete()
    .gte("created_at", yesterdayStart.toISOString())
    .lte("created_at", yesterdayFin.toISOString());

  console.log("delete_users:", deletedUsersResult);

  //   usersテーブルからデータを削除
  const deletedUserSkillsResult = await supabase
    .from("user_skill")
    .delete()
    .gte("created_at", yesterdayStart.toISOString())
    .lte("created_at", yesterdayFin.toISOString());

  console.log("delete_skill:", deletedUserSkillsResult);
}

deleteBeforeData()
  .then(() => console.log("success"))
  .catch((error) => console.error("failed", error));
