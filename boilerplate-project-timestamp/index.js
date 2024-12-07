// index.js
// where your node app starts

// init project
let express = require('express');
let app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// API point that takes a date as input, and returns it in UTC and UNIX formats
app.get("/api/:date?", (req, res) => {
  // Get parameter
  let dateParam = req.params.date;

  console.log(typeof(dateParam));

  // Check if param is empty or null
  (dateParam == null || dateParam == undefined || dateParam == "") ? dateParam = "" : 0;
  
  // If param is empty/null, return current date
  if (dateParam == "")
  {
    let date = new Date();
    res.json({unix: new Number(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 
      date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())), utc: date.toUTCString()});
  }
  else
  {
    // First check if the input is a number, which would be milliseconds
    let num = new Number(dateParam);

    // If the number is not NaN, then return the output by creating a new Date with the input
    // Else if the number is NaN, check for other date formats
    if (!isNaN(num))
    {
      dateParam = new Number(dateParam);
      let date = new Date(dateParam);
      res.json({unix: new Number(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 
        date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())), utc: date.toUTCString()});
    }
    else
    {
      // If the input is a valid date format, a Date object should be successfully created
      if (new Date(dateParam) != "Invalid Date")
      {
          let date = new Date(dateParam);
          res.json({unix: new Number(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 
            date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds())), utc: date.toUTCString()});
      }
      else
      {
        // If that also fails return the following
        res.json({error: "Invalid Date"});
      }
    }
  }

});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
