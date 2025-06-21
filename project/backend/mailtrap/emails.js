// { import { mailtrapClient, sender } from "./mailtrap.config.js";

// export const sendEmail = async (email, data) => {
//   const recipient = [{ email }];
//   try {
//     await mailtrapClient.send({
//       from: sender,
//       to: recipient,
//       subject: data.subject,
//       text: data.text,
//       category: data.category || "general",
//     });
//   } catch (err) {
//     console.log(`Error sending email! : ${err.message}`);
//     console.log(`Error sending email! : ${err.stack}`);
//     console.log(`Error sending email! : ${err}`);
//     throw err;
//   }
// };
// }
import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  WELCOME_EMAIL_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_SUCCESS_TEMPLATE,
  ACCOUNT_DELETION_TEMPLATE,
} from "./emailTemplates.js";

/**
 * Sends a transactional email via Mailtrap
 * @param {string} email - Recipient's email address
 * @param {object} data - Email content (subject, text, html, category)
 */
export const sendEmail = async (email, data) => {
  const recipient = [{ email }];

  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: data.subject,
      text: data.text || "", // fallback plain text
      html: data.html, // professional HTML content
      category: data.category || "general",
    });
    console.log(`Email sent to ${email} [${data.subject}]`);
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};

// 1. Send Welcome Email
export const sendWelcomeEmail = (email, username) => {
  return sendEmail(email, {
    subject: "🎉 Welcome to Psyche Pulse!",
    html: WELCOME_EMAIL_TEMPLATE.replace("{username}", username).replace(
      "{dashboardURL}",
      "https://psychepulse.site/dashboard"
    ),
    text: `Hi ${username}, welcome to Psyche Pulse!`,
    category: "welcome",
  });
};

// 2. Send Verification Email
export const sendVerificationEmail = (email, username, code) => {
  return sendEmail(email, {
    subject: "🔐 Verify Your Email – Psyche Pulse",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{username}", username).replace(
      "{verificationCode}",
      code
    ),
    text: `Hi ${username}, your verification code is ${code}`,
    category: "verify",
  });
};

// 3. Send Forgot Password Email
export const sendPasswordResetEmail = (email, username, resetURL) => {
  return sendEmail(email, {
    subject: "🔑 Reset Your Psyche Pulse Password",
    html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
      "{username}",
      username
    ).replace("{resetURL}", resetURL),
    text: `Hi ${username}, click to reset your password: ${resetURL}`,
    category: "password-reset",
  });
};

// 4. Send Reset Password Confirmation Email
export const sendPasswordResetSuccessEmail = (email, username) => {
  return sendEmail(email, {
    subject: "✅ Your Psyche Pulse Password Was Reset",
    html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{username}", username),
    text: `Hi ${username}, your password was successfully reset.`,
    category: "password-reset-success",
  });
};

// 5. Send Email Verified Success Email
export const sendVerificationSuccessEmail = (email, username) => {
  return sendEmail(email, {
    subject: "✅ Your Email is Verified – Psyche Pulse",
    html: VERIFICATION_SUCCESS_TEMPLATE.replace("{username}", username).replace(
      "{dashboardURL}",
      "https://psychepulse.site/dashboard"
    ),
    text: `Hi ${username}, your email is now verified.`,
    category: "verified",
  });
};

export const sendAccountDeletionEmail = (email, username) => {
  return sendEmail(email, {
    subject: "Account Deleted – Psyche Pulse",
    html: ACCOUNT_DELETION_TEMPLATE.replace("{username}", username),
    text: `Hi ${username}, your account was deleted due to unverified email.`,
    category: "account-deletion",
  });
};
