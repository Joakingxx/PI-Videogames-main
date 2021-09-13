//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { PORT } = require("./src/utils/config");
const { GENRES_URL } = require("./src/constants");
const axios = require("axios");
const { Genre } = require("./src/db");
// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  const genresapi = axios.get(GENRES_URL);

  genresapi
    .then((genres) => {
      genres.data.results.forEach((e) => {
        Genre.create({ name: e.name });
      });
    })
    .catch((error) => {
      msg: error;
    });

  server.listen(PORT, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
  });
});
