const { Telegraf, Markup } = require('telegraf');
require('dotenv').config()

const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async ctx => {
    await ctx.reply('Вас вітає бот ЦПМСД Житомира');
   await bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}Головне меню',
    { 
        reply_markup: {
            inline_keyboard: [
               [
                    {text:'\u{2139}   Про нас', callback_data: 'about'},
                    {text:' \u{260E}  Сайт', url: 'envaki.github.io'}  
                ],
                [
                    {text:'\u{1F404}  Контакти', callback_data: 'contacts'},
                    {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'}  
                ],
                [
                    {text:'\u{1F608}Просто кнопка', callback_data: 'button'}
                ]
            ]
        }
    })
})
bot.on('message', ctx => {
    ctx.reply('я тебе не розумію, скористайся меню', {
        reply_markup: {
            inline_keyboard: [
                [
                    {text:'\u{2139}   Про нас', callback_data: 'about'},
                    {text:' \u{260E}  Сайт', url: 'envaki.github.io'}  
                ],
                [
                    {text:'\u{1F404}  Контакти', callback_data: 'contacts'},
                    {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'}  
                ],
                [
                    {text:'\u{1F608}Просто кнопка', callback_data: 'button'}
                ]
            ]
        }
    })
});

function btnAdder(name, text) {
    bot.action(name, async(ctx)=> {
        try {
            await ctx.answerCbQuery();
            await  ctx.replyWithHTML(text)
            await  bot.telegram.sendMessage(ctx.chat.id, 'Повернутися',
            { 
                reply_markup: {
                    inline_keyboard: [
                        [
                            {text:'До головного меню', callback_data: 'menu'},
                        ]
                    ]
                }
        })
        } catch(e) {
            console.error(e)
        }
    })
}

btnAdder('sait', text.sait)
btnAdder('contacts', text.contacts)
btnAdder('zapus', text.zapus)
btnAdder('button', text.button)





bot.action('about', async ctx => {
    try {
    await ctx.deleteMessage();
    await  ctx.replyWithHTML(text.onas)
    await bot.telegram.sendMessage(ctx.chat.id, 'Повернутися',
    { 
        reply_markup: {
            inline_keyboard: [
                [
                    {text:'До головного меню', callback_data: 'menu'},
                ]
            ]
        }
})
    } catch (e) {
        console.error(e)
    }
})
bot.action('menu', async ctx => {
    try {
        await ctx.deleteMessage();
        await bot.telegram.sendMessage(ctx.chat.id, '\u{1F3E3}Головне меню',
        { 
            reply_markup: {
                inline_keyboard: [
                   [
                    {text:'\u{2139}   Про нас', callback_data: 'about'},
                    {text:' \u{260E}  Сайт', url: 'envaki.github.io'}  
                ],
                [
                    {text:'\u{1F404}  Контакти', callback_data: 'contacts'},
                    {text:'\u{1F4DD}  Запис на прийом', url: 'https://portal-doctor.eleks.com/web/ml2zhytomyr/registration.html'}  
                ],
                [
                    {text:'\u{1F608}Просто кнопка', callback_data: 'button'}
                ]
                ]
            }
    })
    } catch (e) {
        console.error(e)
    }
})

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
