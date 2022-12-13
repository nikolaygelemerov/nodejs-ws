// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

const keys = [];

const envConfig = dotenv.config().parsed;

module.exports = {
  generateEnvKeys: (isDev) =>
    keys.reduce((accum, key) => {
      accum[key.name] = isDev
        ? JSON.stringify(envConfig[key.name])
        : JSON.stringify(process.env[key.name]);

      return accum;
    }, {})
};
