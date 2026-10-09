import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import ProductCard from "../components/ProductCard";

const product = {
  id: 7,
  title: "Red Lipstick",
  price: 12.99,
  rating: 4.5,
  category: "beauty",
  thumbnail: "https://example.com/lipstick.jpg",
};

function renderCard() {
  return render(
    <MemoryRouter>
      <ProductCard product={product} />
    </MemoryRouter>
  );
}

describe("ProductCard", () => {
  it("shows the title, price, rating and category", () => {
    renderCard();

    expect(screen.getByText("Red Lipstick")).toBeInTheDocument();
    expect(screen.getByText("$12.99")).toBeInTheDocument();
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
    expect(screen.getByText("beauty")).toBeInTheDocument();
  });

  it("links to the product detail page", () => {
    renderCard();

    const link = screen.getByRole("link", { name: "Red Lipstick" });
    expect(link).toHaveAttribute("href", "/products/7");
  });

  it("gives the image alt text", () => {
    renderCard();

    expect(screen.getByAltText("Red Lipstick")).toBeInTheDocument();
  });
});