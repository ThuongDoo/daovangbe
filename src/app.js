require("dotenv").config();
const express = require("express"); // Import thư viện Express
const app = express(); // Tạo một instance của Express

const connectDB = require("./db/connect");

const userRoutes = require("./routes/userRoute");

// Middleware cơ bản để parse JSON
app.use(express.json());
app.use(cors({ origin: "*" }));

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
