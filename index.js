const express = require('express');
const cors = require('cors')
const app = express();
require('dotenv').config();
const port = process.env.PORT || 8000;
const db = require("./Config/db");
//Morgon for Loggers
var morgan = require('morgan');
const bodyParser = require('body-parser')


// Routes
const userRoute = require('./Routes/UserRoute');
const fileUploadRoute = require("./Routes/fileUploadRoute");
const courseRoute = require("./Routes/CourseRoute");
const queAndRoute = require("./Routes/QueAnsRoute");
const readWriteFile = require("./Routes/readWriteFile");
const eventEmitter = require("./Routes/eventEmitterRoute");
const otherRoute = require("./Routes/OtherRoute");
const tokenRoute = require("./Routes/tokenRoute");
const aggregationRoute = require("./Routes/AggregationRoute");


// Middlewares
app.use(cors());
app.use(morgan('combined'))
app.use(express.static('public'))
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type,Accept,Authorization,access-control-allow-origin"
    )
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", 'PUT,POST,GET,PATCH,DELETE')
        return res.status(200).json({});
    }
    next()
});


// Routes Mapping
app.use('/api/user', userRoute);
app.use('/api/files', fileUploadRoute);
app.use("/api/course", courseRoute);
app.use("/api/que-ans", queAndRoute);
app.use("/api/file", readWriteFile);
app.use("/api/event-emitter", eventEmitter);
app.use("/api/token", tokenRoute);
app.use("/api/all", otherRoute)
app.use("/api/aggregation", aggregationRoute)



// ================================== Get Response Time ===================================
const responseTime = require("response-time");
const StatsD = require("node-statsd");
const stats = new StatsD();
// app.use(responseTime());

app.use(
  responseTime(function (req, res, time) {
    var stat = (req.method + req.url)
      .toLowerCase()
      .replace(/[:.]/g, "")
      .replace(/\//g, "_");
    stats.timing(stat, time);
    // console.log("res time", time);
  })
);

app.listen(port, () => {
    console.log(`Listening on port ` + port)
});