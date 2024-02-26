require('dotenv').config();

module.exports ={
    port:process.env.PORT || 3005,
    version:process.env.VERSION,
    url:process.env.URL,
    debug:process.env.DEBUG,
    db_engine:process.env.DB_ENGINE,
    db_database:process.env.DB_DATABASE,
    db_hostname:process.env.DB_DATABASE,
    db_password:process.env.DB_PASSWORD,
    db_username:process.env.DB_USERNAME,
    db_url:process.env.DB_URL,
    auth_secret:process.env.AUTH_SECRET,
    localized:process.env.LOCALIZED,
    default_lang:process.env.DEFAULT_LANG
}