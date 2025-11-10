import { server } from "./app.ts";

// Run the server!
server.listen({ port: 3000, host: "0.0.0.0" }).then(() => {
  console.log("Server is running at http://localhost:3000");
});
