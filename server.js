var express = require('express'),
    app = express();

app.use(express.static('/'));
app.use(express.static(__dirname + '/public/app'));

var server = app.listen(3000,process.env.IP, function(){
       console.log('example app listening  on :%s', 3000);        
});