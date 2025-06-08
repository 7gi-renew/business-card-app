import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router";
import { matchID } from "../utils/supabase-function";
import { Home } from "../Home";
import userEvent from "@testing-library/user-event";

jest.mock("../utils/supabase-function", () => {
  return {
    matchID: jest.fn(),
  };
});

// useNavigateをモック化
const mockedNavigator = jest.fn();
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useNavigate: () => mockedNavigator,
}));

const registerData = {
  user_id: "sample",
  description: "Hi.",
  name: "太郎",
  github_id: "hoge",
  qiita_id: "hoge",
  x_id: "hoge",
};

describe("TOPページのテスト", () => {
  (matchID as jest.Mock).mockResolvedValue(registerData);

  test("タイトルが表示されている", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      expect(screen.getByText("デジタル名刺アプリ")).toBeInTheDocument();
    });
  });

  test("IDを入力してボタンを押すと/cards/:idに遷移する", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    await userEvent.type(screen.getByTestId("checkForm"), "sample");

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("searchBtn"));
      await expect(mockedNavigator).toHaveBeenCalledWith("/cards/sample");
    });
  });

  test("IDが未入力だとエラーメッセージが出る", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("searchBtn"));
      await expect(
        screen.getByText("該当のIDはありません"),
      ).toBeInTheDocument();
    });
  });

  test("新規登録ボタンを押すとregisterページに遷移する", async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>,
    );

    await waitFor(async () => {
      await userEvent.click(screen.getByTestId("registerLink"));
      await expect(mockedNavigator).toHaveBeenCalledWith("/cards/register");
    });
  });
});
