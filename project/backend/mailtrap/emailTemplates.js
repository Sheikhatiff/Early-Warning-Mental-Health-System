const clientUrl = "http://localhost:5173/";

export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Welcome to Psyche Pulse</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f4f4f4;">
  <div style="max-width: 600px; margin: 0 auto; background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
    <div style="text-align: center; padding: 20px; background: linear-gradient(to right, #10b981, #059669);">
      <h1 style="color: white; margin: 10px 0;">Welcome to Psyche Pulse</h1>
    </div>
    <div style="padding: 30px;">
      <p style="font-size: 16px;">Hi <strong>{username}</strong>,</p>
      <p>Thank you for joining <strong>Psyche Pulse</strong> — your AI-powered partner in mental wellness.</p>
      <p>We’re excited to help you track, manage, and improve your mental health journey with advanced insights and 24/7 support.</p>
      <p style="margin: 30px 0;">
        <a href="{dashboardURL}" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
      </p>
      <p>Let’s begin this transformative journey — together.</p>
      <p style="margin-top: 40px;">Warm regards,<br/>Team Psyche Pulse</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #888; padding: 10px 20px;">
      <p>This is an automated message. Please do not reply.</p>
    </div>
  </div>
</body>
</html>
`;
export const VERIFICATION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Email Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background: #f3f4f6;">
  <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.08); overflow: hidden;">
    <div style="background: linear-gradient(to right, #10b981, #059669); text-align: center; padding: 30px;">
      <h2 style="color: white; margin: 15px 0 0;">Verify Your Email</h2>
    </div>
    <div style="padding: 30px; text-align: center;">
      <p style="font-size: 16px;">Hi <strong>{username}</strong>,</p>
      <p>Please use the following code to verify your email address:</p>
      <div style="font-size: 28px; font-weight: bold; letter-spacing: 8px; margin: 20px 0; color: #059669;">{verificationCode}</div>
      <p>The code expires in 15 minutes. Enter it on the verification screen to complete your sign-up.</p>
    </div>
    <div style="text-align: center; color: #888; font-size: 12px; padding: 15px;">
      <p>This is an automated message. Do not reply.</p>
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
  <title>Reset Your Password</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f3f4f6; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 5px 10px rgba(0,0,0,0.05);">
    <div style="background: linear-gradient(to right, #10b981, #059669); padding: 30px; text-align: center;">
      <h2 style="color: white; margin: 20px 0 0;">Password Reset Request</h2>
    </div>
    <div style="padding: 30px;">
      <p>Hello <strong>{username}</strong>,</p>
      <p>We received a request to reset your Psyche Pulse account password. Click the button below to proceed:</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="{resetURL}" style="background-color: #10b981; color: white; padding: 14px 30px; text-decoration: none; border-radius: 5px;">Reset Password</a>
      </div>
      <p>If you didn’t request this, you can safely ignore this email. The link will expire in 1 hour.</p>
    </div>
    <div style="text-align: center; font-size: 12px; color: #888; padding: 20px;">
      <p>This is an automated message. Please do not reply.</p>
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
  <title>Password Reset Success</title>
</head>
<body style="font-family: Arial, sans-serif; background: #f3f4f6; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <div style="background: linear-gradient(to right, #10b981, #059669); padding: 30px; text-align: center;">
      <h2 style="color: white;">Password Reset Successful</h2>
    </div>
    <div style="padding: 30px;">
      <p>Hello <strong>{username}</strong>,</p>
      <p>Your password has been successfully reset.</p>
      <p>If this wasn't you, please change your password immediately and contact support.</p>
      <ul style="padding-left: 20px;">
        <li>Use strong, unique passwords</li>
        <li>Enable two-factor authentication</li>
        <li>Never reuse old passwords</li>
      </ul>
    </div>
    <div style="text-align: center; font-size: 12px; color: #888; padding: 15px;">
      <p>This is an automated message. Please do not reply.</p>
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
  <title>Email Verified</title>
</head>
<body style="background: #f3f4f6; font-family: Arial, sans-serif; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.05); overflow: hidden;">
    <div style="text-align: center; background: linear-gradient(to right, #10b981, #059669); padding: 30px;">
      <h2 style="color: white;">Email Verified</h2>
    </div>
    <div style="padding: 30px; text-align: center;">
      <p>Congratulations <strong>{username}</strong>! 🎉</p>
      <p>Your email address has been successfully verified.</p>
      <p>You can now enjoy all features of Psyche Pulse with full access.</p>
      <div style="margin: 30px 0;">
        <a href="${clientUrl}login" style="background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
      </div>
    </div>
    <div style="text-align: center; font-size: 12px; color: #888; padding: 15px;">
      <p>This is an automated message. Please do not reply.</p>
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
  <title>Account Deleted</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 0;">
  <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0 3px 8px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 20px;">
   
      <h2 style="color: #10b981; margin-bottom: 10px;">Account Deletion Notice</h2>
    </div>
    <p style="color: #333;">Hello <strong>{username}</strong>,</p>
    <p style="color: #333;">We noticed that your email address was not verified within the required time window.</p>
    <p style="color: #333;">As a result, your Psyche Pulse account has been automatically deleted from our system to ensure security and data compliance.</p>
    <p style="color: #333;">If this was a mistake, you can always sign up again to enjoy personalized mental wellness services powered by AI and trusted professionals.</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="${clientUrl}signup" style="background-color: #10b981; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold;">Create New Account</a>
    </div>
    <p style="color: #555;">Thank you for your interest in Psyche Pulse.</p>
    <p style="color: #555;">– The Psyche Pulse Team</p>
    <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
    <p style="text-align: center; font-size: 12px; color: #888;">This is an automated email, please do not reply.</p>
  </div>
</body>
</html>
`;
