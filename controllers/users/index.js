const signIn = require("./signIn");
const signUp = require("./signUp");
const signOut = require("./signOut");
const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const verifyRepeat = require("./verifyRepeat");

module.exports = {
  signIn,
  signUp,
  signOut,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  verifyRepeat,
};
