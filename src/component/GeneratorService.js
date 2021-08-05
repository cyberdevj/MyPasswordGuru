import AuthenticationService from "./AuthenticationService";

// TODO Randomly select interest based on weightage score
// TODO Recalculating interest weightage score based password generation
// TODO Import and Export of user data
// TODO Copy function

const uppercaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
const lowercaseCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
const numbersCharacters   = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const specialCharacters   = ['!', '@', '#', '$', '%', '^', '&', '*'];
const numbersCharacterMapping = {
    'A': ['4'],
    'B': ['8'],
    'G': ['6'],
    'g': ['9'],
    'I': ['1'],
    'l': ['1'],
    'O': ['0'],
    'o': ['0'],
    'S': ['5'],
    'T': ['7'],
    'Z': ['2']
};
const specialCharacterMapping = {
    'A': ['@'],
    'a': ['@'],
    'H': ['#'],
    'I': ['!'],
    'i': ['!'],
    'l': ['!']
};

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

const transformCharacterLeet = (interest, options) => {
    let array = interest.split('');
    for (let i = 0; i < array.length; i++) {
        let randomMapping = Math.floor(Math.random() * 2);
        let characterMapping = null;
        if (options.numbers && randomMapping === 0 && numbersCharacterMapping[array[i]]) {
            characterMapping = numbersCharacterMapping;
        }
        if (options.special && randomMapping === 1 && specialCharacterMapping[array[i]]) {
            characterMapping = specialCharacterMapping;
        }

        if (characterMapping) {
            let randomChoice = Math.floor(Math.random() * 2);
            if (randomChoice === 1)
                array[i] = characterMapping[array[i]][Math.floor(Math.random() * characterMapping[array[i]].length)];
        }
    }
    return array.join('');
};

const transformCharacterCasing = (interest, options) => {
    if (options.uppercase && options.lowercase)
        return interest["name"].split('').map(v => Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()).join('');
    else if (options.uppercase)
        return interest["name"].toUpperCase(); 
    else if (options.lowercase)
        return interest["name"].toLowerCase();
};

const getRandomInterest = (interests, options) => {
    if (interests.length === 0)
        return interests;
    
    let randomInterest = [];
    while (randomInterest.join('').length < options.length) {
        randomInterest.push(interests[Math.floor(Math.random() * interests.length)]);
        let i = randomInterest.length - 1;
        
        randomInterest[i] = transformCharacterCasing(randomInterest[i], options)
        randomInterest[i] = transformCharacterLeet(randomInterest[i], options);
    }
    return randomInterest.splice(-1);
};

const getCharacterSet = (allowUppercase, allowLowercase, allowNumber, allowSpecial) => {
    let allCharacters = [];
    if (allowUppercase) allCharacters = allCharacters.concat(uppercaseCharacters);
    if (allowLowercase) allCharacters = allCharacters.concat(lowercaseCharacters);
    if (allowNumber)    allCharacters = allCharacters.concat(numbersCharacters);
    if (allowSpecial)   allCharacters = allCharacters.concat(specialCharacters);
    return allCharacters;
};

const buildPassword = (options, randomInterest) => {
    let characterSet = getCharacterSet(options.uppercase, options.lowercase, options.numbers, options.special);
    let password = {
        new: [],
        uppercase: [],
        lowercase: [],
        numbers: [],
        special: []
    };

    // Adds interest to password
    let passwordLength = options.length;
    if (randomInterest.length > 0) {
        randomInterest.forEach(v => {
            password.new.push(v);
            passwordLength -= v.length;
        });
    }

    for (let i = 0; i < passwordLength; i++) {
        let c = characterSet[Math.floor(Math.random() * characterSet.length)];
        password.new.push(c);
    }
    password.new = shuffle(password.new);
    getPasswordStats(password);
    doCharacterReplacement(password, options);
    return password;
};

const getPasswordStats = (password) => {
    password.new = password.new.join('').split('');
    password.new.forEach((v, i) => {
        if (/^[A-Z]$/.test(v)) password.uppercase.push(i);
        if (/^[a-z]$/.test(v)) password.lowercase.push(i);
        if (/^[0-9]$/.test(v)) password.numbers.push(i);
        if (/^[!@#$%^&*]$/.test(v)) password.special.push(i);
    });
};

const doCharacterReplacement = (password, options) => {
    if (options.uppercase) replaceCharacter(password, "uppercase", MINIMUM_UPPERCASE, specialCharacters);
    if (options.lowercase) replaceCharacter(password, "lowercase", MINIMUM_LOWERCASE, specialCharacters);
    if (options.numbers)   replaceCharacter(password, "numbers",   MINIMUM_NUMBERS,   numbersCharacters);
    if (options.special)   replaceCharacter(password, "special",   MINIMUM_SPECIAL,   specialCharacters);
};

const getInterestWeight = (data, interests) => {
    if (interests.length === 0) {
        return interests;
    }

    let training = data ? data : {};
    
    interests.forEach((v, i) => {
        interests[i].weight = training[v] ? training[v].weight : 100;
    });
    return interests;
}

const GeneratorService = {
    generatePassword: function(options, interests) {

        let data = AuthenticationService.get("training");
        if (data["status"] !== "OK")
            return data;
        
        interests = getInterestWeight(data["data"], interests);

        MINIMUM_UPPERCASE = options.uppercase ? 1 : 0;
        MINIMUM_LOWERCASE = options.uppercase ? 1 : 0;
        MINIMUM_NUMBERS = options.default.numbers;
        MINIMUM_SPECIAL = options.default.special;

        let randomInterest = getRandomInterest(interests, options);
        let password = buildPassword(options, randomInterest);

        return password.new;
    }
};

export default GeneratorService;