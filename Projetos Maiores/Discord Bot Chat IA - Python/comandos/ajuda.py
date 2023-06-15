import discord
from discord.ext import commands

@commands.command(aliases=["help"])
async def ajuda(ctx):
    embed = discord.Embed(
        title="Comandos",
        color=discord.Color(0xC132B8)
    )

    embed.add_field(name=".ajuda", value="mostra todos os comandos.", inline=False)
    embed.add_field(name=".chat <arg>", value="converse com a IA.", inline=False)
    embed.add_field(name=".chat (reset)", value="limpa o contexto da conversa (interações antigas).", inline=False)
    embed.add_field(name=".navegar <arg>", value="faz uma pesquisa utilizando seu prompt.", inline=False)
    embed.add_field(name=".imagem <arg>", value="gera uma imagem utilizando seu prompt.", inline=False)
    embed.add_field(name=".perfil", value="veja o seu perfil.", inline=False)
    embed.add_field(name=".api <arg>", value="cadastra api no bot.", inline=False)
    await ctx.send(embed=embed)


def setup(bot):
    bot.add_command(ajuda)
