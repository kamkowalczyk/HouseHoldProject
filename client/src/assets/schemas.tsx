import * as Yup from "yup";

const passwordLoginRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
export const RegisterSchema = Yup.object().shape({
  login: Yup.string()
    .min(5, "Too Short!")
    .max(25, "Too Long!")
    .required("Login is required."),
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Password is too short - min 8 characters.")
    .matches(
      passwordLoginRegex,
      "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special character."
    ),
  passwordConfirmation: Yup.string().required("Please enter your password again.").oneOf(
    [Yup.ref("password")],
    "Passwords must match"
  ),
});

export const LoginSchema = Yup.object().shape({
  login: Yup.string()
    .min(5, "Too Short!")
    .max(25, "Too Long!")
    .required("Login is required."),
  password: Yup.string()
    .required("Please enter your password.")
    .min(8, "Password is too short - min 8 characters.")
    .matches(
      passwordLoginRegex,
      "Password must have 1 uppercase, 1 lowercase, 1 number, 1 special character."
    ),
});
