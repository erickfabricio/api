/**
 * Autor...: Erick Fabricio Martínez Castellanos
 * Web.....: https://erickfabricio.com
 * Email...: mail@erickfabricio.com
 * GitHub..: https://github.com/erickfabricio
 */

const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('../config');

//Server
const app = express();

//MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
    useNewUrlParser: true
}).then(db => console.log('server db is connected'))
  .catch(err => console.log(err));
  

//Middleware
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

//Routers
app.use('/api/collections', require('./routers/adm-collections'));
app.use('/api/modules', require('./routers/adm-modules'));

app.use('/api/roles', require('./routers/adm-roles'));
app.use('/api/users', require('./routers/adm-users'));
app.use('/api/apps', require('./routers/adm-apps'));

app.use('/api/tokens', require('./routers/adm-tokens'));

app.use('/api/session', require('./routers/session'));
//app.use('/api/users', validateToken, require('./routers/users'));




//Start server
app.listen(config.port, () => {
    console.log("server web on port:", config.port);
});

//******** Util ********//

//Validations
function validateToken(req, res, next) {

  var token = req.headers['authorization'];

  if (!token) {
      return res.status(401).send({ ok: false, message: 'Authentication failed' });
  }

  token = token.replace('Bearer ', '');

  jwt.verify(token, config.key, function (err, info) {
      if (err) {          
          return res.status(401).send({ ok: false, message: 'Token invalid, ' + err.name + ' ' + err.message + '.' });
      } else {
          console.log("validateToken -> info:" + JSON.stringify(info));
          //res.status(200).json({ ok: true, menssage: "Correct token", info: info });
          //req.token = info
          next();
      }
  });
}