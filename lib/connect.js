const NevariaConnect = async ({
    vynnoxbeyours,
    update,
    clientstart,
    DisconnectReason,
    Boom
}) => {
    global.idch = "120363384742227772@newsletter"
    const { connection, lastDisconnect } = update;

    if (connection === 'close') { 
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;

        if (reason === DisconnectReason.loggedOut) {
            await conn.logout();
        } else if (reason === DisconnectReason.restartRequired) {
            await clientstart();
        } else if (reason === DisconnectReason.timedOut) {
            clientstart();
        }
    } else if (connection === "open") {
    vynnoxbeyours.newsletterFollow(global.idch)
        console.log(update);
    }
};

module.exports = { NevariaConnect };
