const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User.js");

const {
  sendConfirmationEmail,
  sendOtpEmail,
} = require("../services/emailService.js");
const { generateOtp, verifyOtp } = require("../services/otpService.js");

class AuthController {
  static async register(req, res) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: "User already exists!" });
      }

      const apiKey = uuidv4();
      user = new User({ email, password, apiKey });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      await sendConfirmationEmail(email);

      res.status(200).json({
        msg: "You've successfully registered, Please check your e-mail for confirmation.",
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "User not found!" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password!" });
      }

      const otp = generateOtp(email);

      await sendOtpEmail(email, otp);
      res.status(200).json({ msg: "An OTP has been sent to your e-mail" });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }

  static async verifyOtp(req, res) {
    const { email, otp } = req.body;
    try {
      verifyOtp(email, otp, async (isValidOtp) => {
        if (!isValidOtp) {
          return res.status(400).json({ msg: "Invalid OTP!" });
        }

        const user = await User.findOne({ email });
        if (!user) {
          return res.status(400).json({ msg: "User not found!" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });
        res.status(200).json({ token });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
}

module.exports = AuthController;
