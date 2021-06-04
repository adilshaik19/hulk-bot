require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client();
const { multiply, add, sub } = require("./functions/calc");
const { prefix } = require("./config.json");
client.on("ready", async () => {
  console.log("The bot is online");
});

client.on("message", async (message) => {
  if (message.content.toLowerCase().startsWith(`${prefix}`)) {
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (cmd === "cal") {
      let ans = null;
      if (
        args.includes("+") ||
        args.includes("-") ||
        args.includes("x") ||
        args.includes("/")
      ) {
        for (let i = 0; i < args.length; ) {
          //DMAS
          let signum = null;
          signum = args.findIndex("*") || args.findIndex("x");
          if (!signum || signum == null) {
            signum = args.findIndex("+");
          }
          if (!signum || signum == null) {
            signum = args.findIndex("-");
          }

          sign = args[signum];

          //!!cal 14 + 10 + 3.9 x 1.7

          const arg = args[signum - i];

          var secondnum = args[signum + 1];
          console.log(signum, arg);
          if (arg && sign && secondnum) {
            if (
              !arg.includes("+") &&
              !arg.includes("-") &&
              !arg.includes("x") &&
              !arg.includes("/")
            ) {
              let arr = [arg, secondnum];
              try {
                if (ans.toString().split("").includes(".")) {
                  ans = parseFloat(ans);
                } else {
                  ans = parseInt(ans);
                }
                if (secondnum.toString().split("").includes(".")) {
                  secondnum = parseFloat(secondnum);
                } else {
                  secondnum = parseInt(secondnum);
                }
              } catch (error) {
                console.log(error);
              }

              //************************ADDITION************************* */
              if (sign === "+") {
                if (ans == null) {
                  ans = add(arr);
                } else if (ans !== null) {
                  console.log(ans, secondnum);
                  ans = ans + secondnum;
                }
                console.log(ans);
              }
              //************************SUBSTRACT************************* */
              else if (sign === "-") {
                if (ans == null) {
                  ans = sub(arr);
                } else if (ans !== null) {
                  ans = ans - secondnum;
                }
              }
              //************************MULTIPLY************************* */
              else if (sign === "x" || sign === "*") {
                console.log(ans);
                if (ans == null) {
                  ans = multiply(arr);
                } else if (ans !== null) {
                  ans = ans * secondnum;
                  console.log(ans);
                }
              }
            }
          }
          i++;
          if (i === args.length) {
            if (ans.toString() == "NaN") {
              return message.channel.send("Please Provide valid Numbers");
            } else {
              return message.channel.send(ans);
            }
          }
        }
      } else {
        if (args[0].toLowerCase() === "multiply") {
          args.shift();
          return message.channel.send(multiply(args));
        }
        if (args[0].toLowerCase() === "add") {
          args.shift();
          return message.channel.send(add(args));
        }
        if (args[0].toLowerCase() === "sub") {
          args.shift();
          return message.channel.send(sub(args));
        }
      }
    }
  }
});
client.login(process.env.token);
