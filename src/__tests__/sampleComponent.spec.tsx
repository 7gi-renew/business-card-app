import { render, screen } from "@testing-library/react";
import App from "../App";

describe("テスト", () => {
  test("文言が存在している", () => {
    render(<App />);

    expect(screen.getByText("Vite + React")).toBeInTheDocument();
  });
});
