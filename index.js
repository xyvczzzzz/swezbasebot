require("./config/settings");

const pino = require("pino");
const path = require('path');
const { Boom } = require("@hapi/boom");
const axios = require("axios");
const fs = require("fs");
const PhoneNumber = require("awesome-phonenumber");
const FileType = require("file-type");
const chalk = require('chalk');
const readline = require("readline");
const { 
    default: makeWASocket, 
    prepareWAMessageMedia, 
    removeAuthState,
    useMultiFileAuthState, 
    DisconnectReason, 
    fetchLatestBaileysVersion, 
    makeInMemoryStore, 
    generateWAMessageFromContent, 
    generateWAMessageContent, 
    generateWAMessage,
    jidDecode, 
    proto, 
    delay,
    relayWAMessage, 
    getContentType, 
    generateMessageTag,
    getAggregateVotesInPollMessage, 
    downloadContentFromMessage, 
    fetchLatestWaWebVersion, 
    InteractiveMessage, 
    makeCacheableSignalKeyStore, 
    Browsers, 
    generateForwardMessageContent, 
    MessageRetryMap 
} = require("@vynnox/lyvineemine");

const { smsg } = require("./lib/myfunc");
const getBuffer = async (url, options) => {
    try {
        options = options || {};
        const res = await axios({
            method: "get",
            url,
            headers: {
                'DNT': 1,
                'Upgrade-Insecure-Request': 1,
            },
            ...options,
            responseType: 'arraybuffer'
        });
        return res.data;
    } catch (err) {
        return err;
    }
};

const getSizeMedia = (path) => {
    return new Promise((resolve, reject) => {
        if (/http/.test(path)) {
            axios.head(path)
                .then((res) => {
                    let length = parseInt(res.headers['content-length']);
                    let size = exports.formatSize(length);
                    if (!isNaN(length)) resolve(size);
                })
                .catch(reject);
        } else if (Buffer.isBuffer(path)) {
            let length = Buffer.byteLength(path);
            let size = exports.formatSize(length);
            if (!isNaN(length)) resolve(size);
        } else {
            reject("error path tidak valid");
        }
    });
};

