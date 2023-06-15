import discord
from discord.ext import commands
import openai
from db.main import  usuario, usuario_key

chat_messages = {}

@commands.command()
async def chat(ctx, *,arg):
    if(usuario(ctx.author.id)):
        try:
            if arg == "(reset)":
                chat_messages[ctx.author.id] = {
                    "messages": []
                }
                embed = discord.Embed(
                    title="Chat Resetado!",
                    color=discord.Color.green()
                )
                await ctx.send(embed=embed)
                return
            if ctx.author.id not in chat_messages:
                chat_messages[ctx.author.id] = {
                    "messages": []
                }
            embed = discord.Embed(
                title=f"Prompt : {arg}",
                color=discord.Color(0xC132B8)
            )
            mensagem = await ctx.send(embed=embed)
            openai.api_key = usuario_key(ctx.author.id)
            
            chat_messages[ctx.author.id]["messages"].append({"role": "user", "content": arg})
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=chat_messages[ctx.author.id]["messages"],
            )

            response_bot = response.choices[0].message
            chat_messages[ctx.author.id]["messages"].append({"role": "system", "content": response_bot.content})
            
            tamanho_maximo = 4095

            if (len(response_bot.content) > tamanho_maximo):
                await mensagem.delete()
                for parte in range(0, len(response_bot.content), tamanho_maximo):
                    mensagem = response_bot.content[parte:parte+tamanho_maximo]
                    embed = discord.Embed(
                        title=f"Prompt : {arg}",
                        description=mensagem,
                        color=discord.Color(0xC132B8)
                    )
                    await ctx.send(embed=embed)
            else:
                embed = discord.Embed(
                    title=f"Prompt : {arg}",
                    description=response_bot.content,
                    color=discord.Color(0xC132B8)
                )

                await mensagem.edit(embed=embed)
        except Exception as e:
            if "empty message" in str(e):
                embed = discord.Embed(
                    title="Cadastre a API da OpenAI",
                    description=".api <string>",
                    color=discord.Color.red()
                )
                await ctx.send(embed=embed)
            if "maximum context length" in str(e):
                embed = discord.Embed(
                    title="Chegamos ao maximo de contexto, a API não está suportando!",
                    description=".chat (reset)",
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

@chat.error
async def exemplo_error(ctx, error):
    if isinstance(error, commands.MissingRequiredArgument):
        embed = discord.Embed(
            title="Adiciona Algum Argumento.",
            description="comando <arg>",
            color=discord.Color.red()
        )
        await ctx.send(embed=embed)

def setup(bot):
    bot.add_command(chat)
