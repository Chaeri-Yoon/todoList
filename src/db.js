import mongoose from "mongoose";
// In theory, this can be moved as we load dotenv in the entry file, 'init.js'
// However, the problem in loading env file keeps occuring for some reason and will be dealt with soon.
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGOATLAS_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false
    }
);

const db = mongoose.connection;
const handleOpen = () => console.log("✔ Connected to DB");
const handleError = () => console.log("❌ Error on DB Connection");

db.once("open", handleOpen);
db.on("error", handleError);