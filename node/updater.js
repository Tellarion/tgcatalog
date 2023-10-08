const fs = require('fs')

const Sessions = require("./sessions")

const {Api, TelegramClient} = require('telegram');
const {StringSession} = require('telegram/sessions')
const {Select, Input, Password, AutoComplete} = require("enquirer")
const {NewMessage} = require("telegram/events")

const {Logger} = require("telegram/extensions")

Logger.setLevel("none")

const apiId = 123123132
const apiHash = ''

const cyrillicToTranslit = require('cyrillic-to-translit-js')
const {v4 : uuidv4} = require('uuid')
const { Base64 } = require('js-base64')

var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : '',
  user     : '',
  password : '',
  database : 'tgcatalog'
})
 
connection.connect()

function fullName(user) {
    if (user.lastName === undefined || user.lastName === null) {
        return user.firstName;
    }
    return user.firstName + " " + user.lastName;
}

async function newSession() {
    const ora = await (await import('ora')).default
    const spinner = ora('Loading');
    spinner.start();

    const stringSession = new StringSession('');
    const client = new TelegramClient(stringSession, apiId, apiHash, {connectionRetries: 5})
    await client.start({
        phoneNumber: async () => {
            spinner.stop();
            let res = await new Input({
                message: 'Phone number',
            }).run();
            spinner.start();
            return res;
        },
        password: async () => {
            spinner.stop();
            let res = await new Password({
                message: 'Password',
            }).run();
            spinner.start();
            return res;
        },
        phoneCode: async () => {
            spinner.stop();
            let res = await new Input({
                message: 'Code',
            }).run();
            spinner.start();
            return res;
        },
        onError: (err) => console.log(err),
    });
    spinner.stop();
    return {
        name: fullName(await client.getMe()),
        token: stringSession.save()
    }
}

async function runClient(token) {
    const ora = await (await import('ora')).default

    const spinner = ora('Loading chat list');
    spinner.start();


    const stringSession = new StringSession(token);
    const client = new TelegramClient(stringSession, apiId, apiHash, {connectionRetries: 5})
    await client.connect();

    spinner.stop()

    console.log('Добро пожаловать! Это бот апдейтер!')

    async function queueHandler() {
        console.log(`Update ${offsetItter}`)
        if(offsetItter == getChannelsCount) {
            clearInterval(timer)
            console.log('Следующие обновление через 6 часов')
            setTimeout(startHandler(), 3600000)
            offsetItter = 0
        } else {

            let detailChannel = null
            try {
                detailChannel = await client.invoke(
                    new Api.channels.GetFullChannel({
                    channel: getChannels[offsetItter].username,
                })
            )

            } catch(error) {
                console.log(`ID является баганным: #${getChannels[offsetItter].id}`)
            }
            
            sql = ``

            let indexData = {}
            indexData.tg = detailChannel
            indexData.custom = {}

            titleT = cyrillicToTranslit().transform(indexData.tg.chats[0].title)
            //$titleT = $titleT.replace(/ /g,'')

            aboutEncode = Base64.encode(indexData.tg.fullChat.about)

            sqlInsert = {
                title: `'${indexData.tg.chats[0].title}'`,
                titleT: `'${titleT}'`,
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
                participants: indexData.tg.fullChat.participantsCount
            }

            for(let i = 0; i < Object.keys(sqlInsert).length; i++) {
                let objectKey = Object.keys(sqlInsert)[i]
                let objectValue = Object.values(sqlInsert)[i]
                if(i == Object.keys(sqlInsert).length-1) {
                    sql += `${objectKey}=${objectValue}, updatedAt=CURRENT_TIMESTAMP()`
                } else {
                    sql += `${objectKey}=${objectValue}, `
                }
            }

            connection.query(`UPDATE catalog SET ${sql} where username = '${getChannels[offsetItter].username}'`, function (err2, results, fields) {
                if(err2) console.log(err2)
                console.log(`${getChannels[offsetItter].username} обновлен!`)
                offsetItter++
            })
        }
        return true
    }

    var getChannels = []
    var getChannelsCount = 0

    var offsetItter = 0

    var timer = null

    function startHandler() {
    
        connection.query(`select * from catalog`, function (err, results, fields) {
            if(err) console.log(err)
            if(results.length >= 1) {
                getChannels = results
                getChannelsCount = results.length
                console.log(getChannelsCount)
                timer = setInterval(queueHandler, 5000)
            } else {
                console.log('Ничего нет')
            }
        })
    }

    startHandler()
}

(async () => {
    let name = await new Select({
        message: 'Choose session',
        choices: [...Sessions.getList(), 'New']
    }).run();
    if (name === 'New') {
        let x = await newSession();
        name = x.name;
        Sessions.saveSession(x);
    }

    runClient(Sessions.getToken(name));
})()