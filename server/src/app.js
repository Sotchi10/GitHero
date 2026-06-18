
import { express } from 'express';
import { logger } from './middleware/logger.js'

export const app = express();

// middleware
app.use(logger);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("GitHero Backend is running");
});


