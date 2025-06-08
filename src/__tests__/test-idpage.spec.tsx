import { render, screen, waitFor } from "@testing-library/react";
import { IdPage } from "../IdPage";
import { BrowserRouter } from "react-router";
import { UserSkillRecord, UserSkills } from "../domain/record";
import userEvent from "@testing-library/user-event";
import {
  getUserData,
  getUserSkillId,
  getUserSkills,
} from "../utils/supabase-function";

// supabaseと連携するコードをモック化
jest.mock("../utils/supabase-function", () => {
  return {
    getUserData: jest.fn(),
    getUserSkillId: jest.fn(),
    getUserSkills: jest.fn(),
  };
});

// useNavigateをモック化
const mockedNavigator = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigator,
}));

describe("名刺カードページのテスト", () => {
  const userSkillID = new UserSkillRecord("1", "test", 1);
  const usingSkill = new UserSkills(1, "React");

  (getUserData as jest.Mock).mockResolvedValue([
    {
      name: "test",
      description: "こんにちは",
      github_id: "hoge",
      qiita_id: "hoge",
      x_id: "hoge",
      skill: "React",
      user_id: "test",
    },
  ]);
  (getUserSkillId as jest.Mock).mockResolvedValue(userSkillID);
  (getUserSkills as jest.Mock).mockResolvedValue(usingSkill);

  test("名前が表示されている", async () => {
    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByText("test")).toBeInTheDocument();
    });
  });

  test("自己紹介が表示されている", async () => {
    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByText("こんにちは")).toBeInTheDocument();
    });
  });

  test("技術が表示されている", async () => {
    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByText("React")).toBeInTheDocument();
    });
  });

  test("GitHubアイコンが表示されている", async () => {
    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByTestId("GitHub"));
    });
  });

  test("Qiitaアイコンが表示されている", async () => {
    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByTestId("Qiita"));
    });
  });

  test("Twitterアイコンが表示されている", async () => {
    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByTestId("Twitter"));
    });
  });

  test("ボタンを押すとトップに戻る", async () => {
    render(
      <BrowserRouter>
        <IdPage />
      </BrowserRouter>,
    );

    const backButton = screen.getByTestId("backButton");
    await userEvent.click(backButton);

    await waitFor(async () => {
      await expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });
});
