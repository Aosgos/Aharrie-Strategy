const passwordPattern = /^(?!.*[!;:])[\s\S]{4,}$/;

function generateRandomPassword() {
    const allowedChars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
    const minLength = 4; // Minimum length as per the regex pattern

    let password = '';

    // Generate password until it matches the pattern
    do {
        password = '';
        const passwordLength = Math.floor(Math.random() * (20 - minLength)) + minLength; // Generate a random length between minLength and 20
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * allowedChars.length);
            password += allowedChars.charAt(randomIndex);
        }
    } while (!passwordPattern.test(password));

    return password;
}

// Example usage:
// const generatedPassword = generateRandomPassword();

module.exports = {generateRandomPassword}