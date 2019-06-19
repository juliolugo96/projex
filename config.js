import IS_DEVELOPMENT from "./env";

// Use the ip associated with your simulator's
// virtual machine (execute ifconfig in a terminal and copy
// the result for vboxnetN (N is an integer)
export const BASE_URL = IS_DEVELOPMENT
  ? "http://10.0.3.2:8000"
  : "http://10.0.3.2:8000";
export const DEFAULT_EMAIL = "admin@admin.com";
export const DEFAULT_PASSWORD = "admin12345";
