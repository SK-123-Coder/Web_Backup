// Popup data or message for login page

const loginPopup = [
  {
    id: 1,
    title: "Login Successful",
    message: "Welcome back to CraftDex. You’re all set to continue.",
    btn: "OK",
    state: "/",
  },
  {
    id: 2,
    title: "Account Not Found",
    message: "We couldn’t find an account with this email. You can try again or create a new account.",
    btn: "Create Account",
    state: "/signup",
  },
  {
    id: 3,
    title: "Missing Required Information",
    message: "Please enter both your email and password to continue.",
    btn: "Try Again",
    state: "/login",
  },
  {
    id: 4,
    title: "Invalid Credentials",
    message: "The email or password you entered is incorrect. Please try again.",
    btn: "Retry Login",
    state: "/login",
  },
];

export default loginPopup;