// !eval - DANGER!
exports.run = (client, message, args) => {
  // if (message.author.id != config.ownerID) {
  if (message.author.id != process.env.ownerID) {
    message.channel.send("Sorry, you're not permitted to run that command.");
    return;
  }
  try {
    const code = args.join(" ");
    let evaled = eval(code);

    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }
}

// prevents the use of actual mentions within the return line by adding a zero-width character between the @ and the first character of the mention
function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
