module.exports = {
    commands: 'serverinfo',
    description: 'info of the server',
    callback: (message) => {
        const { guild } = message

        const { name, region, memberCount, owner, afkTimeout } = guild
        const icon = guild.iconURL()

        const Discord = require('discord.js')
        const embed = new Discord.MessageEmbed()
          .setTitle(`Server info for "${name}"`)
          .setThumbnail(icon)
          .addFields(
            {
              name: 'Region',
              value: region,
            },
            {
              name: 'Members',
              value: memberCount,
            },
            {
              name: 'Owner',
              value: owner.user.tag,
            },
            {
              name: 'AFK Timeout',
              value: afkTimeout / 60,
            }
          )
    
        message.channel.send(embed)
    },
}