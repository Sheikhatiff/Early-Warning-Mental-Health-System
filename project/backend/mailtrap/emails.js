import { mailtrapClient, sender } from "./mailtrap.config.js";
import {
  WELCOME_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_SUCCESS_TEMPLATE,
  ACCOUNT_DELETION_TEMPLATE,
  convertSvgToBase64,
  VERIFICATION_EMAIL_TEMPLATE,
} from "./emailTemplates.js";

// const base64 =
const LOGO_BASE64 = convertSvgToBase64();
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
    console.log(`✅ Email sent successfully to ${email} [${data.subject}]`);
    return { success: true, message: "Email sent successfully" };
  } catch (err) {
    console.error("❌ Error sending email:", err);
    throw new Error(`Failed to send email: ${err.message}`);
  }
};

/**
 * 1. Send Welcome Email - Enhanced with modern design
 * @param {string} email - User's email address
 * @param {string} username - User's display name
 * @param {string} dashboardURL - Custom dashboard URL (optional)
 */
export const sendWelcomeEmail = async (
  email,
  username,
  dashboardURL = "http://localhost:5173/dashboard"
) => {
  try {
    const emailData = {
      subject:
        "🎉 Welcome to Psyche Pulse - Your Mental Wellness Journey Begins!",
      html: WELCOME_EMAIL_TEMPLATE.replace(/{username}/g, username)
        .replace(/{dashboardURL}/g, dashboardURL)
        .replace("LOGO_BASE64", LOGO_BASE64),
      text: `Hi ${username}! 👋

Welcome to Psyche Pulse - Your AI-powered mental wellness partner!

We're thrilled to have you join our community of people committed to better mental health.

🌟 What's Next?
- Track your mood with intelligent insights
- Get 24/7 AI support whenever you need it
- Access personalized recommendations
- Connect with mental health professionals

Ready to start your journey? Visit: ${dashboardURL}

Best regards,
The Psyche Pulse Team`,
      category: "welcome",
    };

    return await sendEmail(email, emailData);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    throw error;
  }
};

/**
 * 2. Send Password Reset Request Email - Enhanced security design
 * @param {string} email - User's email address
 * @param {string} username - User's display name
 * @param {string} resetURL - Password reset link
 */
export const sendPasswordResetEmail = async (email, username, resetURL) => {
  try {
    const emailData = {
      subject: "🔑 Reset Your Psyche Pulse Password - Secure Access Request",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(/{username}/g, username)
        .replace(/{resetURL}/g, resetURL)
        .replace("LOGO_BASE64", LOGO_BASE64),
      text: `Hi ${username},

We received a request to reset your Psyche Pulse account password.

🔐 Security Notice: If this was you, click the link below to create a new password:
${resetURL}

⏰ This link expires in 1 hour for your security.

If you didn't request this reset, you can safely ignore this email.

Stay secure,
Psyche Pulse Security Team`,
      category: "password-reset",
    };

    return await sendEmail(email, emailData);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    throw error;
  }
};

/**
 * 3. Send Password Reset Success Email - Enhanced confirmation design
 * @param {string} email - User's email address
 * @param {string} username - User's display name
 */
export const sendPasswordResetSuccessEmail = async (email, username) => {
  try {
    const emailData = {
      subject:
        "✅ Password Successfully Updated - Psyche Pulse Account Secured",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace(
        /{username}/g,
        username
      ).replace("LOGO_BASE64", LOGO_BASE64),
      text: `Hi ${username},

✅ Success! Your password has been successfully updated!

🔒 Security Tips:
- Use strong, unique passwords for all accounts
- Enable two-factor authentication when available
- Never share your password with anyone
- Regularly update your passwords

⚠️ Didn't make this change?
If this wasn't you, please contact our support team immediately.

Stay secure,
Psyche Pulse Security Team`,
      category: "password-reset-success",
    };

    return await sendEmail(email, emailData);
  } catch (error) {
    console.error("Failed to send password reset success email:", error);
    throw error;
  }
};

/**
 * 4. Send Email Verification Success Email - Enhanced welcome design
 * @param {string} email - User's email address
 * @param {string} username - User's display name
 * @param {string} dashboardURL - Custom dashboard URL (optional)
 */
export const sendVerificationSuccessEmail = async (
  email,
  username,
  dashboardURL = "http://localhost:5173/dashboard"
) => {
  try {
    const emailData = {
      subject: "🎊 Email Verified! Welcome to Psyche Pulse Community",
      html: VERIFICATION_SUCCESS_TEMPLATE.replace(/{username}/g, username)
        .replace(/{dashboardURL}/g, dashboardURL)
        .replace("LOGO_BASE64", LOGO_BASE64),
      text: `Congratulations ${username}! 🎉

Your email has been successfully verified!

✨ You're All Set!
You now have full access to all Psyche Pulse features:

🧠 AI-powered mood tracking
💬 24/7 intelligent support  
📊 Personalized insights & analytics
🏥 Professional mental health resources

Ready to start your wellness transformation?
Access your dashboard: ${dashboardURL}

Your journey begins now! 💜

Welcome to Psyche Pulse!`,
      category: "email-verified",
    };

    return await sendEmail(email, emailData);
  } catch (error) {
    console.error("Failed to send verification success email:", error);
    throw error;
  }
};

