// require modules
const Discord = require('discord.js-selfbot');
//const Discord = require('discord.js');

// Load in config
require("hjson/lib/require-config");
const config=require("./config.hjson");

// check valid config
if(!config || config.token.trim()==''){
  console.log('Please provide a valid config json file: token missing.');
}
if(config.sourceChannel.trim()==''){
  console.log('Please provide a valid config json file: source channel missing.');
}
if(config.destinationChannel.trim()==''){
  console.log('Please provide a valid config json file: destination channel missing.');
}
if(!config.delayInterval){
  console.log('Please provide a valid config json file: delay interval missing.');
}
if(!config.readMessages){
  console.log('Please provide a valid config json file: read messages missing.');
}
if(!config.messageAnyIncludes.length){
  console.log('Please provide a valid config json file: message includes missing.');
}
const TOKEN = config.token.trim();
const MESSAGEMUSTINCLUDE = config.messageMustInclude;
const MESSAGEANYINCLUDES = config.messageAnyIncludes;
var lastMessage = 0;

// create a new Discord client
const client = new Discord.Client();

var bClientReady = false;
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Client ready!');

  // Client is ready, read messages from channel every so often.
  bClientReady = true;
});

// login to Discord with your app's token
client.login(TOKEN).catch(err => {
  console.log("Could not sign into Discord:", err);

  // The setInterval it cleared and doesn't run anymore.
  clearInterval(timerID);
});;

// Register event for when an error occurs.
client.on('error', error => {
  console.log("An error occurred: ", error.message);

  // The setInterval it cleared and doesn't run anymore.
  clearInterval(timerID);
});

// Register event for when client receives a message.
// client.on('message', message => {
//   console.log(message.content);
//   if (message.content === '!ping') {
// 		// send back "Pong." to the channel the message was sent in
// 		message.channel.send('Pong.');
// 	}
// });

// Send the given message to the destination channel
async function sendMessage(message){
  let header = null;
  let body = message.content;

  if (!body) {
      console.log(`Dropping message from ${message.author.username} as their message would be empty.`)
      return;
  }

  // Find destination channel.
  client.channels.fetch(config.destinationChannel).then(
    destChannel => {
      if (destChannel == null) {
          console.log('Destination channel not found.');
          return;
      }
      
      // todo: Ensure destination channel is a text channel
      
      // todo: Send the header
      if (header) {
          console.log("Sending header");
      }

      // Send the body
      console.log("Sending body");
      destChannel.send(body).catch(err=>{
        console.log(err);
      });
    }
  )
}

// Get the last 10 messages from the source channel and compare them for sending.
async function getLastMessage() {   
    // get source channel
    client.channels.fetch(config.sourceChannel).then(
      channel => {
        
        channel.messages.fetch({ limit: config.readMessages }, {cache:false, force:true}).then(
          messages => {

            // Loop through messages.
            for (let obj of Array.from(messages).reverse()) {
              var message = obj[1];
              
              // Only newer messages.
              if (message.createdTimestamp<=lastMessage){
                continue;
              }

              // Update the last read message.
              lastMessage = message.createdTimestamp;

              // Ensure the message includes any must include if provided.
              if(MESSAGEMUSTINCLUDE.length && !message.content.includes(MESSAGEMUSTINCLUDE)){
                continue;
              }

              // Ensure at least one element in the array passes the test
              //   array is the message includes list
              //   test is message contains/includes that message include
              if (MESSAGEANYINCLUDES.length && !MESSAGEANYINCLUDES.some(v => message.content.includes(v))) {
                continue;
              }

              // we have a match post to my channel!
              sendMessage(message);
            }
          }
          ).catch(err=>{
            console.log(err);
          });
        }).catch(err=>{
          console.log(err);
        });
}

// Every config.delayInterval (seconds), read last config.readMessages number of messages from channel.
var timerID = setInterval(function() {
  // Ensure we can run
  if (!bClientReady){
    return;
  }

  // Read last messages.
  getLastMessage();
}, config.delayInterval * 1000 + Math.floor(Math.random() * 100));



