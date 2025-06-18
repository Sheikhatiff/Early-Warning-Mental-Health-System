import agenda from "agenda";
import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

const Agenda = new agenda({
  db: {
    address: process.env.DB_URI.replace(
      "<username>",
      process.env.DB_USER
    ).replace("<password>", process.env.DB_PASS),

    collection: "jobs",
  },
});

export default Agenda;
