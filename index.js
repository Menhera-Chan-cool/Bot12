require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const poll = require('@features/poll')
const memberCount = require('@features/member-count')
const welcome = require('@features/welcome')
const mute = require('@features/mute')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const { loadLanguages } = require('@util/language')
const loadFeatures = require('@root/features/load-features')
const command = require('@util/command')

client.on('ready', async () => {
  console.log('The client is ready!')

  poll(client)
  memberCount(client)
  welcome(client)
  mute(client)
  loadCommands(client)
  commandBase.loadPrefixes(client)
  loadLanguages(client)
  loadFeatures(client)

  command(client, 'membercount', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')
    // "!status hello world" -> "hello world"

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })

})

client.login(process.env.TOKEN)