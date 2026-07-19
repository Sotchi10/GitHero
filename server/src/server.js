import app from "./app.js";

const port = process.env.APIPORT || 5000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});