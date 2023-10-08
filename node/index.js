const Sessions = require("./sessions")

const {Api, TelegramClient} = require('telegram');
const {StringSession} = require('telegram/sessions')
const {Select, Input, Password, AutoComplete} = require("enquirer")
const {NewMessage} = require("telegram/events")

const {Logger} = require("telegram/extensions")

Logger.setLevel("none")

const apiId = 123123123
const apiHash = '0000'

/* MYSQL */

var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : 'tgcatalog'
})
 
connection.connect()

/* SOCKET IO */

const cyrillicToTranslit = require('cyrillic-to-translit-js')
const {v4 : uuidv4} = require('uuid')
const { Base64 } = require('js-base64')

const fs = require('fs')
const express = require('express')
const app = express()
const https = require('https')
var server = https.createServer({
    key: fs.readFileSync("privkey.pem"),
    cert: fs.readFileSync("cert.pem"),
}, app)

var io = require('socket.io')(server, {cors: {
    origin: "*",
    methods: ["GET", "POST"]
}})

server.listen(4000, function() {
    console.log('server up and running at %s port', 4000);
})

async function runClient(token) {
    const ora = await (await import('ora')).default

    const spinner = ora('Loading chat list');
    spinner.start();


    const stringSession = new StringSession(token);
    const client = new TelegramClient(stringSession, apiId, apiHash, {connectionRetries: 5})
    await client.connect();

    spinner.stop()

    const allChats = await client.getDialogs({})

    console.log('Добро пожаловать! Список доступных чатов:')

    allChats.forEach(element => {
        console.log(element.title)
    })

    io.on('connection', (socket) => {
    
        socket.on('addBase', async function (data) {
            let json = ""
            try {
                json = JSON.parse(data)
            } catch(error) {
                socket.emit('rw', "Неверный формат передачи данных")
            }
            
            if(json) {

                var RegExp = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\/])*)?/;

                if(!RegExp.test(json.name)) {

                    let detailChannel = {}

                    try {

                    detailChannel = await client.invoke(
                        new Api.channels.GetFullChannel({
                        channel: json.name,
                        })
                    )

                    } catch(error) {
                        socket.emit('rw', "Идентификатор не был определен")
                    }

                    let getTimeUnix = Date.now()
                    let uuidUnique = uuidv4()

                    const buffer = await client.downloadProfilePhoto(json.name)

                    console.log(buffer.length)

                    if(buffer.length == 0) {
                        let responseData = {}
                        responseData.tg = detailChannel
                        responseData.custom = {}
                        responseData.custom.avatar = `default.jpg`
                        socket.emit('getInfo', JSON.stringify(responseData))
                    } else {
                        fs.writeFile(`/var/www/tgcatalog/public/t1/a_${getTimeUnix}_${uuidUnique}.jpg`, buffer, (err) => {
                            if(err) console.log(err)
                            let responseData = {}
                            responseData.tg = detailChannel
                            responseData.custom = {}
                            responseData.custom.avatar = `a_${getTimeUnix}_${uuidUnique}.jpg`
                            socket.emit('getInfo', JSON.stringify(responseData))
                        })
                    }
                } else {
                    socket.emit('rw', "Ссылки запрещены. Указывайте идентификатор без них. Например: topor")
                }
            }
        })

        socket.on('addConfirmBase', async function (data) {

            let json = ""
            try {
                json = JSON.parse(data)
            } catch(error) {
                socket.emit('rw', "Неверный формат передачи данных")
            }

            connection.query(`select * from catalog where username = '${json.name}'`, async function (error, results, fields) {
                if (error) throw error;
                console.log(results.length)
                if(results.length == 0) {

                    let detailAddChannel = await client.invoke(
                        new Api.channels.GetFullChannel({
                          channel: json.name,
                        })
                    )
    
                    let getTimeUnix = Date.now()
                    let uuidUnique = uuidv4()
    
                    const buffer2 = await client.downloadProfilePhoto(json.name)
    
                    // buffer2 = if avatar cant save

                    function initialSave(detailAddChannel, avatar) {
                        let indexData = {}
                        indexData.tg = detailAddChannel
                        indexData.custom = {}
                        indexData.custom.avatar = (avatar) ? `s_${getTimeUnix}_${uuidUnique}.jpg` : `default.jpg`

                        const formatList = list => {
                            const [last = "", ...rest] = [...list].reverse();
                            return rest.length
                                ? [last, rest.reverse().join(", ")].reverse().join(", ")
                                : last;
                        };

                        titleT = cyrillicToTranslit().transform(indexData.tg.chats[0].title)
                        //$titleT = $titleT.replace(/ /g,'')

                        aboutEncode = Base64.encode(indexData.tg.fullChat.about)

                        $sqlInsert = {
                            title: `'${indexData.tg.chats[0].title}'`,
                            titleT: `'${titleT}'`,
                            username: `'${json.name}'`,
                            photo: `'${indexData.custom.avatar}'`,
                            about: `'${aboutEncode}'`,
                            verified: indexData.tg.chats[0].verified,
                            broadcast: indexData.tg.chats[0].broadcast,
                            megagroup: indexData.tg.chats[0].megagroup,
                            restricted: indexData.tg.chats[0].restricted,
                            min: indexData.tg.chats[0].min,
                            scam: indexData.tg.chats[0].scam,
                            slowmodeEnabled: indexData.tg.chats[0].slowmodeEnabled,
                            gigagroup: indexData.tg.chats[0].gigagroup,
                            fake: indexData.tg.chats[0].fake,
                            noforwards: indexData.tg.chats[0].noforwards,
                            blocked: indexData.tg.fullChat.blocked,
                            participants: indexData.tg.fullChat.participantsCount,
                            categoryId: json.categoryId
                        }

                        $sqlColumns = formatList(Object.keys($sqlInsert))
                        $sqlValues = formatList(Object.values($sqlInsert))

                        connection.query(`INSERT INTO catalog(${$sqlColumns}) VALUES (${$sqlValues})`, function (err2, results, fields) {
                            if(err2) {
                                socket.emit('rw', JSON.stringify(err2))
                            } else {
                                socket.emit('addInfo', JSON.stringify({status: true, message: `${indexData.tg.chats[0].title} добавлен в наш мониторинг!`}))
                            }
                        })
                    }

                    if(buffer2.length == 0) {
                        initialSave(detailAddChannel, false)
                    } else {
                        fs.writeFile(`/var/www/tgcatalog/public/s1/s_${getTimeUnix}_${uuidUnique}.jpg`, buffer2, (err) => {
                            if(err) console.log(err)
                            initialSave(detailAddChannel, true)
                        })
                    }

                } else {
                    socket.emit('rw', "В базе уже существует данный идентификатор")
                }
            })
        })
    
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })

    setInterval(async () => {
        const result = await client.invoke(new Api.account.UpdateStatus({
            offline: false,
        }));
    }, 10000)
}

runClient(Sessions.getToken('Tellarion'))