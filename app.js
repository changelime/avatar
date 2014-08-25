var connect = require("connect");
var serve_static = require("serve-static");
var app = connect();
app.use(serve_static(__dirname + "/public"));
app.listen(process.env.VCAP_APP_PORT || 3000);