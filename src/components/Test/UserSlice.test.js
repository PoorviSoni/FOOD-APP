import reducer, { clearLoginStatus } from "../../store/userSlice";
it("should return the initial state", () => {
  expect(
    reducer(
      {
        userObj: {},
        isSuccess: false,
        isLoading: false,
        isError: false,
        invalidLogin: "",
      },
      {}
    )
  ).toEqual({
    userObj: {},
    isSuccess: false,
    isLoading: false,
    isError: false,
    invalidLogin: "",
  });
});
it("should reset the user", () => {
  expect(
    reducer(
      {
        userObj: {
          type: "User",
          username: "testUser",
          password: "testpassword",
        },
        isSuccess: true,
        isLoading: false,
        invalidLogin: "",
      },
      clearLoginStatus()
    )
  ).toEqual({
    userObj: {},
    isSuccess: false,
    isLoading: false,
    invalidLogin: "",
  });
});
