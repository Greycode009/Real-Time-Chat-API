import connectDB from "./src/config/database.js";
import { server } from "./src/app.js";
import config from "./src/config/config.js";

await connectDB();

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
