const hapi = require("hapi");

const server = new hapi.Server();
const mongoose = require("mongoose");
const companyRoutes = require("./routes/company.routes");

const mongoDbUri = "mongodb://admin:admin1234@ds143143.mlab.com:43143/estudiantes";
//connect with mongoDB
mongoose.connect(
  mongoDbUri,
  {
    useMongoClient: true
  }
);
mongoose.connection.on("connected", () => {
  console.log(`app is connected to ${mongoDbUri}`);
});
mongoose.connection.on("error", err => {
  console.log("error while connecting to mongodb", err);
});

server.connection({ host: "localhost", port: "3000" });
server.route({
  path: "/",
  method: "GET",
  handler(req, reply) {
    reply("Welcome to HapiJs course!!");
  }
});

server.route(companyRoutes);

server.start(err => {
  if (err) {
    throw err;
  }
  console.log(`Server Running at PORT ${server.info.port}`);
});
