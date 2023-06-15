import discord
from discord.ext import commands
import os

intents = discord.Intents.default()
intents.messages = True

bot = commands.Bot(command_prefix=".", intents=intents, help_command=None)

@bot.event
async def on_ready():
    print(f'Bot em funcionamento!\nUsername : {bot.user}')
    await bot.change_presence(
        activity=discord.Activity(
        type=discord.ActivityType.listening,
        name=".ajuda - Veja meus comandos!"), 
        status=discord.Status.idle)

@bot.event
async def on_message(message):
    if message.author == bot.user:
        return

    await bot.process_commands(message)

for comandos in os.listdir("./discord_bot/comandos"):
    if comandos.endswith(".py"):
        bot.load_extension(f"comandos.{comandos[:-3]}")

bot.run('TOKEN')



