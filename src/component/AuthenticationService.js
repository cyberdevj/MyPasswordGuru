import CryptoJS from "crypto-js/core";
import AES from "crypto-js/aes";
import PBKDF2 from "crypto-js/pbkdf2";
import HmacSHA256 from "crypto-js/hmac-sha256";
import SHA256 from "crypto-js/sha256";

let state = {
    separator: "@@@",
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

let getAuthObj = () => {
    let data = localStorage.getItem("authentication_data");
    if (!data)
        return null;

    data = data.split(state.separator);
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

let getAuthItem = () => {
    let data = getAuthObj();
    let encryptedData = data["data"].split(state.separator)[0];
    let decryptedData = decryptAES(encryptedData, localStorage.getItem("sessionKey"));
    return JSON.parse(decryptedData);
};

let getAuthSalt = () => {
    let data = getAuthObj();
    return data["data"].split(state.separator)[1];
}

let verifySHA256 = (message, hash) => {
    return SHA256(message).toString() === hash;
};

let verifyHmac = (message, key, hash) => {
    return HmacSHA256(message, key).toString() === hash;
}

let validateSessionKey = (data, key) => {
    data = data.split(state.separator);
    if (data.length !== 3)
        return false;

    if (key)
        key = PBKDF2(key, data[1], state.pbkdf2.options).toString();
    else
        key = localStorage.getItem("sessionKey");

    if (!verifyHmac(data[0] + state.separator + data[1], key, data[2]))
        return false;

    localStorage.setItem("sessionKey", key);
    return true;
}

let getPBKDF2 = (key) => {
    let salt = CryptoJS.lib.WordArray.random(128 / 8).toString();
    return {
        key: PBKDF2(key, salt, state.pbkdf2.options).toString(),
        salt: salt
    };
}

let encryptAndStore = (authObj, key, salt) => {
    authObj["data"] = encryptAES(JSON.stringify(authObj["data"]), key, salt);

    let authBase64 = encryptBase64(JSON.stringify(authObj));
    localStorage.setItem("authentication_data", authBase64 + state.separator + CryptoJS.SHA256(authBase64).toString());
};

let encryptAES = (data, key, salt) => {
    data = AES.encrypt(data, key, state.aes.options).toString() + state.separator + salt;
    return data + state.separator + HmacSHA256(data, key);
};

let decryptAES = (data, key) => {
    return AES.decrypt(data, key, state.options).toString(CryptoJS.enc.Utf8);
};

let encryptBase64 = (data) => {
    data = CryptoJS.enc.Utf8.parse(data);
    return CryptoJS.enc.Base64.stringify(data);
};

let decryptBase64 = (data) => {
    data = CryptoJS.enc.Base64.parse(data);
    return CryptoJS.enc.Utf8.stringify(data);
};

let OKStatus = (data) => {
    return { status: "OK", data: data };
}

let ERRStatus = (data) => {
    let statusResponse = { status: "ERR" };
    if (data)
        statusResponse["data"] = data;
    return statusResponse;
}

const AuthenticationService = {
    getFaviconUrl: function(url) {
        return `https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`;
    },
    getHttps: function(url) {
        if (!/^https?:\/\//i.test(url))
            url = 'http://' + url;
        return url;
    },
    getItemFromList: function(id, list) {
        for (let i in list)
            if (list[i]["id"] === parseInt(id))
                return list[i];
        return null;
    },
    updateItemFromList: function(id, list, value) {
        for (let i in list)
            if (list[i]["id"] === parseInt(id))
                list[i] = value;
        return list;
    },
    getLastId: function(data) {
        let id = 0;
        for (let i in data)
            if (id < data[i]["id"])
                id = data[i]["id"];
        return id;
    },
    getUser: function() {
        let data = getAuthObj();
        if (!data)
            return null;

        if (!("username" in data))
            return null;

        return OKStatus(data["username"]);
    },
    generateEncryptedAuthObj: function(authObj, key, callback) {
        let pbkdf = getPBKDF2(key);

        encryptAndStore(authObj, pbkdf.key, pbkdf.salt);

        callback(OKStatus());
    },
    get: function(key) {
        if (!this.sessionValid())
            return ERRStatus("Invalid session");

        let data = getAuthItem()

        return OKStatus(data[key]);
    },
    set: function(key, value) {
        if (!this.sessionValid())
            return ERRStatus("Invalid session");

        let data = getAuthItem();
        data[key] = value;

        let authObj = getAuthObj();
        authObj["data"] = data;
        encryptAndStore(authObj, localStorage.getItem("sessionKey"), getAuthSalt());

        return OKStatus(data);
    },
    sessionStart: function(key) {
        let data = getAuthObj();
        
        if (!validateSessionKey(data["data"], key))
            return null;
        return OKStatus();
    },
    sessionValid: function() {
        if (!localStorage.getItem("sessionKey")) {
            localStorage.removeItem("sessionKey");
            return false;
        }
        
        let data = getAuthObj();
        if (!validateSessionKey(data["data"])) {
            localStorage.removeItem("sessionKey");
            return false;
        }
        return true;
            
    },
    sessionDestroy: function() {
        localStorage.removeItem("sessionKey");
    }
};

export default AuthenticationService;