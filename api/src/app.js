import "dotenv/config";
import { default as express } from "express";
import { default as cors } from "cors"
import sessionRouter from "./routes/sessionRoutes.js";
import articleRouter from "./routes/articleRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/session", sessionRouter);
app.use("/api/user", userRouter);
app.use("/api/article", articleRouter);

// Missing routes forwarder
app.use(/(.*)/, (req, res) => {
  console.error(
    `Error: Resource ${req.originalUrl} with method ${req.method} not found`,
  );
  res.status(404).send({ error: "Not found" });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).send({ error: err.message });
  } else {
    return res.status(500).send({ error: "Internal server error" });
  }
});

// eslint-disable-next-line no-undef
app.listen(process.env.PORT);
