module.exports = {
    commands: ['deletechannel', 'delchannel'],
    permissionError: 'You must be an admin to use this command.',
    permissions: 'ADMINISTRATOR',
    description: 'Deletes the current channel.',
    callback: (message, arguments, text) => {
        message.channel.delete()
    },
}