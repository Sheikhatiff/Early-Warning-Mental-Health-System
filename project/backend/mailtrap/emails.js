import { mailtrapClient, sender } from "./mailtrap.config.js";

export const sendEmail = async (email, data) => {
  const recipient = [{ email }];
  try {
    await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: data.subject,
      text: data.text,
      category: data.category || "general",
    });
  } catch (err) {
    console.log(`Error sending email! : ${err.message}`);
    console.log(`Error sending email! : ${err.stack}`);
    console.log(`Error sending email! : ${err}`);
    throw err;
  }
};
