const redisClient = require("../config/redis.js");

const generateOtp = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  redisClient.set(email, otp, "EX", 300);
  return otp;
};

const verifyOtp = (email, otp, callback) => {
  redisClient.get(email, (err, result) => {
    if (err) {
      console.error("Error verifying OTP!:", err);
      return callback(false);
    }
    if (result === otp) {
      redisClient.del(email);
      return callback(true);
    } else {
      return callback(false);
    }
  });
};

module.exports = {
  generateOtp,
  verifyOtp,
};
