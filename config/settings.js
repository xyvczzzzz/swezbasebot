//=== (  ✩ 🚀 Created By #! -VynnoxRzy No Delete Wm
//==  (  ✩ 🚀 Github: LexxyVdev
//==  (  ✩ 🚀 Youtube: https://www.youtube.com/@VynnoxRzyy
//==  (  ✩ 🚀 Tele: t.me/vynnoxrzy
//==  (  ✩ 🚀 Date: Fri 4-April
//==  (  ✩ 🚀 Note: Kembangkan Saja Kalo Mau jangan Apus Pembuat Base -_

const fs = require('fs')
const chalk = require("chalk");

global.urlch = ""
global.status = true
global.onwer = ""
global.pairing = "VANNEYAX"

global.mess = {
    owner: "[ ! ] no, this is for owners only",
    group: "[ /\ ] this is for groups only", 
    private: "[ ^_^ ] this is specifically for private chat", 
    wait: "[ <> ] Await Mohon Menunggu", 
    done: "[ <> ] Succes..."
}

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
