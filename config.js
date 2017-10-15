var config = {
  "ownerID": process.env.OWNERID, // Your ID here (or use `process.env.OWNERID`)
  "token": process.env.TOKEN, // Your bot token here (or use `process.env.TOKEN`)
  "defaultSettings" : {
    "prefix": ";;",
    "modLogChannel": "mod-log",
    "modRole": "Moderator",
    "adminRole": "Admin",
    "welcomeChannel": "general",
    "welcomeMessage": "Welcome {{user}}!",
    "welcomeEnabled": "true",
    "inviteFilterEnabled": "true",
    "inviteWhitelist": ["discord-testers", "discord-developers"]
  },
    "dashboard" : {
    "oauthSecret": process.env.SECRET,
    "callbackURL": `https://${process.env.PROJECT_DOMAIN}.glitch.me/callback`,
    "sessionSecret": process.env.SESSION_SECRET,
    "domain": `${process.env.PROJECT_DOMAIN}.glitch.me`,
    "port": process.env.PORT,
  }
};

module.exports = config;
