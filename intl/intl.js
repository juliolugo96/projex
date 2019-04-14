// ES6 module syntax
import LocalizedStrings from 'react-native-localization';

// CommonJS syntax
// let LocalizedStrings  = require ('react-native-localization');

export default strings = new LocalizedStrings({
 en:{
   login_username: "Enter username",
   login_password: "Enter password",
   login_button: "LOGIN"
 },
 it: {
   login_username: "Introduce usuario",
   login_password: "Introduce contraseña",
   login_button: "INGRESAR"
 }
});