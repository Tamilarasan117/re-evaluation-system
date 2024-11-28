// import required packages
import dotenv from 'dotenv'
import { MailtrapTransport } from 'mailtrap';
import Nodemailer from 'nodemailer'

// Load .env file variables into process.env
dotenv.config()

const TOKEN = process.env.MAILTRAP_TOKEN

// create a transport object
export const mailtrapClient = Nodemailer.createTransport(
  MailtrapTransport({ token: TOKEN })
)

// send email function
export const sender = {
  address: "mailtrap@demomailtrap.com",
  name: "Re-Evaluation Department",
}
