// Popup data or message for signup page

const signupPopup = [
  {
    id: 1,
    title: "Account Created Successfully",
    message: "Welcome to CraftDex! Your account has been created and you’re ready to get started.",
    btn: "OK",
    state: "/",
  },
  {
    id: 2,
    title: "Account Already Exists",
    message: "An account with this email already exists. Please log in to continue.",
    btn: "Go to Login",
    state: "/login",
  },
  {
    id: 3,
    title: "Missing Required Information",
    message: "Please complete all required fields to create your account.",
    btn: "Try Again",
    state: "/signup",
  },
];

export default signupPopup;