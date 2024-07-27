const express = require("express");
const dbConnect = require("./config/dbConnect");
const dotenv = require("dotenv");
const UserRoute = require("./routes/UserRoute");
const CourseRouter = require("./routes/CourseRouter");
const PaymentRouter = require("./routes/PaymentRouter");
const ProfileRouter = require("./routes/ProfileRouter");
const ContactRouter = require("./routes/ContactRouter");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cloudinary = require("./config/cloudinary");
dotenv.config("./env");

const app = express();
app.use(express.json());
app.use(cookieParser());

let origin = "http://localhost:3000";
console.log("server env", process.env.NODE_ENV);
if (process.env.NODE_ENV === "production") {
  origin = process.env.CORS_URL;
} else if (process.env.NODE_ENV === "development") {
  origin = origin;
}
app.use(
  cors({
    credentials: true,
    origin,
    optionsSuccessStatus: 200,
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

cloudinary.cloudinaryConnect();

app.use("/api/v1/auth", UserRoute);
app.use("/api/v1/course", CourseRouter);
app.use("/api/v1/payment", PaymentRouter);
app.use("/api/v1/profile", ProfileRouter);
app.use("/api/v1/reach", ContactRouter);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Running",
  });
});

dbConnect();
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log("Listening on port ", `${PORT}`);
});
