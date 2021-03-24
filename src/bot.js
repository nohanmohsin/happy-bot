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

const topics = [
  'Who was your best friend in elementary school?', 'How often do you check your phone?', 'Records, tapes, CDs, MP3s, streaming. Which did you grow up with? What is good and bad about each?', 'What would you want your last meal to be if you were on death row?', 'What is your guilty pleasure?', 'What was the biggest thing you have ever won?', 'What are your plans for this weekend?', 'What did you do on your last vacation?', 'How much do you plan for the future?', 'What do you think about game shows? Do you have a favorite one?', 'Where is the most relaxing place you have been?', 'When was the last time you worked incredibly hard?', 'What foods do you absolutely hate?', 'What is your favorite cuisine or type of food?', 'What kind of interior do you like a restaurant to have?  ', 'Do you prefer traveling alone or with a group?', 'Who is your oldest friend? Where did you meet them?', 'Which season are you most active in?  ', 'What movie scene choked you up the most?', 'Do you prefer to go off the beaten path when you travel?', 'Who is your favorite athlete?'
]

const Discord = require('discord.js')
const client = new Discord.Client({
    partials: ['MESSAGE', 'REACTION', 'CHANNEL']
});
//games modules
const { tictactoe, hangman, chatBot } = require('reconlx')

//voice-channel modules
var discordjsVoicerole = require("discordjs-voicerole");
const { default: VoiceRoleManager } = require('discordjs-voicerole');

client.on('ready', ()=> {
    client.channels.fetch('821986130995576866')
    .then(channel => {
        channel.send("Hello there!");
    })
    client.user.setActivity("The Happy Team", {
      type: "LISTENING"
    })
    // fetch(`http://api.mediastack.com/v1/news?access_key=24dbc01b98da2b04eb20ede5a5ec9d38&countries=us,gb,de&date=${yr}-${monthNames.indexOf(mnth) + 1}-${dt}`)
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
        {name: `🎉**Events**`, value: `setup events or get roles to get notified for events you wanna join in
        **⚒ in development**`, inline: true},
        {name: `📝Suggestions`, value: `give us some suggestions to work on!!!feel free to say anything you need!!
        **1 command**`, inline: true},
        {name: `🕵️‍♂️Report`, value: `setup events or get roles to get notified for events you wanna join in
        **1 command**`, inline: true}
      )
      // .addFields(
        
      // )
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
    if(msg.channel.id == '824177838206353428'){
      if(msg.author.bot) return;
      else{
        chatBot(msg, msg.content)
      }
      
    }

    //topic command
    if(msg.content.toLowerCase().startsWith('+topic')){
      const randomNumber = Math.floor(Math.random() * 22) + 1 

      msg.channel.send(topics[randomNumber - 1])
    }

    //SUGGESTIONS section
    
    //suggest command
    if(msg.content.toLowerCase().startsWith('+suggest') && msg.channel.id === '822819962594000936'){
      const suggestionEmbed = new Discord.MessageEmbed()
      .setColor("#E7BB00")
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(msg.content.slice(8))
      client.channels.cache.get('822828028798697534').send(suggestionEmbed);
      msg.channel.send('Suggestion added successfully :3 thank you very much')
    }
    
    //mod-application command
    if(msg.content.toLowerCase().startsWith('+application') && msg.channel.id === '824193985668186112'){
      const modApplicationEmbed = new Discord.MessageEmbed()
      .setColor("#E7BB00")
      .setAuthor(msg.author.username, msg.author.displayAvatarURL())
      .setDescription(msg.content.slice(12))
      client.channels.cache.get('824195526085705729').send(modApplicationEmbed);
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
      client.channels.cache.get('822846283186044958').send(reportEmbed);
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
          channelID: '822888420912398406',
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

    //info mod command
    if(msg.content.toLowerCase().startsWith('+info mod')){
     
      
      const Members = msg.guild.members.cache.filter(mem => mem.roles.cache.find(role => role.id == '822075908231659550')).map(member => member.user.username);
      
      const modInfoEmbed = new Discord.MessageEmbed()
      .setTitle('Our Current Mods and Developers')
      .setColor('#E7BB00')
      .setDescription(Members.join('\n'))
      msg.channel.send(modInfoEmbed);
      

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
      client.channels.cache.get('824195526085705729').send(eventAddEmbed);
      msg.channel.send('event application added successfully :3 you will get a response soon')
    }
    
})
//welcome message
client.on('guildMemberAdd', member => {
    
    const channel = member.guild.channels.cache.find(ch => ch.name === 'welcome');
    if (!channel) return;
    channel.send(`Welcome to the server, ${member}`);
});
//react to roles
client.on('messageReactionAdd', (reaction, user) => {
  const { name } = reaction.emoji;
  const member = reaction.message.guild.members.cache.get(user.id);
  if (reaction.message.id === '822027595536400385') {
    switch (name) {
      case '☮️':
        member.roles.add('822075908231659550');
        break;
      case '🍇':
        member.roles.add('822076031128829972');
        break;
      case '🍏':
        member.roles.add('822076064892321852');
        break;
      case '🍑':
        member.roles.add('822076100502749225');
        break;
    }
  }
})
  
client.login(realBotToken);
