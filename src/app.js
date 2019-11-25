const express = require("express");
const path = require("path");
const request = require("request");
var hbs = require("hbs"); // ---partials

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

console.log(path.join(__dirname, "../public"));
const viewsPath = path.join(__dirname, "/templates/views");
const partialsPath = path.join(__dirname, "/templates/partials"); // ---partials

// setting up the templating engine
app.set("view engine", "hbs");
// views folder have been renamed to 'templates'(lookup line-7)
app.set("views", viewsPath);
app.use(express.static(path.join(__dirname, "../public")));
hbs.registerPartials(partialsPath); // ---parials

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abhishek Mazumdar"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Abhishek Mazumdar"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
    name: "Abhishek Mazumdar"
  });
});
app.get("/weather", (req, res) => {
  const { address } = req.query;
  if (!address) {
    res.send({ err: "You need to have an address. Period." });
  } else {
    geocode(address, (err, { latitude, longitude, location } = {}) => {
      if (err) {
        return res.send({ error: err });
      } else {
        console.log(location);
        forecast(latitude, longitude, (error, response) => {
          if (error) {
            return res.send({ error });
          } else {
            res.send({
              temperature: response.temperature,
              location: location,
              time: response.time,
              summary: response.summary
            });
          }
        });
      }
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("helpError", {
    title: "404 Help page Not Found",
    name: "Abhishek Mazumdar"
  });
});
app.get("*", (req, res) => {
  res.render("genericError", {
    title: "404",
    name: "Abhishek Mazumdar"
  });
});

app.listen(port, () => {
  console.log("server is up at localhost:"+port);
});
