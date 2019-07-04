import store from "./redux";

const COUNTRIES = require("i18n-iso-countries");

COUNTRIES.registerLocale(require("i18n-iso-countries/langs/en.json"));
COUNTRIES.registerLocale(require("i18n-iso-countries/langs/es.json"));

const cond = store.getState().currentUser.colorSchema;

const COLOR_SCHEMA = {
  background: "#E8F1F2",
  black: "#2f323a",
  saturatedDark: "#77567a",
  dark: "#c47ac0",
  light: "#e39ec1",
  saturatedLight: "#debac0"
};

if (cond == "1") {
  COLOR_SCHEMA = {
    background: "#E8F1F2",
    black: "#001a23",
    saturatedDark: "#31493c",
    dark: "#7a9e7e",
    light: "#b3efb2",
    saturatedLight: "#e8f1f2"
  };
}

export { COUNTRIES, COLOR_SCHEMA };
