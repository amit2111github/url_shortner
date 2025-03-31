const { Pool } = require("pg");
const { cacheData, getCachedLongUrl } = require("./redis");
const db = new Pool({
  user: "postgres",
  password: "password",
  database: "postgres",
  host: "db",
  port: "5432",
});

db.query(
  `create table if not exists url(shortUrl text unique, longUrl text)`
).then((r) => db.query(`create index if not exists idx1 on url(shorturl)`));

const storeInDb = async ({ shortUrl, longUrl }) => {
  return db.query(`insert into url (shortUrl , longUrl) values ($1 , $2)`, [
    shortUrl,
    longUrl,
  ]);
};

const getLongUrl = async ({ shortUrl }) => {
  try {
    const longurl = await getCachedLongUrl({ shortUrl });
    console.log("cached");
    return { longurl };
  } catch (err) {
    console.log(err.message)
    const { rows } = await db.query(
      `select longUrl from url where shortUrl = $1`,
      [shortUrl]
    );
    console.log(rows[0]);
    if (!rows || rows.length === 0)
      throw new Error("Short url does not exists in system");
    cacheData({ key: `shortUrl:${shortUrl}`, value: rows[0].longurl });
    return rows[0];
  }
};

module.exports = { storeInDb, getLongUrl };
