import passwordValidator from 'password-validator'

var schema = new passwordValidator();

// Add properties to it
schema
.is().min(2)                                    // Minimum length 8                            // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().not().spaces()                           // Should not have spaces

console.log(schema.validate('validPASS123'));

export default function validatePassword(password){
    return {status:schema.validate(password), message: schema.validate(password, {details:true})}
}