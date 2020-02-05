const bcrypt = require('bcrypt');
const saltRounds = 10;

function generate(password) {
    return bcrypt.hashSync(password, saltRounds); //String
}

function validate(password, hash) {
    return bcrypt.compareSync(password, hash); //True or False
}

module.exports = { generate, validate };

/* TEST */
password = "abc123";
hash = generate(password);
rest = validate(password, hash);
console.log("password:" + password + "\nhash:" + hash + "\nrest:" + rest);
