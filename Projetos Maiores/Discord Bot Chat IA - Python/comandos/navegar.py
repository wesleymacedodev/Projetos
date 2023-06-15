from discord.ext import commands
from db.main import usuario, usuario_key
import openai
import discord

@commands.command(aliases=["browser"])
async def navegar(ctx, *, arg):
    if (usuario(ctx.author.id)):
        try:
            embed = discord.Embed(
                title=f"Prompt : {arg}",
                color=discord.Color(0xC132B8)
            )
            mensagem = await ctx.send(embed=embed)
            openai.api_key = usuario_key(ctx.author.id)

            resposta = openai.Completion.create(
                model="text-davinci-003",
                prompt=arg,
                max_tokens = 4097 - len(arg),
                temperature = 0
            )
            embed.description = resposta['choices'][0]['text']
            await mensagem.edit(embed=embed)
        except Exception as e:
            if "empty message" in str(e):
                embed = discord.Embed(
                    title="Cadastre a API da OpenAI",
                    description=".api <string>",
                    color=discord.Color.red()
                )
                await ctx.send(embed=embed)
            else:
                embed = discord.Embed(
                    title=e,
                    color=discord.Color.red()
                )
                await ctx.send(embed=embed)
    else: 
        embed = discord.Embed(
            title="Cadastre a API da OpenAI",
            description=".api <string>",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)
    
@navegar.error
async def chatgpt_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed = discord.Embed(
            title="Adiciona Algum Argumento.",
            description="comando <arg>",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_command(navegar)
