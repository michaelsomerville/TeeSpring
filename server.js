var http = require('http'),
    express = require('express'),
    request = require('request'),
    path = require('path'),
    fs = require('fs'),
    cheerio = require('cheerio');



var app = express();
    app.set('view engine', 'html');
    app.set('views', __dirname + '/views' );
    app.use(express.static(__dirname, '/public'));
    app.engine('html', require('hbs').__express);

var request = request.defaults({jar:true});

app.use( express.compress() );
app.use( express.methodOverride() );
app.use( express.urlencoded() );            // Needed to parse POST data sent as JSON payload
app.use( express.json() );
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Listenin for requests');
});
app.get('/', function(req, res){
    res.render('index');
});


app.post('/login', [express.urlencoded(), express.json()], function(req, res) {
    request.post({
      url: 'http://teeSpring.com/login/submitLogin',
      headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/33.0.1750.117 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded', 
      },
      form: {
        email: req.body.email,
        password: req.body.password
      },
      followAllRedirects: true
    }, function(error, response, body) {
      if (error) {
        console.log('Error is: '+JSON.stringify(error));
        res.send(400, "There is some problem  here.");  
      } else if(body){
        console.log(response.statusCode);
        res.send({"ok":"Logged in"});
      } else if(response) {
        console.log('Response is :'+response.statusCode);//+JSON.stringify(response));
        if(response.statusCode == 302 && response.headers && response.headers.location) {
          console.log(response.headers.location);
        }
      } else {
        console.log('WTF');
      }
    });
    });

app.get('/getCampaigns', function(req, res){
    request.get('http://analytics.teeSpring.com', function(error, response, body){
      console.log('fetch get called');
        if(!error && response.statusCode==200) {
            var scrappedResponse;
            scrappedResponse = analyzeData(body);
            console.log(scrappedResponse);
            res.send(scrappedResponse);
        }
    });
});

analyzeData = function(responseData) {
  var errorMessage;
  $ = cheerio.load(responseData);
  $(".errors > p").each(function(i, element) {
    console.log($(this).text().indexOf("The password you entered is incorrect"));
    if ($(this).text().indexOf("The password you entered is incorrect") >= 0) {
      console.log('finds the error')
      var error = new Error("Password did not match");
      error.code = 400;
      errorMessage = error;
      return false;
    }; 
  });
  var campaignArray = new Array();
  $('tbody > tr').each(function(i){
    var ele = {
        campaignName:$(this).find('td').eq(0).text(),
        orderedAndGoal:$(this).find('td').eq(2).text(),
        status:$(this).find('td').eq(4).text(),
        endDate:$(this).find('td').eq(3).text(),
        orderPlace:$(this).find('td').eq(0).text(),
      }
      campaignArray.push(ele);
  });
   
  return campaignArray;
}

writeToFile = function(body) {
  fs.writeFile("/home/himanshu/Projects/response.txt", body, function(err){
    if(err) {
      console.log(err);
    } else {
      console.log('File saved');
    }
  });
}