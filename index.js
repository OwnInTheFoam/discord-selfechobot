// require modules
const Discord = require('discord.js-selfbot');
//const Discord = require('discord.js');
const config = require('./config.json');

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
if(!config.messageIncludes.length){
  console.log('Please provide a valid config json file: message includes missing.');
}
const TOKEN = config.token.trim();
const MESSAGEINCLUDES = config.messageIncludes;

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
client.on('message', message => {    
    if (message.content === '!ping') {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Pong.');
	}
});

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
        channel.messages.fetch({ limit: 10 }).then(
          messages => {
            
            // loop through messages:
            messages.forEach((message) => {              
              // tests wether at least one element in the array passes the test
              //   array is the message includes list
              //   test is message contains/includes that message include
              if (MESSAGEINCLUDES.some(v => message.content.includes(v))) {
                // we have a match post to my channel!
                sendMessage(message);
              }
            });
          }
          ).catch(err=>{
            console.log(err);
          });
        }).catch(err=>{
          console.log(err);
        });
}

// Every minute, read last 10 messages in channel.
var timerID = setInterval(function() {
  // Ensure we can run
  if (!bClientReady){
    return;
  }

  // Read last 10 messages
  getLastMessage();
  
}, 60 * 1000 + Math.floor(Math.random() * 100));
