import DetailAnime from "@/app/anime/[animeId]/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("next/navigation");

describe("Detail Anime Page", () => {
  it("renders detail anime page unchanged", () => {
    const { container } = render(<DetailAnime params={{ animeId: "1" }} />);
    expect(container).toMatchSnapshot();
  });

  it("displays anime cards when data is fetched", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: {
              mal_id: 1,
              title: "Naruto",
            },
          }),
      })
    ) as jest.Mock;

    render(<DetailAnime params={{ animeId: "1" }} />);

    await waitFor(() => {
      expect(screen.getByText(/Naruto/i)).toBeInTheDocument();
    });
  });

  it("render NoData when there is invalid id", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("Invalid anime id"))) as jest.Mock;

    render(<DetailAnime params={{ animeId: "invalid" }} />);

    await waitFor(() => {
      expect(screen.getByText(/No data found/i)).toBeInTheDocument();
    });
  });
});
