const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/weatherforecast",
    "/usermodels"
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://set3-backend20220330235604.azurewebsites.net/',
        secure: false
    });

    app.use(appProxy);
};