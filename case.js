//=== (  ✩ 🚀 Created By #! -VynnoxRzy No Delete Wm
//==  (  ✩ 🚀 Github: LexxyVdev
//==  (  ✩ 🚀 Youtube: https://www.youtube.com/@VynnoxRzyy
//==  (  ✩ 🚀 Tele: t.me/vynnoxrzy
//==  (  ✩ 🚀 Date: Fri 4-April
//==  (  ✩ 🚀 Note: Kembangkan Saja Kalo Mau jangan Apus Pembuat Base -_

require('./config/settings');
const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const jimp = require("jimp")
const util = require("util");
const crypto  = require("crypto")
const fetch = require("node-fetch")
const moment = require("moment-timezone");
const path = require("path")
const os = require('os');
const speed = require('performance-now')
const { spawn, exec, execSync } = require('child_process');
const { default: baileys, getContentType } = require("@vynnox/lyvineemine");
module.exports = vynnoxbeyours = async (vynnoxbeyours, m, chatUpdate, store) => {
    try {
        const body = (
            m.mtype === "conversation" ? m.message.conversation :
            m.mtype === "imageMessage" ? m.message.imageMessage.caption :
            m.mtype === "videoMessage" ? m.message.videoMessage.caption :
            m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
            m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
            m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
            m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
            m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
            m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
            m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId ||
            m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
        );
        
        const sender = m.key.fromMe ? vynnoxbeyours.user.id.split(":")[0] + "@s.whatsapp.net" ||
              vynnoxbeyours.user.id : m.key.participant || m.key.remoteJid;
        
        const senderNumber = sender.split('@')[0];
        const budy = (typeof m.text === 'string' ? m.text : '');
        const prefa = ["", "!", ".", ",", "🐤", "🗿"];

        const prefixRegex = /^[°zZ#$@*+,.?=''():√%!¢£¥€π¤ΠΦ_&><`™©®Δ^βα~¦|/\\©^]/;
        const prefix = prefixRegex.test(body) ? body.match(prefixRegex)[0] : '.';
        const from = m.key.remoteJid;
        const isGroup = from.endsWith("@g.us");
        const owner = JSON.parse(fs.readFileSync('./database/owner.json'));
        const botNumber = await vynnoxbeyours.decodeJid(vynnoxbeyours.user.id);
        const itsOwner = [botNumber, ...owner, ...global.onwer]
            .map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
            .includes(m.sender);
        const isBot = botNumber.includes(senderNumber)
        
        const isCmd = body.startsWith(prefix);
        const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
        const command2 = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
        const args = body.trim().split(/ +/).slice(1);
        const pushname = m.pushName || "No Name";
        const text = q = args.join(" ");
        const quoted = m.quoted ? m.quoted : m;
        const mime = (quoted.msg || quoted).mimetype || '';
        const qmsg = (quoted.msg || quoted);
        const isMedia = /image|video|sticker|audio/.test(mime);
        
        const { smsg, fetchJson, sleep, formatSize, runtime } = require('./l lízanámi/myfunction');

        // group
        const groupMetadata = m?.isGroup ? await vynnoxbeyours.groupMetadata(m.chat).catch(() => ({})) : {};
        const groupName = m?.isGroup ? groupMetadata.subject || '' : '';
        const participants = m?.isGroup ? groupMetadata.participants?.map(p => {
            let admin = null;
            if (p.admin === 'superadmin') admin = 'superadmin';
            else if (p.admin === 'admin') admin = 'admin';
            return {
                id: p.id || null,
                jid: p.jid || null,
                lid: p.lid || null,
                admin,
                full: p
            };
        }) || []: [];
        const groupOwner = m?.isGroup ? participants.find(p => p.admin === 'superadmin')?.jid || '' : '';
        const groupAdmins = participants.filter(p => p.admin === 'admin' || p.admin === 'superadmin').map(p => p.jid || p.id);
        const isBotAdmins = m?.isGroup ? groupAdmins.includes(botNumber) : false;
        const isAdmins = m?.isGroup ? groupAdmins.includes(m.sender) : false;
        const isGroupOwner = m?.isGroup ? groupOwner === m.sender : false;
        const senderLid = (() => {
            const p = participants.find(p => p.jid === m.sender);
            return p?.lid || null;
        })();
        
        if (isBot) {
            console.log('\x1b[30m--------------------\x1b[0m');
            console.log(chalk.bgHex("#4a69bd").bold(`▢ 新しいメッセージ`));
            console.log(
                chalk.bgHex("#ffffff").black(
                    `   ⚘ Tanggal: ${new Date().toLocaleString()} \n` +
                    `   ⚘ Pesan: ${m.body || m.mtype} \n` +
                    `   ⚘ Sender: ${pushname} \n` +
                    `   ⚘ JID: ${senderNumber} \n` +
                    `   ⚘ LID: ${senderLid || '-'}`
                )
            );
            console.log();
        }

            if (isGroup) {
                console.log(
                    chalk.bgHex("#ffffff").black(
                        `   ⌕ Group: ${groupName} \n` +
                        `   ⌕ GroupJid: ${m.chat}`
                    )
                );
            console.log();
         }

        async function nevreply(text) {
            vynnoxbeyours.sendMessage(m.chat, {
                text: text,
                contextInfo: {
                    mentionedJid: [sender],
                    externalAdReply: {
                        title: "¿? Cannie",
                        body: "This script was created by VynnoxRzy",
                        thumbnailUrl: "https://github.com/mp.png",
                        sourceUrl: 'https://api-cannie.xevenxyyvip.site',
                        renderLargerThumbnail: false,
                    }
                }
            }, { quoted: m })
        }

const pluginsLoader = async (directory) => {
    let plugins = [];
    const folders = fs.readdirSync(directory);
    folders.forEach(file => {
        const filePath = path.join(directory, file);
        if (filePath.endsWith(".js")) {
            try {
                const resolvedPath = require.resolve(filePath);
                if (require.cache[resolvedPath]) {
                    delete require.cache[resolvedPath];
                }
                const plugin = require(filePath);
                plugins.push(plugin);
            } catch (error) {
                console.log(`${filePath}:`, error);
            }
        }
    });
    return plugins;
};

const pluginsDisable = true;
const plugins = await pluginsLoader(path.resolve(__dirname, "./command"));
const plug = { 
    vynnoxbeyours,
    prefix,
    command, 
    nevreply,
    text, 
    itsOwner,
    isGroup: m.isGroup, 
    isPrivate: !m.isGroup, 
    pushname,
    isAdmins,
    groupMetadata
};

for (let plugin of plugins) {
    if (plugin.command && plugin.command.find(e => e == command.toLowerCase())) {
        if (plugin.owner && !itsOwner) {
            return nevreply(mess.owner);
        }
        
        if (plugin.group && !plug.isGroup) {
            return nevreply(mess.group);
        }
        
        if (plugin.private && !plug.isPrivate) {
            return nevreply(mess.private);
        }
        
        if (plugin.admin && !plug.isAdmins) {
            return nevreply(mess.admin);
        }

        if (typeof plugin === "function") {
            await plugin(m, plug);
        }
    }
}

if (!pluginsDisable) return;
        
        switch (command) {
            case 'menu': {
                let botInfo = `Hello Worlds`
                vynnoxbeyours.sendMessage(m.chat, {
                    image: { url: "https://files.catbox.moe/e94nfk.jpg" },
                    caption: botInfo,
                    contextInfo: {
                        mentionedJid: [m.sender],
                        forwardedNewsletterMessageInfo: {
                            newsletterName: "🕸⃟𝐍𝐞͢𝐯𝐚𝐫𝐢𝐚𝐇͢𝐮͠𝐧͢𝐭𝐞𝐫𝐗᷍𝐱𝐱͢͡",
                            newsletterJid: `idchlu@newsletter`
                        },
                        isForwarded: true,
                        externalAdReply: {
                            showAdAttribution: false,
                            renderLargerThumbnail: false,
                            gifPlayback: true,
                            gifAttribution: 1,
                            title: `🕸⃟𝐍𝐞͢𝐯𝐚𝐫𝐢𝐚𝐇͢𝐮͠𝐧͢𝐭𝐞𝐫𝐗᷍𝐱𝐱͢͡`,
                            body: `A simple WhatsApp bot uses JavaScript to respond to commands automatically.`,
                            mediaType: 1,
                            thumbnailUrl: `https://files.catbox.moe/e94nfk.jpg`,
                            thumbnail: ``,
                            sourceUrl: `serahlu`
                        }
                    }
                }, { quoted: m });
                break;
            }

            case 'buttonold': {
                let teks = `> ようこそ`;
                const buttons = [
                    {
                        buttonId: `${prefix}bugmenu`,
                        buttonText: { displayText: 'kosong' }
                    },
                    {
                        buttonId: `${prefix}menu`,
                        buttonText: { displayText: 'kosong' }
                    }
                ];

                const buttonMessage = {
                    image: { url: 'https://files.catbox.moe/msoysl.jpg' },
                    caption: teks,
                    footer: `Nǐ hǎo, nǐ gānggāng shǐyòngle zhǐlìngq ${prefix + command}`,
                    buttons: buttons,
                    headerType: 1,
                    viewOnce: true
                };

                await vynnoxbeyours.sendMessage(m.chat, buttonMessage, { quoted: m });
                break;
            }

            case 'eee': {
                let nevatxt = `> こんにちは、アドレス販売者が必要な場合は、最初に期間を選択してください`;
                const flowActions = [{
                    buttonId: 'action',
                    buttonText: { displayText: 'kosong' },
                    type: 4,
                    nativeFlowInfo: {
                        name: 'single_select',
                        paramsJson: JSON.stringify({
                            title: 'kosong',
                            sections: [{
                                title: 'kosong',
                                rows: [
                                    {
                                        header: 'kosong',
                                        title: 'kosong',
                                        description: 'kosong',
                                        id: `.buttonold`
                                    }
                                ]
                            }, {
                                title: 'kosong',
                                rows: [
                                    {
                                        header: 'kosong',
                                        title: 'kosong',
                                        description: 'kosong',
                                        id: `.buttonold`
                                    }
                                ]
                            }]
                        })
                    }
                }];

                const buttonMessage = {
                    image: { url: 'https://files.catbox.moe/msoysl.jpg' },
                    caption: nevatxt,
                    footer: `Nǐ hǎo, nǐ gānggāng shǐyòngle zhǐlìngq ${prefix + command}`,
                    buttons: flowActions,
                    headerType: 1,
                    viewOnce: true
                };

                await vynnoxbeyours.sendMessage(m.chat, buttonMessage, { quoted: m });
                break;
            }

            default:
        }
    } catch (e) {
        console.error(chalk.redBright("Error:"), e);
    }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright(`Update ${__filename}`));
    delete require.cache[file];
    require(file);
});
