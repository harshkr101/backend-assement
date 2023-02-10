import express from "express";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import itemRoutes from "./routes/item";
import cartRoutes from "./routes/cart";
import adminRoutes from "./routes/admin";

const app = express();
const port = 3001;
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", itemRoutes); // item endpoints
app.use("/api/", cartRoutes); // cart endpoints
app.use("/api/admin", adminRoutes); // admin endpoints

app.listen(port, () => {
  return console.log(`Server is listening at http://localhost:${port}`);
});
