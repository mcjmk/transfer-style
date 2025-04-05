const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8000",
      changeOrigin: true,
      secure: false,
      onProxyReq: (proxyReq, req, res) => {
        console.log("Proxying request to:", req.method, proxyReq.path);
      },
      onProxyRes: (proxyRes, req, res) => {
        console.log("Received response:", proxyRes.statusCode);
      },
      onError: (err, req, res) => {
        console.error("Proxy error:", err);
      },
    }),
  );
};
