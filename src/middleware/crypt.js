var RSA = require('hybrid-crypto-js').RSA;
var Crypt = require('hybrid-crypto-js').Crypt;

//Config
var crypt = new Crypt();
var rsa = new RSA({
    keySize: 1024,
    rsaStandard: 'RSA-OAEP', // RSA-OAEP or RSAES-PKCS1-V1_5,
});


function generate(message) {

    rsa.generateKeyPairAsync().then(keyPair => {

        var privateKey = keyPair.privateKey;
        var publicKey = keyPair.publicKey;

        var encrypted = crypt.encrypt(publicKey, message);                
        var decrypted = crypt.decrypt(privateKey, encrypted);
                
        //Log test
        console.log("message:\n" + message + "\n");
        console.log("privateKey:\n" + privateKey);
        console.log("publicKey:\n" + publicKey);
        console.log("encrypted:\n" + encrypted + "\n");
        console.log("decrypted:\n" + JSON.stringify(decrypted) + "\n");
        console.log("originalMessage:\n" + decrypted.message + "\n");

    });
}

generate("Hello");