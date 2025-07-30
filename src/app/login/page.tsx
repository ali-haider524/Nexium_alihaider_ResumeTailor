import { auth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

const actionCodeSettings = {
  url: "http://localhost:3000/auth/callback",
  handleCodeInApp: true
};

async function handleLogin(email: string) {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    window.localStorage.setItem("emailForSignIn", email);
    alert("Check your email for the login link.");
  } catch (err) {
    console.error(err);
  }
}
