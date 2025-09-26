const fs = require('fs')

const fquoted = {
    packSticker: {
        key: {
            fromMe: false,
            participant: "15517868411@s.whatsapp.net",
            remoteJid: "15517868411@s.whatsapp.net"
        },
        message: {
            stickerPackMessage: {
                stickerPackId: "\000",
                name: "l lízanámi ˗ˋˏ63ˎˊ˗⁩",
                publisher: "< リザナミ幹部? "
            }
        }
    }
};

module.exports = { fquoted };

let file = require.resolve(__filename)
require('fs').watchFile(file, () => {
  require('fs').unwatchFile(file)
  console.log('\x1b[0;32m'+__filename+' \x1b[1;32mupdated!\x1b[0m')
  delete require.cache[file]
  require(file)
})

