import AuthenticationService from "./AuthenticationService";

// TODO Generate based on interest first
// TODO Generate based on profile after

const uppercaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercaseCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numberCharacters    = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const specialCharacters   = ['!', '@', '#', '$', '%', '^', '&', '*'];
const ambiguousCharacters = ['0', 'O', 'I', 'l'];

let MINIMUM_UPPERCASE = 0;
let MINIMUM_LOWERCASE = 0;
let MINIMUM_NUMBERS = 0;
let MINIMUM_SPECIAL = 0;

const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
};

const replaceCharacter = (password, key, min, array) => {
    while (password[key].length < min) {
        let randomChoice = Math.floor(Math.random() * 4);
        let characterToReplace = null;
        if (randomChoice === 0 && password.uppercase.length > MINIMUM_UPPERCASE) characterToReplace = "uppercase";
        if (randomChoice === 1 && password.lowercase.length > MINIMUM_LOWERCASE) characterToReplace = "lowercase";
        if (randomChoice === 2 && password.numbers.length > MINIMUM_NUMBERS) characterToReplace = "numbers";
        if (randomChoice === 3 && password.special.length > MINIMUM_SPECIAL) characterToReplace = "special";
        if (!characterToReplace) continue;

        let replacementIndex = password[characterToReplace][Math.floor(Math.random() * password[characterToReplace].length)];
        password.new[replacementIndex] = array[Math.floor(Math.random() * array.length)];
        password[characterToReplace].splice(password[characterToReplace].indexOf(replacementIndex), 1);
        password[key].push(replacementIndex);
    }
};

const getAllCharacters = (allowUppercase, allowLowercase, allowNumber, allowSpecial) => {
    let allCharacters = [];
    if (allowUppercase) allCharacters = allCharacters.concat(uppercaseCharacters);
    if (allowLowercase) allCharacters = allCharacters.concat(lowercaseCharacters);
    if (allowNumber)    allCharacters = allCharacters.concat(numberCharacters);
    if (allowSpecial)   allCharacters = allCharacters.concat(specialCharacters);
    return allCharacters;
};

const setInterestTraining = () => {
    let data = AuthenticationService.get("interests");
    if (data["status"] !== "OK")
    return [];
    data = data["data"];
    
    let training = [];
    for (let i in data) {
        training.push({
            name: data[i]["name"],
            type: data[i]["type"],
            weight: 1.0,
        });
    }
    return training;
};

const GeneratorService = {
    generatePassword: function(passwordLength, allowUppercase, allowLowercase, allowNumbers, allowSpecial, minNumbers, minSpecial) {
        let data = AuthenticationService.get("training");
        if (data["status"] !== "OK")
            return data;

        // Filler function for now
        if (!data["data"]) {
            let training = {
                profile: {},
                interest: setInterestTraining()
            };
            // console.log(training);
        }

        MINIMUM_UPPERCASE = allowUppercase ? 1 : 0;
        MINIMUM_LOWERCASE = allowLowercase ? 1 : 0;
        MINIMUM_NUMBERS = minNumbers;
        MINIMUM_SPECIAL = minSpecial;

        let allCharacters = getAllCharacters(allowUppercase, allowLowercase, allowNumbers, allowSpecial);
        let password = {
            new: [],
            uppercase: [],
            lowercase: [],
            numbers: [],
            special: []
        };
        for (let i = 0; i < passwordLength; i++) {
            let c = allCharacters[Math.floor(Math.random() * allCharacters.length)];
            password.new.push(c);
            if (/^[A-Z]$/.test(c)) password.uppercase.push(i);
            if (/^[a-z]$/.test(c)) password.lowercase.push(i);
            if (/^[0-9]$/.test(c)) password.numbers.push(i);
            if (/^[!@#$%^&*]$/.test(c)) password.special.push(i);
        }

        replaceCharacter(password, "uppercase", MINIMUM_UPPERCASE, specialCharacters);
        replaceCharacter(password, "lowercase", MINIMUM_LOWERCASE, specialCharacters);
        replaceCharacter(password, "numbers", MINIMUM_NUMBERS, numberCharacters);
        replaceCharacter(password, "special", MINIMUM_SPECIAL, specialCharacters);

        return password.new;
    }
};

export default GeneratorService;