import { render, screen, waitFor } from "@testing-library/react";
import { Register } from "../register";
import { BrowserRouter } from "react-router";
import {
  getAllUserSkills,
  insertUserData,
  insertUserSkillFromID,
} from "../utils/supabase-function";
import userEvent from "@testing-library/user-event";

jest.mock("../utils/supabase-function", () => {
  return {
    getAllUserSkills: jest.fn(),
    getSkillID: jest.fn(),
    insertUserSkillFromID: jest.fn(),
    insertUserData: jest.fn(),
  };
});

// useNavigateをモック化
const mockedNavigator = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigator,
}));

describe("登録ページのテスト", () => {
  const skillData = [
    {
      created_at: "2025-05-21T12:24:05.621428+00:00",
      id: "1",
      name: "React",
    },
    {
      created_at: "2025-05-21T12:24:05.621428+00:00",
      id: "2",
      name: "TypeScript",
    },
    {
      created_at: "2025-05-21T12:24:05.621428+00:00",
      id: "3",
      name: "Vue",
    },
  ];

  const RegisterFullData = {
    user_id: "sample",
    name: "テスト花子",
    description: "よろしく",
    skill: "React",
    github_id: "hoge",
    qiita_id: "hoge",
    x_id: "hoge",
  };

  const RegisterLackId = {
    name: "テスト花子",
    description: "よろしく",
    skill: "React",
    github_id: "hoge",
    qiita_id: "hoge",
    x_id: "hoge",
  };

  const RegisterLackName = {
    user_id: "sample",
    description: "よろしく",
    skill: "React",
    github_id: "hoge",
    qiita_id: "hoge",
    x_id: "hoge",
  };

  const RegisterLackDescription = {
    user_id: "sample",
    name: "テスト花子",
    skill: "React",
    github_id: "hoge",
    qiita_id: "hoge",
    x_id: "hoge",
  };

  const RegisterLackOption = {
    user_id: "sample",
    name: "テスト花子",
    description: "よろしく",
    skill: "React",
    github_id: "",
    qiita_id: "",
    x_id: "",
  };

  const skillId = ["React", 1];

  (getAllUserSkills as jest.Mock).mockResolvedValue(skillData);

  test("自己紹介が表示されている", async () => {
    (insertUserData as jest.Mock).mockResolvedValue(RegisterFullData);
    (insertUserSkillFromID as jest.Mock).mockResolvedValue(skillId);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByText("新規名刺登録")).toBeInTheDocument();
    });
  });

  test("全項目を入力して登録ボタンを押すと/に遷移する", async () => {
    (insertUserData as jest.Mock).mockResolvedValue(RegisterFullData);
    (insertUserSkillFromID as jest.Mock).mockResolvedValue(skillId);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      await userEvent.type(screen.getByTestId("idForm"), "sample");
      await userEvent.type(screen.getByTestId("nameForm"), "テスト花子");
      await userEvent.type(screen.getByTestId("descriptionForm"), "よろしく");
      await userEvent.selectOptions(screen.getByTestId("skillForm"), "React");
      await userEvent.type(screen.getByTestId("GithubForm"), "hoge");
      await userEvent.type(screen.getByTestId("qiitaForm"), "hoge");
      await userEvent.type(screen.getByTestId("twitterForm"), "hoge");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("submitButton"));
      await expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });

  test("IDがない場合にエラーメッセージが出る", async () => {
    (insertUserData as jest.Mock).mockResolvedValue(RegisterLackId);
    (insertUserSkillFromID as jest.Mock).mockResolvedValue(skillId);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      await userEvent.type(screen.getByTestId("nameForm"), "テスト花子");
      await userEvent.type(screen.getByTestId("descriptionForm"), "よろしく");
      await userEvent.selectOptions(screen.getByTestId("skillForm"), "React");
      await userEvent.type(screen.getByTestId("GithubForm"), "hoge");
      await userEvent.type(screen.getByTestId("qiitaForm"), "hoge");
      await userEvent.type(screen.getByTestId("twitterForm"), "hoge");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("submitButton"));
      await expect(
        screen.getByText("単語が正しく入力されていません"),
      ).toBeInTheDocument();
    });
  });

  test("名前がない場合にエラーメッセージが出る", async () => {
    (insertUserData as jest.Mock).mockResolvedValue(RegisterLackName);
    (insertUserSkillFromID as jest.Mock).mockResolvedValue(skillId);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      await userEvent.type(screen.getByTestId("idForm"), "sample");
      await userEvent.type(screen.getByTestId("descriptionForm"), "よろしく");
      await userEvent.selectOptions(screen.getByTestId("skillForm"), "React");
      await userEvent.type(screen.getByTestId("GithubForm"), "hoge");
      await userEvent.type(screen.getByTestId("qiitaForm"), "hoge");
      await userEvent.type(screen.getByTestId("twitterForm"), "hoge");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("submitButton"));
      await expect(screen.getByText("お名前が未入力です")).toBeInTheDocument();
    });
  });

  test("名前がない場合にエラーメッセージが出る", async () => {
    (insertUserData as jest.Mock).mockResolvedValue(RegisterLackDescription);
    (insertUserSkillFromID as jest.Mock).mockResolvedValue(skillId);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      await userEvent.type(screen.getByTestId("idForm"), "sample");
      await userEvent.type(screen.getByTestId("nameForm"), "テスト花子");
      await userEvent.selectOptions(screen.getByTestId("skillForm"), "React");
      await userEvent.type(screen.getByTestId("GithubForm"), "hoge");
      await userEvent.type(screen.getByTestId("qiitaForm"), "hoge");
      await userEvent.type(screen.getByTestId("twitterForm"), "hoge");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("submitButton"));
      await expect(
        screen.getByText("自己紹介が未入力です"),
      ).toBeInTheDocument();
    });
  });

  test("オプションがなくても他の項目が入力済みなら登録ボタンを押すと/に遷移する", async () => {
    (insertUserData as jest.Mock).mockResolvedValue(RegisterLackOption);
    (insertUserSkillFromID as jest.Mock).mockResolvedValue(skillId);

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      await userEvent.type(screen.getByTestId("idForm"), "sample");
      await userEvent.type(screen.getByTestId("nameForm"), "テスト花子");
      await userEvent.type(screen.getByTestId("descriptionForm"), "よろしく");
      await userEvent.selectOptions(screen.getByTestId("skillForm"), "React");
      await userEvent.type(screen.getByTestId("GithubForm"), "hoge");
      await userEvent.type(screen.getByTestId("qiitaForm"), "hoge");
      await userEvent.type(screen.getByTestId("twitterForm"), "hoge");
    });

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("submitButton"));
      await expect(mockedNavigator).toHaveBeenCalledWith("/");
    });
  });
});
