import os
import json

def genConfig():
    '''Gera o arquivo (config.json) com as configurações padrões'''
    with open("config.json", "w") as file:
        config = {   "monkey_bind":
                    {
                    "sniper": "z",
                    "alchemist": "f",
                    "village": "k",
                    "sub": "x",
                    "wizard": "a",
                    "ninja": "d",
                    "bombshooter": "e",
                    "upgrade_1": ",",
                    "upgrade_2": ".",
                    "upgrade_3": ";",
                    "playfast": "space",

                    }
                }
        file.write(json.dumps(config))

def getMonkeyKey(monkey):
    '''
    monkey = nome do macaco\n
    Retorna a bind do macaco escolhido
    '''
    if(monkey):
        with open("config.json", "r") as file:
            file = file.read()
            file = json.loads(file)
            for value in file["monkey_bind"]:
                if(value == monkey):
                    return file["monkey_bind"][monkey]
            return False
    else:
        return False

if(not os.path.exists("./config.json")):
    genConfig()
