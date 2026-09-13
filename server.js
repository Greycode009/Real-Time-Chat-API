import { server } from "./src/app.js";
import connectDB from "./src/config/database.js";
import config from "./src/config/config.js";
import { createTestToken } from "./src/features/auth/auth.js";

await connectDB();

console.log("Test JWT:", createTestToken());

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
