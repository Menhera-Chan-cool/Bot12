module.exports = {
    commands: ['kick'],
    permissionError: 'You must be an admin to use this command.',
    permissions: 'ADMINISTRATOR',
    expectedArgs: "<Target user's @>",
    description: 'kick a person.',
    callback: async (message) => {
        const {
            member,
            mentions
        } = message

        const tag = `<@${member.id}>`


        const target = mentions.users.first()
        if (target) {
            const targetMember = message.guild.members.cache.get(target.id)
            targetMember.kick()
            message.channel.send(`${tag} That user has been kicked`)
        } else {
            message.channel.send(`${tag} Please specify someone to kick.`)
        }


    },
}