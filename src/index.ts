import express from "express";
import cors from "cors";
import chatRouter from "./router/chat";
import dotenv from "dotenv"
dotenv.config()
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use("/chat", chatRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