/**
 * 5. Send Account Deletion Email - Enhanced notice design
 * @param {string} email - User's email address
 * @param {string} username - User's display name
 * @param {string} signupURL - Custom signup URL (optional)
 */
export const sendAccountDeletionEmail = async (
  email,
  username,
  signupURL = "http://localhost:5173/signup"
) => {
  try {
    const emailData = {
      subject: "⏰ Account Removal Notice - Psyche Pulse Verification Expired",
      html: ACCOUNT_DELETION_TEMPLATE.replace(/{username}/g, username)
        .replace(/{signupURL}/g, signupURL)
        .replace("LOGO_BASE64", LOGO_BASE64),
      text: `Hello ${username},

📧 Email Verification Required

We noticed that your email address was not verified within the required timeframe. For security and compliance reasons, your Psyche Pulse account has been automatically removed from our system.

🔄 Was This a Mistake?
No worries! You can always create a new account and start fresh. We'd love to have you back in our mental wellness community.

Create a new account: ${signupURL}

Thank you for your interest in Psyche Pulse.
We're here when you're ready! 💚

The Psyche Pulse Team`,
      category: "account-deletion",
    };

    return await sendEmail(email, emailData);
  } catch (error) {
    console.error("Failed to send account deletion email:", error);
    throw error;
  }
};

/**
 * 6. Utility function to send custom emails with template validation
 * @param {string} email - Recipient's email
 * @param {string} template - Template name
 * @param {object} replacements - Key-value pairs for template replacement
 * @param {object} options - Additional email options
 */
export const sendCustomEmail = async (
  email,
  template,
  replacements = {},
  options = {}
) => {
  const templates = {
    welcome: WELCOME_EMAIL_TEMPLATE,
    "password-reset": PASSWORD_RESET_REQUEST_TEMPLATE,
    "password-success": PASSWORD_RESET_SUCCESS_TEMPLATE,
    "email-verified": VERIFICATION_SUCCESS_TEMPLATE,
    "account-deleted": ACCOUNT_DELETION_TEMPLATE,
  };

  if (!templates[template]) {
    throw new Error(`Template '${template}' not found`);
  }

  let htmlContent = templates[template];

  // Replace all placeholders
  Object.keys(replacements).forEach((key) => {
    const regex = new RegExp(`{${key}}`, "g");
    htmlContent = htmlContent.replace(regex, replacements[key]);
  });

  const emailData = {
    subject: options.subject || "Psyche Pulse Notification",
    html: htmlContent,
    text: options.text || "Please view this email in HTML format.",
    category: options.category || "custom",
  };

  return await sendEmail(email, emailData);
};
/**
 * Sends a verification email to the user
 * @param {string} email - Recipient's email address
 * @param {string} name - User's name
 * @param {string} verificationCode - 6-digit verification code
 * @param {string} verificationLink - Direct verification link
 * @param {string} expiresAt - When the code expires (formatted datetime)
 */
export const sendVerificationEmail = async (
  email,
  name,
  verificationCode,
  verificationLink,
  expiresAt
) => {
  const htmlContent = VERIFICATION_EMAIL_TEMPLATE.replace(/{name}/g, name)
    .replace(/{verificationCode}/g, verificationCode)
    .replace(/{verificationLink}/g, verificationLink)
    .replace(/{expiresAt}/g, expiresAt)
    .replace("LOGO_BASE64", LOGO_BASE64);

  const emailData = {
    subject: "🔐 Verify Your Psyche Pulse Account",
    text: `Hi ${name}, Please verify your email address using this code: ${verificationCode}. The code expires at ${expiresAt}. You can also verify directly at: ${verificationLink}`,
    html: htmlContent,
    category: "verification",
  };

  try {
    const result = await sendEmail(email, emailData);
    console.log(`🔐 Verification email sent to ${email} for ${name}`);
    return result;
  } catch (error) {
    console.error("❌ Failed to send verification email:", error);
    throw new Error(`Verification email failed: ${error.message}`);
  }
};

// Export a utility object for easy access to all email functions
export const EmailService = {
  sendWelcome: sendWelcomeEmail,
  sendPasswordReset: sendPasswordResetEmail,
  sendPasswordResetSuccess: sendPasswordResetSuccessEmail,
  sendVerificationSuccess: sendVerificationSuccessEmail,
  sendAccountDeletion: sendAccountDeletionEmail,
  sendCustom: sendCustomEmail,
  send: sendEmail,
};
