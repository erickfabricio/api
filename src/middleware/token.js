const jwt = require('jsonwebtoken');
const config = require('../../config');

//retun String
function generate(payload, seconds) {
    return jwt.sign(
        {
            exp: Math.floor(Date.now() / 1000) + (seconds),
            data: payload
        },
        config.key
    );
}

function validate(token) {
    return jwt.verify(token, config.key, function (err, info) {
        if (err) {
            return { ok: false, err: err };
        }
        return { ok: true, info: info };
    });
}

module.exports = { generate, validate };

/*TEST*/
payload = { user: "5e35aabec692ba0a5cc64012", name: "Erick", privileges: { entities: [{ entity: "adm-entities", view: false, edit: false, delete: false }, { entity: "adm-users", view: true, edit: true, delete: true } ], modules: [{ module: "perfil", access: true },{ module: "users", access: true }] } };
seconds = 2592000; //30 dias

token = generate(payload, seconds);

console.log(token);

resp = validate(token);
console.log("\npayload:" + payload + "\ntoken:" + token + "\nresp:" + JSON.stringify(resp));

//console.log(validate('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NzI1NDMwODYsImRhdGEiOiJlcmljayIsImlhdCI6MTU3MjU0MzAyNn0.Eh9Y9fb5UcDluHFlfi1_soYgMDOvLGlKtknG1KWiMKk'));


