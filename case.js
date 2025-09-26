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
const { fquoted } = require('./fquoted');
const {
  default: baileys,
  proto,
  getContentType,
  jidNormalizedUser,
  generateWAMessageFromContent,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
} = require('@vynnox/lyvineemine');
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

        const time = moment().tz('Asia/Jakarta').format('HH:mm:ss');
        const datetime = moment()
          .tz('Asia/Jakarta')
          .format('dddd, MMMM D YYYY, h:mm:ss a');
        const jam = moment(Date.now())
          .tz('Asia/Jakarta')
          .locale('id')
          .format('HH:mm:ss z');
        const penghitung = moment()
          .tz('Asia/Jakarta')
          .format('dddd, D MMMM - YYYY');
        let ucapanWaktu;
        if (time >= '19:00:00' && time < '23:59:00') {
          ucapanWaktu = 'Good night! The stars are watching over you';
        } else if (time >= '15:00:00' && time < '19:00:00') {
          ucapanWaktu = 'Good afternoon! Have a wonderful evening';
        } else if (time >= '11:00:00' && time < '15:00:00') {
          ucapanWaktu = 'Hello! Let\'s have a great day today';
        } else if (time >= '06:00:00' && time < '11:00:00') {
          ucapanWaktu = 'Good morning! Let\'s do our best today';
        } else {
          ucapanWaktu = 'Enjoy the night! Enjoy the quiet of the night';
        }
        
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

        async function reply(text) {
  await vynnoxbeyours.sendMessage(m.chat, {
    eventMessage: {
      isCanceled: false,
      name: `${text} ${jam}`,
      description: `${ucapanWaktu}`,
      location: {
        degreesLatitude: 0,
        degreesLongitude: 0,
        name: `${jam}`
      },
      joinLink: "https://call.whatsapp.com/video/swèzestyèst1963",
      startTime: "1763019000",
      endTime: "1763026200",
      extraGuestsAllowed: false
    }
  }, { quoted: fquoted.packSticker });
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
            case 'menu':
{
  await vynnoxbeyours.sendMessage(m.chat, {
    interactiveMessage: {
      title: `
╭ ー、〔 𝐔𝐬𝐞𝐫 - 🫧 〕
│⚘ ᴜsᴇʀ : ${pushname}
╰──────────`,
      footer: `@vynnox/lyvineemine ˗ˋˏ63ˎˊ˗⁩ | ${time}`,
      thumbnail: "https://files.catbox.moe/frdbht.jpg",
      nativeFlowMessage: {
        messageParamsJson: JSON.stringify({
          limited_time_offer: {
            text: 'l lízanámi, since 1963',
            url: 't.me/lizanamii',
            copy_code: 'l lízanámi, since 1963',
            expiration_time: Date.now() * 99999,
          },
          bottom_sheet: {
            in_thread_buttons_limit: 2,
            divider_indices: [1, 2, 3, 4, 5, 999],
            list_title: 'l lízanámi',
            button_title: 'l lízanámi',
          },
          tap_target_configuration: {
            title: 'l lízanámi',
            description: 'bomboclard',
            canonical_url: 'https://shop.example.com/angebot',
            domain: 'shop.example.com',
            button_index: 0,
          },
        }),
        buttons: [
          {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              has_multiple_buttons: true,
            }),
          },
          {
            name: 'call_permission_request',
            buttonParamsJson: JSON.stringify({
              has_multiple_buttons: true,
            }),
          },
          {
            name: 'single_select',
            buttonParamsJson: JSON.stringify({
              title: 'l lízanámi',
              sections: [
                {
                  title: 'l lízanámi',
                  highlight_label: 'label',
                  rows: [
                    {
                      title: '@tqto',
                      description: `Support ${time}`,
                      id: '.tqto',
                    },
                    {
                      title: '@cmt',
                      description: `Create Mt Ban ${time}`,
                      id: '.cmt',
                    },
                    {
                      title: '@donasi',
                      description: `Donate ${time}`,
                      id: '.donasi',
                    },
                  ],
                },
              ],
              has_multiple_buttons: true,
            }),
          },
          {
            name: 'galaxy_message',
            buttonParamsJson: JSON.stringify({
              flow_message_version: '3',
              flow_token: 'unused',
              flow_id: '1775342589999842',
              flow_cta: 'l lízanámi',
              flow_action: {
                navigate: true,
                screen: 'AWARD_CLAIM',
                data: {
                  error_types: [
                    { id: '1', title: 'No llega' },
                    { id: '2', title: 'Diferente' },
                    { id: '3', title: 'Calidad' },
                  ],
                  campaigns: [
                    { id: 'campaign_1', title: 'Campaña 1' },
                    { id: 'campaign_2', title: 'Campaña 2' },
                    { id: 'campaign_3', title: 'Campaña 3' },
                  ],
                  categories: [
                    { id: 'category_1', title: 'Unicam' },
                    { id: 'category_2', title: 'Constantes' },
                    {
                      id: 'category_3',
                      title: 'Referidos',
                      'on-unselect-action': {
                        name: 'update_data',
                        payload: { subcategory_visibility: false },
                      },
                      'on-select-action': {
                        name: 'update_data',
                        payload: {
                          subcategories: [
                            { id: '1', title: '1 subcategory' },
                            { id: '2', title: '2 subcategory' },
                          ],
                          subcategory_visibility: true,
                        },
                      },
                    },
                  ],
                  subcategory_visibility: false,
                },
              },
              flow_metadata: {
                flow_json_version: 1000,
                data_api_protocol: 'Believe in yourself, anything is possible.',
                data_api_version: 9999999,
                flow_name: '𝟖𝟘𝟖 𝐍𝐞𝐜 🪽',
                categories: [],
              },
              icon: 'REVIEW',
              has_multiple_buttons: true,
            }),
          },
          {
            name: 'cta_copy',
            buttonParamsJson: JSON.stringify({
              display_text: 'l lízanámi',
              id: '123456789',
              copy_code: "@lizanamii/lizbailyesx",
            }),
          },
          {
            name: 'galaxy_message',
            buttonParamsJson: JSON.stringify({
              icon: 'REVIEW',
              flow_cta: '夜明け',
              flow_message_version: '3',
            }),
          },
          {
            name: 'galaxy_message',
            buttonParamsJson: JSON.stringify({
              icon: 'PROMOTION',
              flow_cta: 'レクシー',
              flow_message_version: '3',
            }),
          },
          {
            name: 'galaxy_message',
            buttonParamsJson: JSON.stringify({
              icon: 'DOCUMENT',
              flow_cta: '< リザナミ幹部? ',
              flow_message_version: '3',
            }),
          },
          {
            name: 'galaxy_message',
            buttonParamsJson: JSON.stringify({
              icon: 'DEFAULT',
              flow_cta: 'リザナミ',
              flow_message_version: '3',
            })
          }
        ]
      }
    }
  }, { quoted: fquoted.packSticker });
}
break;

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
