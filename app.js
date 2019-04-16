const Koa = require('koa');
const koaBody = require('koa-body');
const session = require('koa-session');
const CSRF = require('koa-csrf');
const router = require('koa-router')();

const app = module.exports = new Koa();
const request = require('./request');

/**
 * csrf need session
 */

app.keys = ['session key', 'weather pwa'];
app.use(session(app));

/**
 * maybe a bodyparser
 */
app.use(koaBody());

/**
 * csrf middleware
 */

app.use(new CSRF({ origin: true }));

/**
 * route
 */

router.get('/', homepage)
  .get('/forecast', forecast);

app.use(router.routes());

async function homepage(ctx) {
  ctx.body = 'Hello World!';
}

async function forecast(ctx) {
  try {
    const weatherData = await request(ctx.query.location);
    ctx.body = weatherData;
  } catch(err) {
    throw(err);
  }
}

if (!module.parent) app.listen(3000);
