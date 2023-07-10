from utils.game_info import Map, info
from utils.bot import Bot
from time import sleep

def infernal_1():
    game = Map("infernal", "easy", "deflation")
    bot = Bot(game)
    while True:
        info("Infernal 1")
        sleep(3)
        bot.selectMap()
        game.monkeyPlace("sniper", location=[787,263], upgrade=[0,2,4])
        game.monkeyPlace("sniper", location=[746,307], upgrade=[1,3,0])
        game.monkeyPlace("alchemist", location=[783, 300], upgrade=[4,0,0])
        game.monkeyPlace("village", location=[768, 345], upgrade=[2,0,0])
        bot.mapGameInteractions()

def infernal_2():
    game = Map("infernal", "easy", "deflation")
    bot = Bot(game)
    while True:
        info("Infernal 2")
        sleep(3)
        bot.selectMap()
        game.monkeyPlace("sub", location=[227,422], upgrade=[2,0,4])
        game.monkeyPlace("sub", location=[587,157], upgrade=[2,0,4])
        game.monkeyPlace("wizard", location=[393, 383], upgrade=[0,3,2])
        game.monkeyPlace("wizard", location=[394, 213], upgrade=[0,3,2])
        bot.mapGameInteractions()
    