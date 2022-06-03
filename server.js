const express = require("express");
const cors = require("cors");
const app = express();

const db = require("./models/index");
const dbConfig = require("./config/db.config");
const path = require("path");

var dir = path.join(__dirname, "uploads");

global.__basedir = __dirname;

var corsOptions = {
  origin: "http://localhost:3011",
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

app.use("/annonces", express.static(path.join(__dirname, "/annonces")));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// simple route

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Sirh application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const Role = db.role;
db.mongoose
  .connect(`${dbConfig.connectionString}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
