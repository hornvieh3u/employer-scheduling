const Agenda = require("agenda");
console.log("process.env.MONGO_URI", process.env.MONGO_URI);
const agenda = new Agenda({ db: { address: process.env.MONGO_URI } });
agenda.start().then(() => {
  console.log("agenda started");
});

exports.agenda = agenda;