const formatSize = (bytes, si = true, dp = 2) => {
    const thresh = si ? 1000 : 1024;
    if (Math.abs(bytes) < thresh) {
        return bytes + ' B';
    }
    const units = si
        ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
        : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;
    do {
        bytes /= thresh;
        ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
    return bytes.toFixed(dp) + ' ' + units[u];
};

const {
    imageToWebp,
    videoToWebp,
    writeExifImg,
    writeExifVid,
} = require("./lib/watermark");

(async () => {
    const { version, isLatest } = await fetchLatestBaileysVersion();
    console.log(chalk.magenta(`-- Using WA v${version.join('.')}, isLatest: ${isLatest} --`));

    const pairingCode = true;

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const question = (text) => new Promise((resolve) => rl.question(text, resolve));

    async function clientstart() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState("session");
        const usePairingCode = true;

        const vynnoxbeyours = makeWASocket({
            printQRInTerminal: !usePairingCode,
            syncFullHistory: true,
            markOnlineOnConnect: true,
            connectTimeoutMs: 60000,
            defaultQueryTimeoutMs: 0,
            keepAliveIntervalMs: 10000,
            generateHighQualityLinkPreview: true,
            patchMessageBeforeSending: (message) => {
                const requiresPatch = !!(
                    message.buttonsMessage
                    || message.templateMessage
                    || message.listMessage
                );
                if (requiresPatch) {
                    message = {
                        viewOnceMessage: {
                            message: {
                                messageContextInfo: {
                                    deviceListMetadataVersion: 2,
                                    deviceListMetadata: {}
                                },
                                ...message
                            }
                        }
                    };
                }
                return message;
            },
            version,
            browser: ["Ubuntu", "Chrome", "20.0.04"],
            logger: pino({
                level: 'fatal'
            }),
            auth: {
                creds: state.creds,
                keys: makeCacheableSignalKeyStore(state.keys, pino().child({
                    level: 'silent',
                    stream: 'store'
                })),
            }
        });

        if (usePairingCode && !vynnoxbeyours.authState.creds.registered) {
            const phoneNumber = await question('Enter Your Number 62xxx');
            const code = await vynnoxbeyours.requestPairingCode(phoneNumber, global.pairing);
            console.log(`your pairing code: ${code}`);
        }

        const store = makeInMemoryStore({
            logger: pino().child({
                level: 'silent',
                stream: 'store'
            })
        });
        
        store.bind(vynnoxbeyours.ev);

        vynnoxbeyours.ev.on('messages.upsert', async chatUpdate => {
            try {
                let ciaa = chatUpdate.messages[0]
                if (!ciaa.message) return
                ciaa.message = (Object.keys(ciaa.message)[0] === 'ephemeralMessage') ? ciaa.message.ephemeralMessage.message : ciaa.message
                if (ciaa.key && ciaa.key.remoteJid === 'status@broadcast') return
                if (!vynnoxbeyours.public && !ciaa.key.fromMe && chatUpdate.type === 'notify') return
                let m = smsg(vynnoxbeyours, ciaa, store)
                require("./case")(vynnoxbeyours, m, chatUpdate, ciaa, store)
            } catch (err) {
                console.log(err)
            }
        })

        vynnoxbeyours.public = global.status
        
        vynnoxbeyours.ev.on('connection.update', (update) => {
            const { NevariaConnect } = require('./lib/connect')
            NevariaConnect({ vynnoxbeyours, update, clientstart, DisconnectReason, Boom })
        })

        vynnoxbeyours.decodeJid = (jid) => {
            if (!jid) return jid;
            if (/:\d+@/gi.test(jid)) {
                let decode = jidDecode(jid) || {};
                return decode.user && decode.server && decode.user + '@' + decode.server || jid;
            } else return jid;
        };

        vynnoxbeyours.ev.on('contacts.update', update => {
            for (let contact of update) {
                let id = vynnoxbeyours.decodeJid(contact.id);
                if (store && store.contacts) store.contacts[id] = { id, name: contact.notify };
            }
        });

        vynnoxbeyours.sendText = async (jid, text, quoted = '', options) => {
            vynnoxbeyours.sendMessage(jid, {
                text: text,
                ...options
            },{ quoted });
        }
            
        vynnoxbeyours.downloadMediaMessage = async (message) => {
            let mime = (message.msg || message).mimetype || "";
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, "") : mime.split("/")[0];
            const stream = await downloadContentFromMessage(message, messageType);
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            return buffer;
        };

        vynnoxbeyours.getFile = async (PATH, save) => {
            let res;
            let filename;
            let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,` [1], "base64") : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? ((filename = PATH), fs.readFileSync(PATH)) : typeof PATH === "string" ? PATH : Buffer.alloc(0);
            let type = (await FileType.fromBuffer(data)) || {
                mime: "application/octet-stream",
                ext: ".bin",
            };
            filename = path.join(__dirname, "./src/" + new Date() * 1 + "." + type.ext);
            if (data && save) fs.promises.writeFile(filename, data);
            return {
                res,
                filename,
                size: await getSizeMedia(data),
                ...type,
                data,
            };
        };

        vynnoxbeyours.sendMedia = async (jid, path, fileName = "", caption = "", quoted = "", options = {}) => {
            let types = await vynnoxbeyours.getFile(path, true);
            let { mime, ext, res, data, filename } = types;
            if ((res && res.status !== 200) || data.length <= 65536) {
                try {
                    throw {
                        json: JSON.parse(data.toString())
                    };
                } catch (e) {
                    if (e.json) throw e.json;
                }
            }
            let type = "",
                mimetype = mime,
                pathFile = filename;
            if (options.asDocument) type = "document";
            if (options.asSticker || /webp/.test(mime)) {
                let { writeExif } = require("./lib/watermark");
                let media = {
                    mimetype: mime,
                    data,
                };
                pathFile = await writeExif(media, {
                    packname: options.packname ? options.packname : global.packname,
                    author: options.author ? options.author : global.author,
                    categories: options.categories ? options.categories : [],
                });
                await fs.promises.unlink(filename);
                type = "sticker";
                mimetype = "image/webp";
            } else if (/image/.test(mime)) type = "image";
            else if (/video/.test(mime)) type = "video";
            else if (/audio/.test(mime)) type = "audio";
            else type = "document";
            await vynnoxbeyours.sendMessage(jid, {
                [type]: {
                    url: pathFile,
                },
                caption,
                mimetype,
                fileName,
                ...options,
            }, {
                quoted,
                ...options,
            });
            return fs.promises.unlink(pathFile);
        };

        vynnoxbeyours.ev.on('creds.update', saveCreds);
        vynnoxbeyours.serializeM = (m) => smsg(vynnoxbeyours, m, store);
        return vynnoxbeyours;
    }

    clientstart();

    let file = require.resolve(__filename)
    fs.watchFile(file, () => {
        fs.unwatchFile(file)
        console.log(chalk.redBright(`Update ${__filename}`))
        delete require.cache[file]
        require(file)
    })
})();
