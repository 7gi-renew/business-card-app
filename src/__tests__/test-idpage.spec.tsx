import { render, screen } from "@testing-library/react";
import { IdPage } from "../IdPage";
import { BrowserRouter } from "react-router";
import { UserDataRecord } from "../domain/record";
import { getUserData } from "../utils/supabase-function";

// jest.mock("../utils/supabase-function", () => {
//   return {
//     getUserData: jest.fn(),
//   };
// });

describe("名刺カードページのテスト", () => {
  test("文言が存在している", async () => {
    const sampleData = {
      user_id: "sample",
      name: "テスト花子",
      description: "よろしく",
      github_id: "test",
      qiita_id: "test",
      x_id: "test",
    };

    // const usingData = new UserDataRecord(
    //   "test",
    //   "こんにちは",
    //   "hoge",
    //   "hoge",
    //   "hoge",
    //   "React",
    // );

    // (getUserData as jest.Mock).mockRejectedValue(usingData);

    console.log(sampleData);

    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    expect(screen.getByText("Now loading...")).toBeInTheDocument();

    // await waitFor(async () => {
    //   await
    // });
  });
});
