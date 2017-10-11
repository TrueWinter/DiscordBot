const { exec } = require("child_process");

exports.run = async (client, message, args) => {
  const command = args.join(" ");
  const output = await message.channel.send(`Running \`${command}\`...`);
  let stdOut = await doExec(command).catch(data=> outErr(output, data));
  stdOut = stdOut.substring(0, 1800);
  output.edit(`\`OUTPUT\`
\`\`\`sh
${client.clean(stdOut)}
\`\`\``);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 10
};

exports.help = {
  name: 'exec',
  description: 'Executes a console command.',
  usage: 'exec [command]'
};

const outErr = (message, stdData) => {
  let { stdout, stderr } = stdData;
  stderr = stderr ? ["`STDERR`","```sh",client.clean(stderr.substring(0, 700)) || " ","```"] : [];
  stdout = stdout ? ["`STDOUT`","```sh",client.clean(stdout.substring(0, stderr ? stderr.length : 2046 - 40)) || " ","```"] : [];
  let msg = stdout.concat(stderr).join("\n").substring(0, 2000);
  message.edit(msg);
};

const doExec = (cmd, opts = {}) => {
  return new Promise((resolve, reject) => {
    exec(cmd, opts, (err, stdout, stderr) => {
      if (err) return reject({ stdout, stderr });
      resolve(stdout);
    });
  });
};
