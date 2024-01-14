const Discord = require('discord.js');
const axios = require('axios');
const { Client, Intents } = require('discord.js');

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const steamApiUrl = 'https://api.steampowered.com/ISteamApps/GetAppList/v2/';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.content === '!steam') {
        try {
            const response = await axios.get(steamApiUrl, { params: { key: process.env.STEAM } });
            // Steam APIの応答構造に応じてコードを調整する必要があります。
            // ここでは、response.data.gamesを使用していますが、これは仮の例です。
            const games = response.data.games; // 仮のレスポンスデータ構造
            let reply = 'Steamの人気ゲーム:\n';
            games.forEach(game => {
                reply += `${game.name}\n`; // ゲーム名を追加
            });
            message.channel.send(reply);
        } catch (error) {
            console.error(error);
            message.channel.send('エラーが発生しました。');
        }
    }
});

client.login(process.env.TOKEN);
