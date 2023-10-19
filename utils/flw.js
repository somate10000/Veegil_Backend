const PUBLIC_KEY = process.env.PUBLIC_KEY;
const SECRET_KEY = process.env.SECRET_KEY;

const Flutterwave = require("flutterwave-node-v3");
const flw = new Flutterwave(PUBLIC_KEY, SECRET_KEY);

module.exports = { flw };
