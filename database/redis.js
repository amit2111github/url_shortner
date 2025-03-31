const { createClient } = require("redis");

let client;
const makeConnection = async () => {
  if (client) return client;
  client = await createClient({
     url: 'redis://redis:6379'

  }).connect();
  return client;
};
makeConnection();

const getValueFromCache = async (key) => {
  const data = await client.get(key);
  if (!data) throw new Error("Not Found");
  console.log(data , "from cache");
  return data;
};

const getCachedLongUrl = async ({ shortUrl }) => {
  return getValueFromCache(`shortUrl:${shortUrl}`);
};

const cacheData = ({ key, value }) => {
  client.set(key, value);
};
module.exports = { getCachedLongUrl, cacheData };
