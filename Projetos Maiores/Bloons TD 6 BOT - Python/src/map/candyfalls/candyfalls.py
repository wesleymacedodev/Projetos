from utils.game_info import Map, info
from utils.bot import Bot
from time import sleep

def candyfalls_1():
    game = Map("candyfalls", "easy", "deflation")
    bot = Bot(game)
    while True:
        info("Candy Falls")
        sleep(3)
        bot.selectMap()
        game.monkeyPlace("village", location=[224, 395], upgrade=[2,0,1])
        game.monkeyPlace("ninja", location=[237, 439], upgrade=[4,0,1])
        game.monkeyPlace("ninja", location=[201, 433], upgrade=[4,0,0])
        game.monkeyPlace("alchemist", location=[126, 395], upgrade=[3,0,1])
        game.monkeyPlace("alchemist", location=[294, 360], upgrade=[4,0,1])
        game.monkeyPlace("bombshooter", location=[222, 492], upgrade=[0,3,0])
        bot.mapGameInteractions()
