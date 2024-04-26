var express = require('express');
var cors = require('cors');
var app = express();

// Use CORS middleware
app.use(cors());

app.use(express.static(__dirname + '/src'));

app.listen(process.env.PORT || 3000, () => {
    console.log('\x1b[32m', " WEBAPP STARTED AT http://localhost:" + (process.env.PORT || 3000));
});
