// First, create a utility to convert your SVG to base64
import fs from "fs";
import path from "path";

// Function to convert SVG to base64 (run this once to get your base64 string)

export const convertSvgToBase64 = () => {
  try {
    const svgPath = path.join(process.cwd(), "/LOGO-1.svg"); // Adjust path as needed
    const svgContent = fs.readFileSync(svgPath, "utf8");
    const base64 = Buffer.from(svgContent).toString("base64");
    // console.log("Your SVG Base64:", `data:image/svg+xml;base64,${base64}`);
    return `data:image/svg+xml;base64,${base64}`;
  } catch (error) {
    console.error("Error converting SVG:", error);
    return null;
  }
};

// Replace this with your actual base64 string after running convertSvgToBase64()
const LOGO_BASE64 = `data:image/svg+xml;base64,${convertSvgToBase64()}`;

const clientUrl = "http://localhost:5173/";

// Enhanced email styles for consistency
const emailStyles = {
  container:
    "max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.1); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;",
  header:
    "background: linear-gradient(135deg, #047857 0%, #064e3b 100%); padding: 40px 30px; text-align: center; position: relative;",
  headerOverlay:
    'position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>\') repeat;',
  logo: "max-width: 320px; height: 80px; margin: 0 auto 20px; display: block; object-fit: contain;",
  title:
    "color: #ffffff; font-size: 28px; font-weight: 700; margin: 0; text-shadow: 0 2px 4px rgba(0,0,0,0.1);",
  subtitle:
    "color: rgba(255,255,255,0.9); font-size: 16px; margin: 8px 0 0; font-weight: 400;",
  content: "padding: 40px 30px;",
  button:
    "display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;",
  footer:
    "background: #f8fafc; text-align: center; padding: 30px; border-top: 1px solid #e2e8f0;",
  divider:
    "margin: 30px 0; height: 1px; background: linear-gradient(to right, transparent, #e2e8f0, transparent);",
};

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Psyche Pulse</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { margin: 0 !important; border-radius: 0 !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); min-height: 100vh;">
  <div class="container" style="${emailStyles.container}">
    <!-- Header with Logo -->
    <div class="header" style="${emailStyles.header}">
      <div style="${emailStyles.headerOverlay}"></div>
      <div style="position: relative; z-index: 1;">
        <img src="LOGO_BASE64" alt="Psyche Pulse Logo" style="${emailStyles.logo}" />
        <h1 style="${emailStyles.title}">Welcome to Psyche Pulse</h1>
        <p style="${emailStyles.subtitle}">Your AI-Powered Mental Wellness Partner</p>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="content" style="${emailStyles.content}">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 10px; font-weight: 600;">Hi {username}! 👋</h2>
        <p style="color: #6b7280; font-size: 16px; margin: 0;">We're thrilled to have you join our community</p>
      </div>
      
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 30px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #10b981;">
        <h3 style="color: #059669; margin: 0 0 15px; font-size: 18px; font-weight: 600;">🌟 What's Next?</h3>
        <ul style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.7;">
          <li><strong>Track your mood</strong> with our intelligent insights</li>
          <li><strong>Get 24/7 AI support</strong> whenever you need it</li>
          <li><strong>Access personalized recommendations</strong> for your wellness journey</li>
          <li><strong>Connect with mental health professionals</strong> when needed</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="{dashboardURL}" style="${emailStyles.button}">
          🚀 Start Your Journey
        </a>
      </div>
      
      <div style="${emailStyles.divider}"></div>
      
      <div style="text-align: center;">
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
          Ready to transform your mental wellness journey? <br/>
          <strong style="color: #059669;">Let's begin together.</strong>
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="${emailStyles.footer}">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
        <strong>Psyche Pulse Team</strong><br/>
        Empowering minds, one pulse at a time
      </p>
      <p style="color: #d1d5db; font-size: 12px; margin: 0;">
        This is an automated message. Please do not reply.
      </p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_REQUEST_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password - Psyche Pulse</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { margin: 0 !important; border-radius: 0 !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #fef3c7 0%, #fef7cd 100%); min-height: 100vh;">
  <div class="container" style="${emailStyles.container}">
    <!-- Header -->
    <div class="header" style="${emailStyles.header}">
      <div style="${emailStyles.headerOverlay}"></div>
      <div style="position: relative; z-index: 1;">
        <img src="LOGO_BASE64" alt="Psyche Pulse Logo" style="${emailStyles.logo}" />
        <h1 style="${emailStyles.title}">Password Reset</h1>
        <p style="${emailStyles.subtitle}">Secure Account Recovery</p>
      </div>
    </div>
    
    <!-- Content -->
    <div class="content" style="${emailStyles.content}">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 36px;">🔐</span>
        </div>
        <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 10px; font-weight: 600;">Hello {username}</h2>
      </div>
      
      <div style="background: #fffbeb; padding: 25px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 30px 0;">
        <p style="color: #92400e; margin: 0; font-size: 16px; line-height: 1.6;">
          <strong>⚠️ Security Notice:</strong> We received a request to reset your Psyche Pulse account password.
        </p>
      </div>
      
      <p style="color: #374151; font-size: 16px; line-height: 1.7; text-align: center;">
        If this was you, click the button below to create a new password:
      </p>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="{resetURL}" style="${emailStyles.button}">
          🔑 Reset Password
        </a>
      </div>
      
      <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 30px 0;">
        <p style="color: #6b7280; font-size: 14px; margin: 0; text-align: center;">
          <strong>⏰ This link expires in 1 hour</strong><br/>
          If you didn't request this reset, you can safely ignore this email.
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="${emailStyles.footer}">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
        <strong>Psyche Pulse Security Team</strong>
      </p>
      <p style="color: #d1d5db; font-size: 12px; margin: 0;">
        This is an automated security message. Please do not reply.
      </p>
    </div>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Password Reset Successful - Psyche Pulse</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { margin: 0 !important; border-radius: 0 !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%); min-height: 100vh;">
  <div class="container" style="${emailStyles.container}">
    <!-- Header -->
    <div class="header" style="${emailStyles.header}">
      <div style="${emailStyles.headerOverlay}"></div>
      <div style="position: relative; z-index: 1;">
        <img src="LOGO_BASE64" alt="Psyche Pulse Logo" style="${emailStyles.logo}" />
        <h1 style="${emailStyles.title}">Password Updated</h1>
        <p style="${emailStyles.subtitle}">Your account is secure</p>
      </div>
    </div>
    
    <!-- Content -->
    <div class="content" style="${emailStyles.content}">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 36px;">✅</span>
        </div>
        <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 10px; font-weight: 600;">Success, {username}!</h2>
      </div>
      
      <div style="background: #f0fdf4; padding: 25px; border-radius: 12px; border-left: 4px solid #22c55e; margin: 30px 0;">
        <p style="color: #166534; margin: 0 0 15px; font-size: 16px; font-weight: 600;">
          🎉 Your password has been successfully updated!
        </p>
        <p style="color: #166534; margin: 0; font-size: 14px;">
          You can now log in with your new password and continue your wellness journey.
        </p>
      </div>
      
      <div style="background: #fffbeb; padding: 25px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 30px 0;">
        <h3 style="color: #92400e; margin: 0 0 15px; font-size: 16px; font-weight: 600;">🔒 Security Tips:</h3>
        <ul style="color: #92400e; margin: 0; padding-left: 20px; font-size: 14px; line-height: 1.6;">
          <li>Use strong, unique passwords for all accounts</li>
          <li>Enable two-factor authentication when available</li>
          <li>Never share your password with anyone</li>
          <li>Regularly update your passwords</li>
        </ul>
      </div>
      
      <p style="color: #ef4444; background: #fef2f2; padding: 20px; border-radius: 8px; margin: 30px 0; font-size: 14px; text-align: center; border-left: 4px solid #ef4444;">
        <strong>⚠️ Didn't make this change?</strong><br/>
        If this wasn't you, please contact our support team immediately.
      </p>
    </div>
    
    <!-- Footer -->
    <div style="${emailStyles.footer}">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
        <strong>Psyche Pulse Security Team</strong>
      </p>
      <p style="color: #d1d5db; font-size: 12px; margin: 0;">
        This is an automated security notification.
      </p>
    </div>
  </div>
</body>
</html>
`;

export const VERIFICATION_SUCCESS_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verified - Welcome to Psyche Pulse!</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { margin: 0 !important; border-radius: 0 !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #ddd6fe 0%, #e4d4fd 100%); min-height: 100vh;">
  <div class="container" style="${emailStyles.container}">
    <!-- Header -->
    <div class="header" style="${emailStyles.header}">
      <div style="${emailStyles.headerOverlay}"></div>
      <div style="position: relative; z-index: 1;">
        <img src="LOGO_BASE64" alt="Psyche Pulse Logo" style="${emailStyles.logo}" />
        <h1 style="${emailStyles.title}">Email Verified!</h1>
        <p style="${emailStyles.subtitle}">Welcome to the community</p>
      </div>
    </div>
    
    <!-- Content -->
    <div class="content" style="${emailStyles.content}">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 48px;">🎉</span>
        </div>
        <h2 style="color: #1f2937; font-size: 28px; margin: 0 0 10px; font-weight: 700;">Congratulations {username}!</h2>
        <p style="color: #6b7280; font-size: 18px; margin: 0;">Your email has been successfully verified</p>
      </div>
      
      <div style="background: linear-gradient(135deg, #f3e8ff 0%, #ede9fe 100%); padding: 30px; border-radius: 16px; margin: 30px 0; text-align: center;">
        <h3 style="color: #7c3aed; margin: 0 0 20px; font-size: 20px; font-weight: 600;">🚀 You're All Set!</h3>
        <p style="color: #5b21b6; margin: 0 0 20px; font-size: 16px; line-height: 1.6;">
          You now have full access to all Psyche Pulse features and can begin your personalized mental wellness journey.
        </p>
        
        <div style="background: white; padding: 20px; border-radius: 12px; margin-top: 20px;">
          <h4 style="color: #374151; margin: 0 0 15px; font-size: 16px; font-weight: 600;">✨ What's Available:</h4>
          <div style="display: grid; gap: 10px; text-align: left;">
            <div style="color: #6b7280; font-size: 14px;">🧠 AI-powered mood tracking</div>
            <div style="color: #6b7280; font-size: 14px;">💬 24/7 intelligent support</div>
            <div style="color: #6b7280; font-size: 14px;">📊 Personalized insights & analytics</div>
            <div style="color: #6b7280; font-size: 14px;">🏥 Professional mental health resources</div>
          </div>
        </div>
      </div>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${clientUrl}login" style="${emailStyles.button}">
          🌟 Access Your Dashboard
        </a>
      </div>
      
      <div style="${emailStyles.divider}"></div>
      
      <div style="text-align: center;">
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
          Ready to start your wellness transformation?<br/>
          <strong style="color: #7c3aed;">Your journey begins now! 💜</strong>
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="${emailStyles.footer}">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
        <strong>Welcome to Psyche Pulse! 🎊</strong>
      </p>
      <p style="color: #d1d5db; font-size: 12px; margin: 0;">
        This is an automated welcome message.
      </p>
    </div>
  </div>
</body>
</html>
`;

export const ACCOUNT_DELETION_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Account Removal Notice - Psyche Pulse</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { margin: 0 !important; border-radius: 0 !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 30px 20px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%); min-height: 100vh;">
  <div class="container" style="${emailStyles.container}">
    <!-- Header -->
    <div class="header" style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 40px 30px; text-align: center; position: relative;">
      <div style="${emailStyles.headerOverlay}"></div>
      <div style="position: relative; z-index: 1;">
        <img src="LOGO_BASE64" alt="Psyche Pulse Logo" style="${emailStyles.logo}" />
        <h1 style="${emailStyles.title}">Account Removal Notice</h1>
        <p style="${emailStyles.subtitle}">Verification Time Expired</p>
      </div>
    </div>
    
    <!-- Content -->
    <div class="content" style="${emailStyles.content}">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 36px;">⏰</span>
        </div>
        <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 10px; font-weight: 600;">Hello {username}</h2>
      </div>
      
      <div style="background: #fef2f2; padding: 25px; border-radius: 12px; border-left: 4px solid #ef4444; margin: 30px 0;">
        <p style="color: #991b1b; margin: 0 0 15px; font-size: 16px; font-weight: 600;">
          📧 Email Verification Required
        </p>
        <p style="color: #991b1b; margin: 0; font-size: 14px; line-height: 1.6;">
          We noticed that your email address was not verified within the required timeframe. For security and compliance reasons, your Psyche Pulse account has been automatically removed from our system.
        </p>
      </div>
      
      <div style="background: #fffbeb; padding: 25px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 30px 0;">
        <h3 style="color: #92400e; margin: 0 0 15px; font-size: 16px; font-weight: 600;">🔄 Was This a Mistake?</h3>
        <p style="color: #92400e; margin: 0; font-size: 14px; line-height: 1.6;">
          No worries! You can always create a new account and start fresh. We'd love to have you back in our mental wellness community.
        </p>
      </div>
      
      <div style="text-align: center; margin: 40px 0;">
        <a href="${clientUrl}signup" style="display: inline-block; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
          🌟 Create New Account
        </a>
      </div>
      
      <div style="${emailStyles.divider}"></div>
      
      <div style="text-align: center;">
        <p style="color: #6b7280; font-size: 16px; line-height: 1.6; margin: 0;">
          Thank you for your interest in Psyche Pulse.<br/>
          <strong style="color: #059669;">We're here when you're ready! 💚</strong>
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="${emailStyles.footer}">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
        <strong>The Psyche Pulse Team</strong><br/>
        Always here to support your wellness journey
      </p>
      <p style="color: #d1d5db; font-size: 12px; margin: 0;">
        This is an automated system message.
      </p>
    </div>
  </div>
</body>
</html>
`;
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification - Psyche Pulse</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { margin: 0 !important; border-radius: 0 !important; }
      .content { padding: 30px 20px !important; }
      .header { padding: 30px 20px !important; }
      .code { font-size: 28px !important; letter-spacing: 4px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 20px; background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); min-height: 100vh;">
  <div class="container" style="${emailStyles.container}">
    <!-- Header with Logo -->
    <div class="header" style="${emailStyles.header}">
      <div style="${emailStyles.headerOverlay}"></div>
      <div style="position: relative; z-index: 1;">
        <img src="LOGO_BASE64" alt="Psyche Pulse Logo" style="${emailStyles.logo}" />
        <h1 style="${emailStyles.title}">Email Verification</h1>
        <p style="${emailStyles.subtitle}">Secure Your Account Access</p>
      </div>
    </div>
    
    <!-- Main Content -->
    <div class="content" style="${emailStyles.content}">
      <div style="text-align: center; margin-bottom: 30px;">
        <h2 style="color: #1f2937; font-size: 24px; margin: 0 0 10px; font-weight: 600;">Hi {name}! 🔐</h2>
        <p style="color: #6b7280; font-size: 16px; margin: 0;">We need to verify your email address to secure your account</p>
      </div>
      
      <!-- Verification Code Box -->
      <div style="${emailStyles.codeBox}">
        <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #10b981; color: white; padding: 5px 15px; border-radius: 20px; font-size: 12px; font-weight: 600;">
          VERIFICATION CODE
        </div>
        <div class="code" style="${emailStyles.code}">{verificationCode}</div>
        <p style="color: #059669; font-size: 14px; margin: 15px 0 0; font-weight: 500;">
          Copy this code and paste it in the verification form
        </p>
      </div>
      
      <!-- Instructions -->
      <div style="background: linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%); padding: 25px; border-radius: 12px; margin: 30px 0; border-left: 4px solid #10b981;">
        <h3 style="color: #059669; margin: 0 0 15px; font-size: 18px; font-weight: 600;">📋 How to Verify</h3>
        <ol style="color: #374151; margin: 0; padding-left: 20px; line-height: 1.7;">
          <li>Go back to the verification page in your browser</li>
          <li>Enter the 6-digit code shown above</li>
          <li>Click "Verify Email" to complete the process</li>
        </ol>
      </div>
      
      <!-- Alternative Link Button -->
      <div style="text-align: center; margin: 35px 0;">
        <p style="color: #6b7280; font-size: 14px; margin: 0 0 15px;">Or click the button below to verify directly:</p>
        <a href="{verificationLink}" style="${emailStyles.button}">
          ✅ Verify My Email
        </a>
      </div>
      
      <!-- Warning Box -->
      <div style="${emailStyles.warningBox}">
        <div style="display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 20px; margin-right: 10px;">⏰</span>
          <div>
            <p style="color: #92400e; font-weight: 600; margin: 0 0 5px; font-size: 14px;">Time Sensitive</p>
            <p style="color: #b45309; margin: 0; font-size: 13px;">
              This code expires at <strong>{expiresAt}</strong>
            </p>
          </div>
        </div>
      </div>
      
      <div style="${emailStyles.divider}"></div>
      
      <!-- Security Note -->
      <div style="text-align: center; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0;">
        <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
          🛡️ <strong>Security Note:</strong> If you didn't create an account with Psyche Pulse, 
          please ignore this email. Your email address will not be used without verification.
        </p>
      </div>
    </div>
    
    <!-- Footer -->
    <div style="${emailStyles.footer}">
      <p style="color: #9ca3af; font-size: 14px; margin: 0 0 10px;">
        <strong>Psyche Pulse Security Team</strong><br/>
        Protecting your mental wellness journey
      </p>
      <p style="color: #d1d5db; font-size: 12px; margin: 0;">
        This is an automated security message. Please do not reply.
      </p>
    </div>
  </div>
</body>
</html>
`;
