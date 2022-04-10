const fastify = require('fastify')()
const routes = require('./routes/routes')
const fastifyCors = require('fastify-cors')
//var allowlist = ['http://localhost:3000', 'https://beast-novel.vercel.app/']

fastify
.register(routes)
.register(require("fastify-cors"), {
    origin: true
});

fastify.all("/*", (req, res) => {
    console.log(req);
    console.log(req.headers);
    const testValue = req.headers["x-test-value"] || "";
    const body = req.body || "";
    res
      .type("text/plain; charset=utf-8")
      .send(
        `${Date.now()} ${req.raw.method} ${
          req.raw.originalUrl
        } ${body} ${testValue} `
      );
  });
module.exports = fastify