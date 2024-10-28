import Anime from "@/app/anime/page";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Home Page", () => {
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it("renders home page unchanged", () => {
    const { container } = render(<Anime />);
    expect(container).toMatchSnapshot();
  });

  it("renders initial empty state", () => {
    render(<Anime />);

    expect(screen.getByText(/Anime List/i)).toBeInTheDocument();
    expect(screen.getByText(/No data found/i)).toBeInTheDocument();
  });

  it("renders loading state", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: [], pagination: { last_visible_page: 0 } }),
      })
    ) as jest.Mock;

    render(<Anime />);
    expect(screen.getByText(/Anime List/i)).toBeInTheDocument();

    await waitFor(() => {
      const skeletons = screen.queryAllByTestId("skeleton-anime-card");
      expect(skeletons).toHaveLength(25);
    });
  });

  it("displays anime cards when data is fetched", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [
              {
                title: "Naruto",
                score: 8.5,
                mal_id: 1,
                images: {
                  webp: {
                    image_url: "small-url",
                    large_image_url: "large-url",
                  },
                },
              },
            ],
            pagination: {
              last_visible_page: 1,
            },
          }),
      })
    ) as jest.Mock;

    render(<Anime />);

    await waitFor(() => {
      expect(screen.getByText(/Naruto/i)).toBeInTheDocument();
      expect(screen.getByText(/8.5/i)).toBeInTheDocument();
    });
  });

  it("handles no data state", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: [],
            pagination: { last_visible_page: 0 },
          }),
      })
    ) as jest.Mock;

    render(<Anime />);

    await waitFor(() => {
      expect(screen.getByText(/No data found/i)).toBeInTheDocument();
    });
  });
});
