import dotenv from "dotenv";
import { MailtrapClient } from "mailtrap";

dotenv.config({ path: "config.env" });

export const sender = {
  email: "Admin@psychepulse.site",
  name: "Psyche Pulse",
};

export const mailtrapClient = new MailtrapClient({
  token: process.env.MAILTRAP_API_TOKEN,
});
