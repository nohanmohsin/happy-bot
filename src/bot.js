require('dotenv').config()
let fetch = require("node-fetch");

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var date = new Date();
var mnth = monthNames[date.getMonth()];
var dt = date.getDate();
var yr = date.getFullYea
var seconds = date.getSeconds();
var minutes = date.getMinutes();
var hour = date.getHours();

var ampm = hour >= 12 ? 'PM' : 'AM';
hour = hour % 12;
hour = hour ? hour : 12;
minutes = minutes < 10 ? '0'+minutes : minutes;

const botToken=process.env.BOT_TOKEN;
const realBotToken=process.env.BOT_TOKEN2;
let newsToday = []

const prefix = '+';

const topics = [
  'Who was your best friend in elementary school?', 'How often do you check your phone?', 'Records, tapes, CDs, MP3s, streaming. Which did you grow up with? What is good and bad about each?', 'What would you want your last meal to be if you were on death row?', 'What is your guilty pleasure?', 'What was the biggest thing you have ever won?', 'What are your plans for this weekend?', 'What did you do on your last vacation?', 'How much do you plan for the future?', 'What do you think about game shows? Do you have a favorite one?', 'Where is the most relaxing place you have been?', 'When was the last time you worked incredibly hard?', 'What foods do you absolutely hate?', 'What is your favorite cuisine or type of food?', 'What kind of interior do you like a restaurant to have?  ', 'Do you prefer traveling alone or with a group?', 'Who is your oldest friend? Where did you meet them?', 'Which season are you most active in?  ', 'What movie scene choked you up the most?', 'Do you prefer to go off the beaten path when you travel?', 'Who is your favorite athlete?'
]

const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});


//games
const { tictactoe, hangman, chatBot } = require('reconlx')

//voice-channel modules
var discordjsVoicerole = require("discordjs-voicerole");
const { default: VoiceRoleManager } = require('discordjs-voicerole');

//music distube

const DisTube = require('distube');
const distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });

const newsApiKey=process.env.NEWS_API_KEY

client.on('ready', ()=> {
    client.channels.fetch('821986130995576866')
    .then(channel => {
      channel.send("Hello there!");
    })
    
    client.user.setActivity("The Happy Team", {
      type: "LISTENING"
    })
    // fetch(`http://api.mediastack.com/v1/news?access_key=${newsApiKey}&countries=us,gb,de&date=${yr}-${monthNames.indexOf(mnth) + 1}-${dt}`)
    // .then(res => res.json())
    // .then(news => {
    //   console.log(`${yr}-${monthNames.indexOf(mnth) + 1}-${dt}`);
    //   newsToday = news.data;
    // })
})

const manager = new VoiceRoleManager({
  "821986130995576867": "824225704606040065"
});

//using this event to give roles to members when they join vc
client.on('voiceStateUpdate', (old, cur) => manager.trigger(old, cur));


