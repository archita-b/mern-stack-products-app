import express from "express";
import dotenv from "dotenv";
import path from "path";
import productRouter from "./routes/product.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "front-end/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "front-end", "dist", "index.html"));
  });
}

app.listen(port, () => {
  connectDB();
  console.log(`server started at http://localhost:${port}`);
});
