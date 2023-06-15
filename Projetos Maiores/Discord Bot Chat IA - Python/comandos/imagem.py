import openai
import discord
from discord.ext import commands
from db.main import usuario, usuario_key

@commands.command(aliases=["img", "image"])
async def imagem(ctx, *, arg):
    if(usuario(ctx.author.id)):
        try:
            embed = discord.Embed(
                title=f"Prompt : {arg}",
                color=discord.Color(0xC132B8)
            )
            mensagem = await ctx.send(embed=embed)
            openai.api_key = usuario_key(ctx.author.id)
            resposta = openai.Image.create(
                prompt=arg,
                size="1024x1024"
            )
            embed.set_image(url=resposta['data'][0]['url'])
            await mensagem.edit(embed=embed)
            
        except Exception as e:
            if 'Incorrect API key' in str(e):
                embed = discord.Embed(
                    title="API Invalida!",
                    color=discord.Color.red()
                )
                await ctx.send(embed=embed)
            elif 'Rate limit exceeded' in str(e):
                embed = discord.Embed(
                    title="Limite de Requisições Por Imagem Atingidas!",
                    description="Espere um pouco",
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

@imagem.error
async def imagem_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed = discord.Embed(
            title="Adiciona Algum Argumento.",
            description="comando <arg>",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_command(imagem)