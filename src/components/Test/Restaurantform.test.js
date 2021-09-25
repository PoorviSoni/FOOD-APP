import { render, screen } from "@testing-library/react";
import RestaurantRegister from "../RestaurantRegister";
import { Provider } from "react-redux";
import store from "../../store/store";
import userEvent from "@testing-library/user-event"
test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister/>
    </Provider>
  );
  const linkElement = screen.getByPlaceholderText("password");
  expect(linkElement).toBeInTheDocument();
});

test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister />
    </Provider>
  );
  const linkElement = screen.getByPlaceholderText("contactnumber");
  expect(linkElement).toBeInTheDocument();
});

test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister />
    </Provider>
  );
  const linkElement = screen.getByPlaceholderText("Enter ownername");
  expect(linkElement).toBeInTheDocument();
});

test("renders restaurantform link", () => {
  render(
    <Provider store={store}>
      <RestaurantRegister />
    </Provider>
  );
  const linkElement = screen.getByRole("button");
  userEvent.click(linkElement);
  expect(linkElement).toBeVisible();
});
