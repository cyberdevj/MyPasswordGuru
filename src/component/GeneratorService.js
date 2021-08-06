import AuthenticationService from "./AuthenticationService";

// TODO Recalculating interest weightage score based password generation
// TODO Import and Export of user data

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
let interests = [];
let training = [];
let randomInterest = {
    original: [],
    encoded: []
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
            if (Math.random() > 0.5)
                array[i] = characterMapping[array[i]][Math.floor(Math.random() * characterMapping[array[i]].length)];
        }
    }
    return array.join('');
};

const transformCharacterCasing = (interest, options) => {
    if (options.uppercase && options.lowercase)
        return interest.split('').map(v => Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()).join('');
    else if (options.uppercase)
        return interest.toUpperCase(); 
    else if (options.lowercase)
        return interest.toLowerCase();
};

const getWeightedRandom = (interests) => {
    let weightedInterestTable = [];
    interests.forEach(v => {
        for (let i = 0; i < v.weight; i++) {
            weightedInterestTable.push(v);
        }
    });
    return weightedInterestTable[Math.floor(Math.random() * weightedInterestTable.length)];
};

const getRandomInterest = (interests, options) => {
    if (interests.length === 0) return interests;
    randomInterest = {
        original: [],
        encoded: []
    };

    while (randomInterest.original.map(v => v.name).join('').length < options.length) {
        let temp = getWeightedRandom(interests);
        
        randomInterest.original.push({
            name: temp.name,
            type: temp.type,
            weight: temp.weight
        });
    }
    randomInterest.original.pop();
    // randomInterest.original.forEach(() => {
    //     if (randomInterest.original.length > 1 && Math.random() > 0.5) {
    //         randomInterest.original.pop();
    //     }
    // });

    randomInterest.original.forEach((v, i) => {
        randomInterest.encoded.push(v.name);
        randomInterest.encoded[i] = transformCharacterCasing(randomInterest.encoded[i], options);
        randomInterest.encoded[i] = transformCharacterLeet(randomInterest.encoded[i], options);
    });
    return randomInterest;
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
        special: [],
        interests: []
    };

    // Adds interest to password
    let passwordLength = options.length;
    if (randomInterest.encoded && randomInterest.encoded.length > 0) {
        password.interests = randomInterest.original;
        password.new = randomInterest.encoded;
        passwordLength -= password.new.join('').length;
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

const initializeInterestWeight = (data, interests) => {
    if (interests.length === 0) return interests;
    training = data ? data : [];
    interests.forEach((v1) => {
        training.forEach((v2) => {
            if (v1.name === v2.name && v1.type === v2.type) {
                v1.weight = v2.weight;
                return;
            }
        });
        if (!("weight" in v1)) v1.weight = 10;
    });
    return interests;
}

const GeneratorService = {
    generatePassword: function(options, selectedInterest) {
        let data = AuthenticationService.get("training");
        if (data["status"] !== "OK")
            return data;
        
        interests = initializeInterestWeight(data["data"], selectedInterest);

        MINIMUM_UPPERCASE = options.uppercase ? 1 : 0;
        MINIMUM_LOWERCASE = options.uppercase ? 1 : 0;
        MINIMUM_NUMBERS = options.default.numbers;
        MINIMUM_SPECIAL = options.default.special;

        let randomInterest = getRandomInterest(interests, options);
        let password = buildPassword(options, randomInterest);

        return password;
    },
    saveInterestWeight: function() {
        interests.forEach(i => {
            if (training.findIndex(x => i.name === x.name && i.type === x.type) === -1) training.push(i);
        });

        randomInterest.original.forEach(v1 => {
            let i = training.findIndex(x => v1.name === x.name && v1.type === x.type);
            training[i].weight++;
            interests = interests.filter(v2 => {return !(v1.name === v2.name && v1.type === v2.type)})
        });

        interests.forEach(v => {
            let i = training.findIndex(x => v.name === x.name && v.type === x.type);
            if (training[i].weight > 1) training[i].weight--;
        });
        console.log(training);
        AuthenticationService.set("training", training);
    }
};

export default GeneratorService;