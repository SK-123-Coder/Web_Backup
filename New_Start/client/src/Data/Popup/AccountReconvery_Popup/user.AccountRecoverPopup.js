// Popup data or message for account recovery page

const AccountRecoverPopup = [
  {
    id: 1,
    title: "Account Recovered Successfully",
    message: "Your account has been restored. You can now proceed to create your account.",
    btn: "Go to Sign Up",
    state: "/signup",
  },
  {
    id: 2,
    title: "Missing Required Information",
    message: "Please fill in all the required fields to continue.",
    btn: "Try Again",
    state: "/accountRecover",
  },
  {
    id: 3,
    title: "Email Not Found",
    message: "We couldn’t find an account with this email. You can try again or create a new account.",
    btn: "Create Account",
    state: "/signup",
  },
];

export default AccountRecoverPopup;