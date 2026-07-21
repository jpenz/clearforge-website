/**
 * IndexNow ping — tells Bing (which powers ChatGPT search) about fresh URLs
 * instantly instead of waiting for a crawl. Run after deploys / weekly.
 */
const KEY = 'a869d0281156565f06662f5d878d7a57';
const HOST = 'clearforge.ai';
const sm = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log('IndexNow ping:', res.status, res.status === 200 || res.status === 202 ? 'accepted' : 'check response', '·', urls.length, 'URLs');
