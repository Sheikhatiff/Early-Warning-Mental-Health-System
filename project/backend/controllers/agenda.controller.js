import { sendAccountDeletionEmail } from "../mailtrap/emails.js";
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
        await sendAccountDeletionEmail(
          searchedUser.email,
          searchedUser.name,
          "http://localhost:5173/signup"
        );
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
