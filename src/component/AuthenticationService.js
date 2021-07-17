import CryptoJS from "crypto-js/core";
import AES from "crypto-js/aes";
import PBKDF2 from "crypto-js/pbkdf2";
import HmacSHA256 from "crypto-js/hmac-sha256";
import SHA256 from "crypto-js/sha256";

let state = {
    aes: {
        options: {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    },
    pbkdf2: {
        options: {
            keySize: 256 / 32,
            iterations: 20
        }
    }
};

let verifySHA256 = (message, hash) => {
    return SHA256(message).toString() === hash;
};

let getPBKDF2 = (key) => {
    let salt = CryptoJS.lib.WordArray.random(128 / 8);
    return {
        key: PBKDF2(key, salt, state.pbkdf2.options).toString(),
        salt: salt
    };
};

let getAesAndHmacEncryption = (data, key) => {
    let pbkdf = getPBKDF2(key);
    
    let aesData = AES.encrypt(data, pbkdf["key"], state.aes.options).toString() + "|" + pbkdf["salt"];
    return aesData + "|" + HmacSHA256(aesData, pbkdf["key"]);
};

let getAuthData = () => {
    let data = localStorage.getItem("authentication_data");
    if (!data)
        return null;

    data = data.split("@@@");
    if (data.length !== 2)
        return null;
    if (!verifySHA256(data[0], data[1]))
        return null;

    try {
        data = JSON.parse(decryptBase64(data[0]));
    } catch (e) {
        return null;
    }
    return data;
};

let encryptBase64 = (data) => {
    data = CryptoJS.enc.Utf8.parse(data);
    return CryptoJS.enc.Base64.stringify(data);
};

let decryptBase64 = (data) => {
    data = CryptoJS.enc.Base64.parse(data);
    return CryptoJS.enc.Utf8.stringify(data);
};

const AuthenticationService = {
    getUser: function() {
        let data = getAuthData();
        if (!data)
            return null;

        if (!("username" in data))
            return null;
        return data["username"];
    },
    setAuth: function(authObj, key, callback) {
        authObj["data"] = getAesAndHmacEncryption(JSON.stringify(authObj["data"]), key);
        authObj["hash"] = SHA256(JSON.stringify(authObj));

        let authBase64 = encryptBase64(JSON.stringify(authObj));
        localStorage.setItem("authentication_data", authBase64 + "@@@" + CryptoJS.SHA256(authBase64).toString());
        callback({ "status": "OK" });
    }
};

export default AuthenticationService;