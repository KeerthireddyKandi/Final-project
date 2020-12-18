require('./config/config');
require('./models/db');
require('./config/passportConfig');

let express = require('express'),
   path = require('path'),
   mongoose = require('mongoose'),
   cors = require('cors'),
   bodyParser = require('body-parser'),
   passport = require('passport');

const rtsIndex = require('./routes/index.router');
const budgetRoute = require('./routes/budget.route')
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
 }));
app.use(cors());
app.use(passport.initialize());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', rtsIndex);
app.use('/budget', budgetRoute)
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(400).send(valErrors)
    }
    else{
        console.log(err);
    }
});

app.listen(process.env.PORT, () => console.log(`Server started at port : ${process.env.PORT}`));


