import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText("Login");
  expect(linkElement).toBeInTheDocument();
});

test("renders learn react link", () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const linkElement = screen.getByText(/Register/i);
  expect(linkElement).toBeInTheDocument();
});
