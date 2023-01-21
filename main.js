const { Client, Collection, Partials} = require("discord.js");
const dotenv = require("dotenv"); dotenv.config();
const mongoose = require("mongoose");
const Izuna = new Client({ intents: 38671, partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User]});
const Logger = require("./utils/logger");

["commands", "buttons", "selects"].forEach(x => Izuna[x] = new Collection());

// event handler et commands handler
["eventUtil", "commandUtil", "buttonHandler", "selectHandler"].forEach(handler => { require(`./utils/handlers/${handler}`)(Izuna); });
require("./utils/functions")(Izuna);

process.on("exit", code => {Logger.warn("Process exit with code : " + code)});
process.on("uncaughtException", (err, origin) => {Logger.error("Uncaught exception : " + err + " from " + origin)});
process.on("unhandledRejection", (reason, promise) => {
    Logger.warn(`unhandledRejection : ${reason}`)
    console.log(promise);
});
process.on("warning", (...args) => {Logger.warn("Warning : " + args )});


mongoose.connect(process.env.DATABASE_URI, {
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}).then(() => { console.log("Connected to database") }).catch(err => { Logger.error("Error while connecting to database : " + err) });

Izuna.login(process.env.DISCORD_TOKEN);