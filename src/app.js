require("dotenv").config();
const express = require("express"); // Import thư viện Express
const cors = require("cors");
const app = express(); // Tạo một instance của Express

const connectDB = require("./db/connect");

const userRoutes = require("./routes/userRoute");

// Middleware cơ bản để parse JSON
const allowedOrigins = [
  "http://localhost:3000",
  "https://daovang-react.onrender.com",
];

app.use(express.json());

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Kiểm tra nếu origin nằm trong whitelist hoặc nếu không có origin (cho các request nội bộ)
//       if (!origin || whitelist.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true, // Cho phép gửi cookie hoặc thông tin đăng nhập
//   })
// );

// Định nghĩa một route cơ bản tại đường dẫn `/`
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1/user", userRoutes);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`SERVER IS LISTENING ON PORT ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
