import Favorites from "@/app/anime/favorites/page";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

jest.mock("next/navigation");

describe("Favorites Page", () => {
  it("renders favorites page unchanged", () => {
    const { container } = render(<Favorites />);
    expect(container).toMatchSnapshot();
  });

  it("render NoData when there are no favorite items", () => {
    const { getByText } = render(<Favorites />);
    expect(getByText(/no data found/i)).toBeInTheDocument();
  });
});
