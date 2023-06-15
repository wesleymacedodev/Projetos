from discord.ext import commands
from db.main import usuario_key
import discord 

@commands.command()
async def perfil(ctx):
    def obfuscar(password):
        if(password):
            caracter = len(password)
            caracter_hide = round(caracter * 0.5)
            return (password[:caracter_hide]+("?"*(caracter-caracter_hide)))
        return "Não Encontrada."
    embed = discord.Embed(
        title="Perfil",
        description=f"Usuario : {ctx.author}\nAPI : {obfuscar(usuario_key(ctx.author.id))}",
        color=discord.Color(0xC132B8)
    )
    await ctx.send(embed=embed)

@perfil.error
async def api_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed = discord.Embed(
            title="Adiciona Algum Argumento.",
            description="comando <arg>",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_command(perfil)