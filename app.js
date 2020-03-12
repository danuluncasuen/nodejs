const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const upload = require('express-fileupload')
const port = 3000
app.use(upload())
app.use(express.static('public'))
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'rest_training',
  password: 'postgres',
  port: 5432,
})
const request = require("request")


app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', function(req, res) {
    res.sendFile('index.html');
});

app.post("/", function(req, res) {
    if (req.files) {
        let filename = req.files.image.name;
        req.files.image.mv("./public/images/" + filename, function(err) {
            if (err) {
                console.log(err);
                res.send("SMTH went wrong!");
            } else {
                res.send("All good");
            }
        })
    } else {
        console.log("no files");
        res.send("Please attach a file")
    }
})

app.get('/call-first-app', function(req, res) {
    request("http://localhost:8080/rest/users/", function(error, result) {
        if (error) {
            console.log(error);
        } else {
            res.json(JSON.parse(result.body));
        }
    })
})

app.get("/rest/users", function(req, res) {
  pool.query('SELECT * FROM user_table ORDER BY id ASC', (error, results) => {
  if (error) {
    res.status(200).json({responseObj: {message: "Could not get users", time: "unknown time"}});
  }
    res.status(200).json(results.rows)
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
