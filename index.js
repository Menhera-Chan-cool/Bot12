require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const poll = require('@features/poll')
const memberCount = require('@features/member-count')
const welcome = require('@features/welcome')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const { loadLanguages } = require('@util/language')
const loadFeatures = require('@root/features/load-features')
const command = require('@util/command')
const mute = require('@features/mute')

client.on('ready', async () => {
  console.log(`Bot is Online Now!`)
  client.user.setActivity('Jojo\'s Adventure Is Bizarre', { type: 'PLAYING' })

  poll(client)
  memberCount(client)
  welcome(client)
  loadCommands(client)
  commandBase.loadPrefixes(client)
  loadLanguages(client)
  loadFeatures(client)
  mute(client)

  command(client, 'membercount', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

})

client.login(process.env.TOKEN)