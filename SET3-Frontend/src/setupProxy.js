const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/usermodels"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: process.env.REACT_APP_BACKEND_URL,
        secure: false
    });

    app.use(appProxy);
};