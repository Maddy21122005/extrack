const { Schema, model } = require("mongoose");
const { randomBytes, createHmac } = require("node:crypto");
const { generateToken } = require("../services/authentication");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac("sha256", salt)
    .update(user.password)
    .digest("hex");

  this.salt = salt;
  this.password = hashedPassword;

  next();
});

userSchema.static(
  "matchPasswordAndGenerateToken",
  async function (email, password) {
    const user = await this.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const userSalt = user.salt;
    const userPassword = user.password;

    const userprovidedHash = createHmac("sha256", userSalt)
      .update(password)
      .digest("hex");

    if (userprovidedHash !== userPassword) {
      throw new Error("Incorrect Password");
    }

    const token = generateToken(user);
    return token;
  }
);

const User = model("user", userSchema);

module.exports = User;
