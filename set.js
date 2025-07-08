const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUVlQXNHdUdwTmtZcEtGUmNzQlM1MGhFNmwrREplMjlMdnNvbDlqMDNuRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOVAzM0lacjZ1ZWtwbEI2R0s4a2ZKaDEraDhEQjlGSmNtQkFsdXhycnVTWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJXTy9zbXBDVUY5ZXJjbVVtVzRRYnBGMmdHQmdMZk1jSmxvRndtZ1p0eEdnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBdlFaaC8vankyeFEwcEI5dkFXQlVNelR6aHc3S2tSTWdNVjZGSFF1MldFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZKZW1uZTAwbWdQNlpaTEJmZEVkSWZFR1JSeTBybWFvYytOSFZ2N1NRSHc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJWb2ovbHQrME5Qd1NDaWRJdnQzdFZMS2VPNFlkZEFvcjFETElaZ0dtR2M9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUJlYUNzbStZcWFvOTJkTEZKV29MNkdkZ0JLaXpOQUpGelQ2M0c1UzBuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieFlESWx1cGVaR05FUGlucE43cXpacEtkaloyN3RLWTh5bUtid0lZNDZtaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik5ZSHZwZUFxcVprMHNrSTBNdzRhV2c1REZ6cDkxQ1RSYXJkMlVJWTFkK3V4Q01oR3F0NHZTS0d1SUxuWk0wdHVGaUxGUWhJSHlwK0tMM2x1L3B1NkFnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM2LCJhZHZTZWNyZXRLZXkiOiJHVjIwOVFZaUdobkIrUjJuaitVMXdMVzRUZWt3UDYyck1WeDREVlROd3lRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTcxNDIyMjEzNkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIwNThGMkM5Q0JFQzBERUNEMkQ0MkU2NUU5QjNEREE3NiJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUxOTU2NjgzfSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU3MTQyMjIxMzZAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiMzhBMkQ3OTgyMjI0NUUyOTZGODUyNzA1RDQ4NDA4MzQifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MTk1NjY4NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1NzE0MjIyMTM2QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6Ijg3NTUwNjE1M0U0RURCOTQzMDI5RTU2Q0U0MEM0MjJFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTE5NTY2ODZ9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjRZWUo4UlQ3IiwibWUiOnsiaWQiOiIyNTU3MTQyMjIxMzY6MUBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJlZHdpbiIsImxpZCI6IjI1MzgzNzQ0OTQwMDQxMjoxQGxpZCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUDZoajhBREVMajVzc01HR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoia2tTOGNNQ1VwR0Z2Y3FyUmF3T3liR1FaVGxCZ3Z0Yk5tNGk3S0piWGwybz0iLCJhY2NvdW50U2lnbmF0dXJlIjoibmdCNzJWREZ4RGpPNHpIQWZWcHNuL0Vwb0JReGMvVFZmRTk2cWZsWG1NRDQ1MWxYdnp0cDExeUhrWjFiVUoveldDS1FsUm9NS2t4Y2lrWHFjd09MREE9PSIsImRldmljZVNpZ25hdHVyZSI6IkpmQ1MvR2hJcGdMSTI2WUJuNitlVW43NTZjc2hjNGErUTJQeTN5YlMrSXFvSkFlS2xuVDd1cGVEWGV1QzR0eXRhN2NPUmFlMGltc0pBTHN6YVlYTURnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1NzE0MjIyMTM2OjFAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWkpFdkhEQWxLUmhiM0txMFdzRHNteGtHVTVRWUw3V3padUl1eWlXMTVkcSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSUVnPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUxOTU2NjgwLCJsYXN0UHJvcEhhc2giOiJubTNCYiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUFdpIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "B.M.B-TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255714222136",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'B.M.B-TECH',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/hvi870.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '1' ,
    ETAT : process.env.PRESENCE || '2',
    ANTICALL : process.env.ANTICALL || 'yes',   
    AUTO_BIO : process.env.AUTO_BIO || 'yes',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'no',
    AUTO_REACT : process.env.AUTO_REACT || 'no',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'no',
    AUTO_READ : process.env.AUTO_READ || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

