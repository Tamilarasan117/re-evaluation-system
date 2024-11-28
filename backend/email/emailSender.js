// import require modules
import { mailtrapClient, sender } from './../config/mailtrapConfig.js';
import { EMAIL_VERIFIED_SUCCESS_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from './emailTemplate.js';

// send verification email function
export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = email
  
  try {
    const response = await  mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: 'Verify your email',
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
      category: 'Email Verification',
    })
    console.log(`Email sent successfully: `, response)
  } catch (error) {
    console.error(`Error sending verification: ${error}`)
    throw new Error(`Error sending verification: ${error}`)
  }
}
// send welcome email functions
export const sendWelcomeEmail = async (email, username) => {
  const recipient = email
  
  try {
    const response = await mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: 'Email Verified Successfully',
      html: EMAIL_VERIFIED_SUCCESS_TEMPLATE,
      category: 'Email Verified',
    })
    console.log( `${username} your email verification done successfully`, response)
  } catch (error) {
    console.error(`Error sending welcome email: ${error}`)
    throw new Error(`Error sending welcome email: ${error}`)
  }
}
// send reset password email function
export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = email
  
  try {
    const response = await mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: 'Reset Your Password',
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: 'Password Reset',
    })
    console.log(`Password reset email sent successfully: `, response)
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`)
    throw new Error(`Error sending password reset email: ${error}`)
  }
}
// send reset success email
export const sendPasswordResetSuccessEmail = async (email) => {
  const recipient = email
  // exception handling
  try {
    const response = await mailtrapClient.sendMail({
      from: sender,
      to: recipient,
      subject: 'Password reset successful',
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: 'Password Reset',
    })
    console.log(`Password reset success email sent successfully: `, response)
  } catch (error) {
    console.error(`Error sending password reset success email: ${error}`)
    throw new Error(`Error sending password reset success email: ${error}`)
  }
}
