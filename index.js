const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const clashApi = require('clash-of-clans-api');
const commands = require('./commands');

require('dotenv').config();

let clash;

const whatsapp = new Client({
    authStrategy: new LocalAuth()
});

whatsapp.initialize();

whatsapp.on('qr', (qr) => {
    qrcode.generate(qr, {small: true });
});

whatsapp.on('ready', () => {
    console.log('WhatsApp bot ready!');
    clash = clashApi({
        token: process.env.COC_API_TOKEN
    });
});

whatsapp.on('message', async (message) => {
    // const playerResponse = await clash.playerByTag('#QLRV8LVL2');
    await commands(whatsapp, message, clash);
});