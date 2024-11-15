const mongoose = require("mongoose");

const guildShema = mongoose.Schema({
  guildId: String,
  prefix: { type: String, default: "izu " },
  logChannel: { type: String, default: "926874969399500804" },
  messageLogChannel: { type: String, default: "926874969399500804" },
  commandsLogchannel: { type: String, default: "926874969399500804" },
  wlcChannel: { type: String, default: "926874969210777682" },
  warnChannel: { type: String, default: "926874969210777682" },
  rulesMessage: { type: String },
  memberRole: { type: String },
  moderatorRole: { type: String },
  adminRole: { type: String },
  ticketStatus: { type: String, default: "off" },
  ticketChannel: { type: String },
  ticketping: { type: String, default: "on" },
  ticketCategory: { type: String },
  recrutementStatus: { type: String },
  recrutementChannel: { type: String },
});

module.exports = mongoose.model("Guild", guildShema);

