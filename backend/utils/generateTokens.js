// import require packages
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

// Load .env file variables into process.env
dotenv.config()

// verification token
export const generateEmailVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
// token and set cookie
export const generateTokenAndSetCookie = (response, userId) => {
	const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" }
  )

	response.cookie("token", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000,
	});

	return token;
};