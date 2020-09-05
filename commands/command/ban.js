module.exports = {
    commands: ['ban', 'banish'],
    permissionError: 'You must be an admin to use this command.',
    permissions: 'ADMINISTRATOR',
    description: 'ban a person.',
    expectedArgs: "<Target user's @>",
    callback: async (message) => {
     const {
         member,
         mentions
     } = message

     const tag = `<@${member.id}>`

     
         const target = mentions.users.first()
         if (target) {
             const targetMember = message.guild.members.cache.get(target.id)
             targetMember.ban()
             message.channel.send(`${tag} That user has been banned`)
         } else {
             message.channel.send(`${tag} Please specify someone to ban.`)
         }
      
     
    },
}