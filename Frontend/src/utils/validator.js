import { isValidEmail, isValidUsername } from "6pp";

export const usernameValidator = (username) => {
  if (!isValidUsername(username))
    return { isValid: false, errorMessage: "Username is Invalid" };
};

export const emailValidator = (username) => {
  if (!isValidEmail(username))
    return { isValid: false, errorMessage: "email is Invalid" };
};