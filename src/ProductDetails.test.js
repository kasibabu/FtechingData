import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductDetailsPage from "./ProductDetailsPage";

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 9.99,
  image: "test.jpg",
  description: "This is a test product.",
};

test("renders product details", () => {
  render(<ProductDetailsPage addToCart={() => {}} />, {
    route: "/product/1",
  });

  // Simulate the API response with the mock product details
  fetchMock.mockOnce(JSON.stringify(mockProduct));

  // Check if the product details are rendered
  expect(screen.getByText(/Product Details/i)).toBeInTheDocument();
  expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  expect(screen.getByText(/Price: \$9.99/i)).toBeInTheDocument();
  expect(screen.getByAltText(/Test Product/i)).toBeInTheDocument();
  expect(
    screen.getByText(/This is a test product./i)
  ).toBeInTheDocument();

  // Check if the "Add to Cart" button is rendered
  const addToCartButton = screen.getByRole("button", {
    name: /Add to Cart/i,
  });
  expect(addToCartButton).toBeInTheDocument();

  // Simulate adding the product to the cart
  userEvent.click(addToCartButton);

  // You can add further assertions if needed
});
