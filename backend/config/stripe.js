// importing packages
import Stripe from 'stripe'
import dotenv from 'dotenv'

// Load.env file variables into process.env
dotenv.config()

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)