import { sendEmail } from "../mailtrap/emails.js";
import User from "../models/user.model.js";
import Agenda from "../utils/agenda.js";

const checkVerificationAgenda = () => {
  Agenda.define("checkVerification", async (job) => {
    try {
      const { userId } = job.attrs.data;
      const searchedUser = await User.findById(userId);
      if (!searchedUser) return;
      if (searchedUser.isVerified) {
        console.log(`User ${searchedUser.name} is verified.`);
      } else {
        await User.findByIdAndDelete(userId);
        // TODO: send email to user about deletion
        await sendEmail(searchedUser.email, {
          subject: "Account Deletion Notice",
          text: `Dear ${searchedUser.name}, your account has been deleted due to not to verify account in a given time. Please register again if you wish to use our services.`,
          category: "account-deletion",
        });
        console.log(
          "Deleted user ",
          searchedUser.name,
          "! due to not to verify account in a given time!"
        );
      }
      await job.remove();
      console.log("Job completed and removed for user:", searchedUser.name);
    } catch (error) {
      console.error("Error in checkVerification job:", error);
    }
  });
};

export const startAgenda = async () => {
  checkVerificationAgenda();
  await Agenda.start();
  console.log("Agenda started");
};
