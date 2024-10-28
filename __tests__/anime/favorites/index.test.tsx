import Favorites from "@/app/anime/favorites/page";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

// jest.mock("zustand");
// jest.mock("@/store/FavoriteStore", () => {
//   const { createStore } = jest.requireActual("@/store/FavoriteStore");
//   return createStore({
//     items: [],
//     totalItems: 0,
//   });
// });
jest.mock("next/navigation");

describe("Favorites Page", () => {
  beforeEach(() => {});

  it("renders favorites page unchanged", () => {
    const { container } = render(<Favorites />);
    expect(container).toMatchSnapshot();
  });

  it("render NoData when there are no favorite items", () => {
    const { getByText } = render(<Favorites />);

    expect(getByText(/no data found/i)).toBeInTheDocument();
  });

  //   it("renders favorite items when present", () => {
  //     const mockItems = [
  //       {
  //         mal_id: 1,
  //         title: "Anime 1",
  //         score: 8.5,
  //         images: {
  //           webp: {
  //             image_url: "http://example.com/image1.webp",
  //             large_image_url: "http://example.com/image1_large.webp",
  //           },
  //         },
  //       },
  //       {
  //         mal_id: 2,
  //         title: "Anime 2",
  //         score: 9.0,
  //         images: {
  //           webp: {
  //             image_url: "http://example.com/image2.webp",
  //             large_image_url: "http://example.com/image2_large.webp",
  //           },
  //         },
  //       },
  //     ];

  //     useFavoriteStore(() => ({
  //       items: mockItems,
  //       totalItems: mockItems.length,
  //     }));

  //     const { getByText } = render(<Favorites />);

  //     expect(getByText("Anime 1")).toBeInTheDocument();
  //     expect(getByText("Anime 2")).toBeInTheDocument();
  //   });
});
