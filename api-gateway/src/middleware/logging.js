const logging = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log("Attempting to reach:", req.url);
  next();
};

module.exports = logging;
