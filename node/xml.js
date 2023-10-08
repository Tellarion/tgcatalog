const fs = require('fs')

const Sessions = require("./sessions")

const {Api, TelegramClient} = require('telegram');
const {StringSession} = require('telegram/sessions')
const {Select, Input, Password, AutoComplete} = require("enquirer")
const {NewMessage} = require("telegram/events")

const {Logger} = require("telegram/extensions")

Logger.setLevel("none")

const apiId = 25605624
const apiHash = '0c2bc4cb09f4094c91745cb86a4c43ff'

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

console.log('Добро пожаловать! Это бот XML generator!')

var getChannels = []

function startHandler() {

connection.query(`select * from catalog`, function (err, results, fields) {
    if(err) console.log(err)
    if(results.length >= 1) {
        getChannels = results
        let xmlFile = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
    xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">

        `

        const date = new Date().toISOString()

        for(let i = 0; i < getChannels.length; i++) {
            xmlFile += `
<url>
    <loc>https://tellarion.dev/${getChannels[i].username}</loc>
    <lastmod>${date}</lastmod>
    <priority>0.70</priority>
</url>
`
        }

        xmlFile += `
</urlset>`

        fs.writeFile(`idents.xml`, xmlFile, (err) => {
            if(err) console.log(err)
            console.log(`saved`)
        })
    } else {
        console.log('Ничего нет')
    }
})
}

startHandler()