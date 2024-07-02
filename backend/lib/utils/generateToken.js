import jwt from "jsonwebtoken";

export const generateToenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // to prevent XSS( cross site scripting ) attacks.
    sameSite: "strict", // to prevent CSRF( cross site request forgery ) attacks.
    secure: process.env.Node_ENV !== "development",
  });
};
