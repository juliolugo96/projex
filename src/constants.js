const COUNTRIES = require("i18n-iso-countries");

COUNTRIES.registerLocale(require("i18n-iso-countries/langs/en.json"));
COUNTRIES.registerLocale(require("i18n-iso-countries/langs/es.json"));

const COLOR_SCHEMA = {
    background: '#E8F1F2',
    black: '#2f323a',
    saturatedDark: '#77567a',
    dark: '#c47ac0',
    light: '#e39ec1',
    saturatedLight: '#debac0'
}


export {COUNTRIES, COLOR_SCHEMA};
