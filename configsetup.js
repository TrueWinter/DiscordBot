var readline = require('readline');
var fs = require("fs");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Owner ID: ", function(answer) {
  // TODO: Log the answer in a database
  var answer1 = answer;
  //console.log("Thank you");
  //console.log(answer1);

  rl.question("Token: ", function(answer) {
    // TODO: Log the answer in a database
    var answer2 = answer;
    //console.log("Thank you");
    //console.log(answer2);

    rl.question("Invite Filter: ", function(answer) {
      // TODO: Log the answer in a database
      var answer3 = answer;
      //console.log("Thank you");
      //console.log(answer3);

        rl.question("Prefix: ", function(answer) {
          // TODO: Log the answer in a database
          var answer4 = answer;
          //console.log("Thank you");
          //console.log(answer4);

          rl.question("Mod Log Channel: ", function(answer) {
            // TODO: Log the answer in a database
            var answer5 = answer;
            //console.log("Thank you");
            //console.log(answer5);

            rl.question("Mod Role (name): ", function(answer) {
              // TODO: Log the answer in a database
              var answer6 = answer;
            //  console.log("Thank you");
            //  console.log(answer6);

              rl.question("Admin Role (name): ", function(answer) {
                // TODO: Log the answer in a database
                var answer7 = answer;
              //  console.log("Thank you");
              //  console.log(answer7);

                rl.question("Welcome message (see config docs): ", function(answer) {
                  // TODO: Log the answer in a database
                  var answer8 = answer;
                //  console.log("Thank you");
                //  console.log(answer8);

                  rl.question("Welcome Message Enabled: ", function(answer) {
                    // TODO: Log the answer in a database
                    var answer9 = answer;
                  //  console.log("Thank you");
                  //  console.log(answer9);

              rl.close();

              var answers = {
                "ownerID": answer1,
                "token": answer2,
                "inviteFilter" : {
                  "enabled": answer3
                },
                "defaultSettings" : {
                  "prefix": answer4,
                  "modLogChannel": answer5,
                  "modRole": answer6,
                  "adminRole": answer7,
                  "welcomeMessage": answer8,
                  "welcomeEnabled": answer9
                }
              }


    // And then, we save the edited file.
                  fs.writeFile("./config.json", JSON.stringify(answers), (err) => {
                    if (err) console.error(err)
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
