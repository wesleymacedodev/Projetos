import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from src.map.infernal.infernal import *
from src.map.candyfalls.candyfalls import * 

options = {
    "maps": {
        "Infernal 1": {
            "requirements": "sniper - 0 2 4\nsniper - 1 3 0\nalchemist - 4 0 0\nvillage - 2 0 0\ntime : 5:20",
            "bot" : infernal_1
        },
        "Infernal 2": {
            "requirements": "2x sub - 2 0 4\n2x wizard - 0 3 2\ntime : 5:40",
            "bot" : infernal_2
        },
        "Candy Falls 1": {
            "requirements": "ninja - 4 0 1\nninja - 4 0 0\nvillage - 2 0 1\nalchemist - 3 0 1\nalchemist - 4 0 1\nbomb shooter 0 3 0\ntime : 5:28",
            "bot" : candyfalls_1
        }
    }
}

clear = lambda:os.system("cls")

def menu():
    clear()
    print("Bloons TD 6 BOT")
    for index, value in enumerate(options["maps"]):
        print("{0} - {1}".format(index, value))
    choice = int(input("Qual sua escolha ?" ))
    clear()
    option(choice)

def option(choice):
    for index, value in enumerate(options["maps"]):
        if choice == index:
            print("-"*20)
            print(value)
            print(options["maps"][value]["requirements"])
            bot = options["maps"][value]["bot"]
            print("-"*20)
    choice = input("Deseja continuar? (S/N) ")
    if(choice.upper() == "S"):
        bot()
    else:
        clear()
        menu()


menu()
