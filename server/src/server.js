import express from "express";
import route from "./features/auth/authRoute.js";
import cors from "cors";


const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


const port = 5000;

app.get("/", (req, res) => res.send("Hello World!"));

//Authentication
app.use("/auth", route);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});