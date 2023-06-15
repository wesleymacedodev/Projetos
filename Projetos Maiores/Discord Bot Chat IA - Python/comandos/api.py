from discord.ext import commands
from db.main import adicionar_api
import discord 

@commands.command()
async def api(ctx, arg):
    def obfuscar(password):
        caracter = len(password)
        caracter_hide = round(caracter * 0.5)
        return (password[:caracter_hide]+("?"*(caracter-caracter_hide)))
    embed = discord.Embed(
        title="Chave API Cadastrada!",
        description=f" Sua nova chave : {obfuscar(arg)}",
        color=discord.Color.green()
    )
    embed.set_footer(text=ctx.author)
    adicionar_api(ctx.author.id, arg)
    await ctx.message.delete()
    await ctx.send(embed=embed)

@api.error
async def api_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed = discord.Embed(
            title="Adiciona Algum Argumento.",
            description="comando <arg>",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_command(api)