const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(proxy("/api", {
        "changeOrigin": true,
        "cookieDomainRewrite": "localhost",
        "secure": false,
        "target": "https://localhost:7194",
        "headers": {
            "host": "localhost:7194",
            "origin": null
        },
        "onProxyReq": function (proxyReq, req, res) {
            proxyReq.setHeader("accept-encoding", "identity")
        }
    }));
    app.use(proxy("/*.html", {
        "changeOrigin": true,
        "secure": false,
        "target": "https://localhost:7194"
    }));
    app.use(proxy("/packages/*.{js,css}", {
        "changeOrigin": true,
        "secure": false,
        "target": "https://localhost:7194"
    }));
};