client.on('message', msg => {
    //help command
    let member = msg.mentions.members.first()
    if(msg.content.toLowerCase() === '+help'){
      //the embed message
      const helpEmbed = new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setDescription('to be able to check all the commands in the sections use ``+help [section name]``\n eg.``+help fun``')
      .setTitle('The Happy Bot Commands')
      
      .addFields(
        { name: `🎈**Fun Commands/fun**
        `, value: `*all the fun commands you can use
        have fun!!*
        **9 commands**`, inline: true },
        {name: '👀Info', value: `*using these commands you can get to know about the server and the staff*
        **3 commands**`, inline: true},
        { name: `🎮**Games**
        `, value: `*fun games will be available for you guys to enjoy and earn money*
        **3 commands**`, inline: true }
      )
      .addField(`\u200B`,'\u200B')
      .addFields(
        
        {name: `📝Suggestions`, value: `*give us some suggestions to work on!!!feel free to say anything you need!!*
        **2 commands**`, inline: true},
        {name: `🕵️‍♂️Report`, value: `*setup events or get roles to get notified for events you wanna join in*
        **1 command**`, inline: true}, 
        {name: `🎭 Roleplay`, value: '*got some roleplay commands in here too*\n **7 commands**', inline: true}
      )
      .addFields(
        {name: '🎉Events', value: '*everything related to events*\n **2 commands**', inline:true},
        {name: '\u200B', value: '\u200B', inline: true},
        {name: '🎶Music', value: '*play some music!!*\n **12 commands**', inline: true}
      )
      msg.channel.send(helpEmbed)
    }

    //help game command
    if(msg.content.toLowerCase() === '+help games'){
      //the embed message
      const helpGameEmbed = new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setDescription('few games to play and pass the time')
      .setTitle('Game Commands')
      .addField('1. ``+tictactoe {mention}``', 'play tictactoe with a friend....**second player is necessary**')
      .addField('2. ``+hangman``', 'play hangman 🪂')
      .addField('3. ``+trivia``', 'play some trivia and check your big brain XD')
      msg.channel.send(helpGameEmbed)
    }
    
    //help fun command
    if(msg.content.toLowerCase() === '+help fun'){
      //the embed message
      const helpFunEmbed = new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setDescription('all the fun commands you can use are stated below:')
      .setTitle('Fun Commands')
      .addField('1. ``+avatar [mention]``', 'use this to see your avatar or the users avatar if you pinged someone')
      .addField('2. ``+clock``', 'use this to check the time in dhaka, bangladesh')
      .addField('3. ``+joke``', 'get a random joke \:)')
      .addField('4. ``+pun``', 'get a random pun \;)')
      .addField('5. ``+fact``', 'get a random fact')
      .addField('6. ``+meme``', 'get a meme to laugh at')
      .addField('7. ``+catpic``', 'get a cute catpic')
      .addField(`8. go chat with our bot in the chatbot channel :3`)
      .addField('9, ``+topic``', 'get a random topic if you are bored or you have nothing to talk about ')
      msg.channel.send(helpFunEmbed)
    }

    //help info command
    if(msg.content.toLowerCase().startsWith('+help info')){
      //embed message 
      const infoHelpEmbed= new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setTitle('Info commands')
      .setDescription('get to know more about our server or our staff or get some news for today')
      .addField('1. ``+info server``', 'get to know more about our server by using this command')
      .addField('2. ``+info mod``', 'learn about our current staff members')
      .addField('3. ``+news``', 'learn about the global news ( currently turned off)')
      msg.channel.send(infoHelpEmbed)
    }

    //help suggest command 
    if(msg.content.toLowerCase().startsWith('+help suggest')){
      const suggestHelpEmbed= new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setTitle('Suggest commands')
      .setDescription('suggest something to the server staff')
      .addField('1. ``+suggest {suggestion}``', 'with this you can send your suggestion to the staff')
      .addField('2. ``+application {your application}``', 'with this command you can send an application to be our staff')
      msg.channel.send(suggestHelpEmbed)
    }

    //help report command
    if(msg.content.toLowerCase().startsWith('+help report')){
      const reportHelpEmbed = new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setTitle('Report commands')
      .addField('``+report {user}``', 'report a user with this command')
      msg.channel.send(reportHelpEmbed)
    }

    //help roleplay command
    if(msg.content.toLowerCase().startsWith('+help roleplay')){
      const roleplayHelpEmbed= new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setTitle('Roleplay commands')
      .addField('1. ``+kill {mention}``', '\u200B')
      .addField('2. ``+kiss {mention}``', '\u200B')
      .addField('3. ``+shout {mention}``', '\u200B')
      .addField('4. ``+pat {mention}``', '\u200B')
      .addField('5. ``+hug {mention}``', '\u200B')
      .addField('6. ``+stab {mention}``', '\u200B')
      .addField('7. ``+bonk {mention}``', '\u200B')
      msg.channel.send(roleplayHelpEmbed)
    }

    //help events command
    if(msg.content.toLowerCase().startsWith('+help event')){
      const eventsHelpEmbed = new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setTitle('Events commands')
      .addField('1. ``+event add``', '\u200B')
      .addField('2. ``+event announce``', 'only for mods')
    }
    
    //help music command
    if(msg.content.toLowerCase().startsWith('+help music')){
      const musicHelpEmbed = new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setTitle('Music commands')
      .addField('1. ``+play {song-name}', 'add song to queue')
      .addField('2. ``+stop``', 'stop the music')
      .addField('3. ``+repeat``', 'repeat the current playing song')
      .addField('4. ``+loop``', 'loop the queue')
      .addField('5. ``+queue``', 'view the queue')
      .addField('6. ``+3d', 'add 3d filter to the queue')
      .addField('7. ``+bassboost', 'add bassboost filter to the queue')
      .addField('8. ``+echo', 'add echo filter to the queue')
      .addField('9. ``+karaoke', 'add karaoke filter to the queue')
      .addField('10. ``+nightcore', 'add nightcore filter to the queue')
      .addField('11. ``+vaporwave', 'add vaporwave filter to the queue')
      .addField('12. ``+skip', 'skip the current playing song')
    }
    //avatar command
    if (msg.content.toLowerCase() === '+avatar') {
        // Send the user's avatar URL
        msg.channel.send(msg.author.displayAvatarURL());
    }
    //if avatar command has a ping
    if(msg.mentions.users.first() && msg.content.toLowerCase().startsWith('+avatar')){
        let user;
        user = msg.mentions.users.first();
        msg.channel.send(user.displayAvatarURL());
    }

    //time in dhaka
    if(msg.content.toLowerCase() === '+clock'){
        msg.channel.send('Dhaka : ' + mnth + ' ' + dt + ' '+ yr + ' ' + hour + ':'+ minutes + ':'+ seconds + ' ' + ampm);
    }

    //joke command
    if(msg.content.toLowerCase() === '+joke'){
      //fetching from an api
      fetch('https://official-joke-api.appspot.com/random_joke')
      .then(res => res.json())
      .then(data => {
          msg.channel.send(`${data.setup}
          ||${data.punchline}||`)
      })
    }

    //pun command
    if(msg.content.toLowerCase() === '+pun'){
      //fetching the pun
      fetch('https://v2.jokeapi.dev/joke/Pun?blacklistFlags=nsfw,religious,political,racist,sexist&type=twopart')
      .then(res => res.json())
      .then(data => {
          msg.channel.send(`${data.setup}
          ||${data.delivery}||`)
      })
    }

    //facts command
    if(msg.content.toLowerCase() === '+fact'){
      fetch('https://useless-facts.sameerkumar.website/api')
      .then(res => res.json())
      .then(fact => {
        msg.channel.send(`${fact.data}`)
      })
    }

    //meme command
    if(msg.content.toLowerCase() === '+meme'){
      
      fetch('https://meme-api.herokuapp.com/gimme')
      .then(res => res.json())
      .then(data => {
        if(data.nsfw !== true){
          const memeEmbed = new Discord.MessageEmbed()
          .setColor('#E7BB00')
          .setTitle(data.title)
          .setDescription(`r/${data.subreddit}`)
          .setImage(data.url);
          msg.channel.send(memeEmbed)
        }
        else{
          
          fetch('https://meme-api.herokuapp.com/gimme/wholesomememes')
          .then(res => res.json())
          .then(meme => {
            const sfwMemeEmbed = new Discord.MessageEmbed()
            .setColor('#E7BB00')
            .setTitle(meme.title)
            .setDescription(`r/${meme.subreddit}`)
            .setImage(meme.url);
            msg.channel.send(sfwMemeEmbed)
          })
        }

      })
    }

    //catpics command
    if(msg.content.toLowerCase().startsWith('+catpic')){
      fetch('https://api.thecatapi.com/v1/images/search')
      .then(res => res.json())
      .then(data => {
        const image = new Discord.MessageAttachment(data[0].url)
        msg.channel.send(image)
      })
      
    }

    //chatbot command
    if(msg.channel.id == '821024044077547531'){
      if(msg.author.bot) return;
      else{
        chatBot(msg, msg.content)
      }
      
    }

    //more chatbot commands
    if(msg.content === 'hi'){
      msg.channel.send('hello')
    }

    if(msg.content.toLowerCase() == 'yo'){
      msg.channel.send('yo yo!!')
    }

    if(msg.content.toLowerCase() == 'ok'){
      msg.channel.send('oh okay')
    }

    if(msg.content.toLowerCase() == 'i hate you'){
      msg.channel.send('why ;-;')
    }

    if(msg.content.toLowerCase() == 'hey'){
      msg.channel.send('hello!!')
    }

    if(msg.content.toLowerCase() == 'lol'){
      msg.channel.send('XD')
    }

    if(msg.content.toLowerCase() == 'who'){
      msg.channel.send('idk')
    }

    if(msg.content.toLowerCase() == 'thank u'){
      msg.channel.send('welcome')
    }

    if(msg.content.toLowerCase() == 'i love you'){
      msg.channel.send('I love you too')
    }

    //topic command
    if(msg.content.toLowerCase().startsWith('+topic')){
      const randomNumber = Math.floor(Math.random() * 22) + 1 

      msg.channel.send(topics[randomNumber - 1])
    }

    //SUGGESTIONS section
    
    //suggest command
    if(msg.content.toLowerCase().startsWith('+suggest')){
      const suggestionEmbed = new Discord.MessageEmbed()
      .setColor("#E7BB00")
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(msg.content.slice(8))
      client.channels.cache.get('822031398256902144').send(suggestionEmbed);
      msg.channel.send('Suggestion added successfully :3 thank you very much')
    }
    
    //mod-application command
    if(msg.content.toLowerCase().startsWith('+application')){
      const modApplicationEmbed = new Discord.MessageEmbed()
      .setColor("#E7BB00")
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(msg.content.slice(12))
      client.channels.cache.get('822031398256902144').send(modApplicationEmbed);
      msg.channel.send('application added successfully :3 you will get a response soon')
    }

    //REPORT SECTION

    //report command 
    if(msg.content.toLowerCase().startsWith('+report') && msg.mentions.users.first() && msg.content.split(/\s+/).join('').length > 10 + msg.mentions.users.first().id.length){
      msg.channel.send('yes')
      const reportEmbed = new Discord.MessageEmbed()
      .setColor("#E7BB00")
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(msg.content.slice(7))
      client.channels.cache.get('822031398256902144').send(reportEmbed);
      msg.channel.send('report added!! we are on it!!! :3')
    }

    //GAMES SECTION

    //tictactoe command
    if(msg.content.toLowerCase().startsWith('+tictactoe') && msg.mentions.users.first()){
      const game = new tictactoe({
        message: msg,
        player_two: msg.mentions.members.first(),
      });
      
      msg.channel.send(game);
    }
    
    //hangman command
    if(msg.content.toLowerCase().startsWith('+hangman') ){

      fetch('https://random-word-api.herokuapp.com/word?number=1')
      .then(res => res.json())
      .then(data => {
        const hang = new hangman({
          message: msg,
          word: data[0],
          client: client,
          channelID: '820627346402705448',
        })
        // starting the game
        hang.start()
        
      }
      )
      
    }
    //trivia game ;-;
    if(msg.content.toLowerCase().startsWith('+trivia')){
      
      fetch('https://opentdb.com/api.php?amount=1&difficulty=medium&type=multiple')
      .then(res => res.json())
      .then(data => {
        Array.prototype.insert = function ( index, item ) {
          this.splice( index, 0, item );
        };
        
        const randomNumber= Math.floor(Math.random() * 4) + 1 
        
        
        let options = [data.results[0].incorrect_answers[0], data.results[0].incorrect_answers[1], data.results[0].incorrect_answers[2]];
        
        options.insert(randomNumber - 1, data.results[0].correct_answer); 

        const triviaEmbed = new Discord.MessageEmbed()
        .setColor('#E7BB00')
        .setDescription(data.results[0].question)
        .addField(`1. ${options[0]}`, '⠀')
        .addField(`2. ${options[1]}`, '⠀')
        .addField(`3. ${options[2]}`, '⠀')
        .addField(`4. ${options[3]}`, '⠀')
        let filter = (user) => {
        return user.author.id === msg.author.id
        }
        msg.channel.send(triviaEmbed)
        .then(sent => 
        {
          
          sent.channel.awaitMessages(filter,  {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(collected => {
            
            
            if(collected.first().content == randomNumber){
              
              sent.delete()
              msg.channel.send('you found the answer')
            }
            else{
              
              msg.channel.send("sorry, that's the wrong answer ;-;")
            }
          })
          .catch(console.error);
        })
        
      })

    }


    //INFO SECTION

    //info server command
    if(msg.content.toLowerCase().startsWith('+info server')){
      const serverInfoEmbed= new Discord.MessageEmbed()
      .setColor('#E7BB00')
      .setTitle('Info about our server')
      .setDescription(`₊˚꒷꒦Have a great time ${msg.author}  here in The Happy Team . . . feel free to chat with others! also please don't forget to read the rules!^^. you can chat with others in revamping. . . ! and you can even try to level up by chatting! or you can grind from different bots! there are a lot you can do in revamping. . . ! I got to go now see ya and have fun!!₊˚꒷꒦`)
      msg.channel.send(serverInfoEmbed)
    }

    //news command
    //turned off becoz api has limited requests
    // if(msg.content.toLowerCase().startsWith('+news') && newsToday.length > 0){
    //   const newsEmbed = new Discord.MessageEmbed()
    //   .setColor('#E7BB00')
    //   .setTitle("Today's News")
    //   newsToday.forEach(news => {
    //     newsEmbed.addField(news.title, news.url)
    //   })
    //   msg.channel.send(newsEmbed);
    // }
    
    //  EVENTS SECTION
    //event-req command
    if(msg.content.toLowerCase().startsWith('+event add') && msg.content.length > 9){
      const eventAddEmbed = new Discord.MessageEmbed()
      .setColor("#E7BB00")
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(msg.content.slice(10))
      client.channels.cache.get('822031398256902144').send(eventAddEmbed);
      msg.channel.send('event application added successfully :3 you will get a response soon')
    }
    
    //event announcement
    if(msg.content.toLowerCase().startsWith('+event announce') && msg.member.roles.cache.find(r => r.id === '819529264016785460')){
      const eventEmbed = new Discord.MessageEmbed()
      .setColor('#E7BB00')
      let filter = (user) => {
        return user.author.id === msg.author.id
      }
      msg.channel.send('enter only the title')
      
      .then(sent => 
        {
          
          sent.channel.awaitMessages(filter,  {
            max: 1,
            time: 30000,
            errors: ['time']
          })
          .then(collected => {
            
            
            
              
            sent.delete()
            
            eventEmbed.setTitle(collected.first().content)
            msg.channel.send('set a description')
            .then(awaitDescription => {
              awaitDescription.channel.awaitMessages(filter,  {
                max: 1,
                time: 30000,
                errors: ['time']
              })
              .then(description => {
                eventEmbed.setDescription(description.first().content)
                client.channels.cache.get('824155451196440576').send(eventEmbed)
              })
            })
            
          })
          .catch(console.error);
        })
    }
    //ROLEPLAY SECTION
    //kill command
    if(msg.content.toLowerCase().startsWith('+kill') && msg.mentions.users.first()){
      msg.channel.send(`${msg.author} killed ${msg.mentions.users.first()}\n https://tenor.com/view/kill-smack-anime-gif-9955653 `)
    }

    //kiss command
    if(msg.content.toLowerCase().startsWith('+kiss') && msg.mentions.users.first()){
      msg.channel.send(`${msg.author} kissed ${msg.mentions.users.first()}\n https://tenor.com/view/kiss-anime-cute-kawaii-gif-13843260`)
    }

    //shout command
    if(msg.content.toLowerCase().startsWith('+shout') && msg.mentions.users.first()){
      msg.channel.send(`${msg.author} shouted at ${msg.mentions.users.first()}\n https://tenor.com/view/love-lab-anime-frustrated-raging-rage-gif-7329767`)
    }

    //pat command
    if(msg.content.toLowerCase().startsWith('+pat') && msg.mentions.users.first()){
      msg.channel.send(`${msg.author} patted ${msg.mentions.users.first()}\n https://tenor.com/view/pat-pat-head-thats-okay-anime-gif-14751753`)
    }

    //hug command
    if(msg.content.toLowerCase().startsWith('+hug') && msg.mentions.users.first()){
      msg.channel.send(`${msg.author} hugged ${msg.mentions.users.first()}\n https://tenor.com/view/hug-anime-gif-11074788`)
    }

    //stab command
    if(msg.content.toLowerCase().startsWith('+stab') && msg.mentions.users.first()){
      msg.channel.send(`${msg.author} stabbed ${msg.mentions.users.first()}\n https://tenor.com/view/excel-saga-stabby-stab-stab-fustrated-anime-gif-14178229`)
    }

    //bonk command
    if(msg.content.toLowerCase().startsWith('+bonk') && msg.mentions.users.first()){
      msg.channel.send(`${msg.author} bonked ${msg.mentions.users.first()}\n https://tenor.com/view/jujutsu-kaisen-bonk-anime-hammer-nobara-gif-20256156`)
    }


    //MUSIC SECTION
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift();
    if (command == "play"){
      distube.play(msg, args.join(" "));
    }
        

    if (["repeat", "loop"].includes(command)){
      distube.setRepeatMode(msg, parseInt(args[0]));
    }

    if (command == "stop") {
      distube.stop(msg);
      msg.channel.send("Stopped the music!");
    }

    if (command == "skip"){
      distube.skip(msg);
    }

    if (command == "queue") {
        let queue = distube.getQueue(msg);
        msg.channel.send('Current queue:\n' + queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
        ).slice(0, 10).join("\n"));
    }

    if ([`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`].includes(command)) {
      let filter = distube.setFilter(msg, command);
      msg.channel.send("Current queue filter: " + (filter || "Off"));
    }
})
//welcome message
client.on('guildMemberAdd', member => {
    
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(` WELCOME!\n Welcome to The Happy Team ${member},\n 😊 Thank you for joining`);
});
  
client.login(realBotToken);
