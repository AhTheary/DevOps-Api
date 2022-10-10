const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const path = require("path");

app.use(cors({
    origin: 'http://23.22.169.48',
    credentials: true
}))

var cookieParser = require('cookie-parser')
app.use(cookieParser())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(express.json({
    limit: '50mb'
}));
app.use(express.static(path.join(__dirname, "public")));


// Connect session
require('./configs/session')(app);

// Connect mongodb
require('./configs/db')();

app.use(require('./routes'));



app.use((err, req, res, next) => {
    return res.json({
        success: false,
        code: 0,
        error: err
    })
})


app.listen(process.env.PORT || 3001, () => console.log('App avaiable on http://23.22.169.48:3001'))
