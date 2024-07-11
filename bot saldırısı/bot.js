const mineflayer = require('mineflayer');
const proxyAgent = require('proxy-agent');
const chalk = require('chalk');
const readlineSync = require('readline-sync');

// Kullanıcıdan giriş bilgilerini alın
const host = readlineSync.question('Sunucu IP: ');
const port = readlineSync.question('Sunucu Port: ');
const version = readlineSync.question('Minecraft Versiyonu (1.19.4 veya 1.16.5): ');
const botInterval = parseInt(readlineSync.question('Kaç saniyede bir bot atılacak: '));
const duration = parseInt(readlineSync.question('Bot atma süresi (saniye): '));

console.log(chalk.green('Wozy-bots'));

let botCount = 0;
let startTime = Date.now();
let cpsInterval;
let timerInterval;

// Renkleri belirle
const colors = [chalk.green, chalk.red, chalk.magenta];

// Rastgele bir isim oluşturun
function generateRandomName() {
    return 'Bot_' + Math.random().toString(36).substring(7);
}

// Bot oluşturma fonksiyonu
function createBot() {
    const bot = mineflayer.createBot({
        host: host,
        port: port,
        version: version,
        username: generateRandomName(),
        agent: proxyAgent('http://your.proxy.server:8080') // Proxy kullanmak istiyorsanız
    });

    bot.on('spawn', () => {
        console.log(colors[Math.floor(Math.random() * colors.length)](`Bot ${bot.username} sunucuya katıldı`));
        
        // /register komutunu gönder
        bot.chat('/register Selam123123 Selam123123');
        // 3 saniye sonra ADAMM OLUN LAAANNN mesajını gönder
        setInterval(() => {
            bot.chat('ADAMM OLUN LAAANNN');
        }, 3000);
    });

    bot.on('end', () => {
        console.log(colors[Math.floor(Math.random() * colors.length)](`Bot ${bot.username} sunucudan ayrıldı`));
    });

    botCount++;
}

// CPS ve geri sayım göstergesi
function showCpsAndTimer() {
    cpsInterval = setInterval(() => {
        const elapsed = (Date.now() - startTime) / 1000;
        const cps = (botCount / elapsed).toFixed(2);
        console.log(`CPS: ${cps}`);
    }, 1000);

    let remainingTime = duration;
    timerInterval = setInterval(() => {
        remainingTime--;
        console.log(chalk.blue(`Kalan süre: ${remainingTime} saniye`));
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            clearInterval(cpsInterval);
            console.log(chalk.yellow('Bot oluşturma işlemi tamamlandı.'));
        }
    }, 1000);
}

// Botları belirli aralıklarla oluşturma
function startBotCreation() {
    const botCreationInterval = setInterval(() => {
        createBot();
    }, botInterval * 1000);

    setTimeout(() => {
        clearInterval(botCreationInterval);
    }, duration * 1000);
}

showCpsAndTimer();
startBotCreation();
