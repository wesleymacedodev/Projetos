import keyboard
import config
import time
import os
from time import sleep
from actions import image_locator, image_locator_center, image_locator_center_nowait, image_locator_nowait, screen_click

run = 0
start_time = time.time()

def info(function_name):
    global run, time
    run += 1
    os.system("cls")
    print(f"""
Mapa : {function_name}              
Ciclos : {run}
Tempo de execução : {format(((time.time() - start_time)/60), ".2f")} minutos
""")


class Map():
    def __init__(self, map_name, map_dificulty, map_mode):
        self.map_name = map_name
        self.map_dificulty = map_dificulty
        self.map_mode = map_mode
    
    def play(self):
        '''
        Localização do botão play
        '''
        return image_locator("./src/play/play.png")

    def next(self):
        '''
        Localização do botão next
        '''
        return image_locator_nowait('./src/play/next_map.png')

    def map(self):
        '''
        Localização do mapa
        '''
        return image_locator_nowait(f'./src/map/{self.map_name}/{self.map_name}.png')

    def mapDificulty(self):
        '''
        dificulty = easy/medium/hard - dificuldade do mapa
        '''
        return image_locator(f'./src/map/mode/{self.map_dificulty}/{self.map_dificulty}.png')

    
    def mapMode(self):
        '''      
        mode = deflation - modo de jogo
        '''  
        return image_locator(f'./src/map/mode/{self.map_dificulty}/{self.map_mode}.png')

    def mapOverwrite(self):
        '''
        Tela de sobrescrita de save
        '''
        return image_locator_nowait(f"./src/play/overwrite.png")
    
    def mapDeflation(self):
        '''
        Tela da pagina deflation
        '''
        return image_locator("./src/map/mode/easy/deflation_confirm.png")

    def mapConfirm(self):
        '''
        Botão de confirmação
        '''
        return image_locator_center(f"./src/play/ok.png")
    
    def mapStartGame(self):
        '''
        Imagem do botão de iniciar partida
        '''
        return image_locator_center(f"./src/play/start_game.png")
    
    def mapEventCollect(self):
        '''
        retorna o botão de coletar
        '''
        return image_locator_center_nowait("./src/play/collect.png")
    
    def mapEventCards(self):
        '''
        retorna posição da carta
        '''
        return image_locator_center_nowait("./src/play/card.png", grayscale=True)


    def mapPlay(self, multiply):
        '''
        Quantas vezes ira pressionar o botao play
        '''
        for i in range(multiply):
            keyboard.press_and_release(config.getMonkeyKey("playfast"))
            sleep(0.3)

    def mapVictory(self):
        '''
        Retorna imagem de vitoria
        '''
        return image_locator_nowait("./src/play/victory.png")

    def mapNext(self):
        '''
        Retorna imagem do botão next
        '''
        return image_locator_center_nowait("./src/play/next.png")

    def mapHome(self):
        '''
        Retorna o botão home
        '''
        return image_locator_center_nowait("./src/play/home.png")

    def monkeyPlace(self, monkey, location, delay = 1, upgrade=[0,0,0]):
        '''
        Posiciona o macacaco
        monkey : str - nome do macaco
        location : [int, int] - localização
        delay : int - tempo das ações
        upgrade : [int,int,int] - upgrades 
        '''
        sleep(delay)
        keyboard.press_and_release(config.getMonkeyKey(monkey))    
        sleep(delay)
        screen_click(self.monkeyCoords(x=location[0], y=location[1]))
        sleep(delay)
        screen_click(self.monkeyCoords(x=location[0], y=location[1]))
        self.monkeyUpgrade(upgrade[0], upgrade[1], upgrade[2])
        sleep(delay)

    
    
    def monkeyPath(self, path):
        '''
        Retorna o path do macaco atraves da imagem
        '''
        return image_locator_center(f'./src/map/{self.map_name}/{path}.png')

    def playerLevelUp(self):
        '''
        Retorna se o player subiu de nivel
        '''
        return image_locator_center_nowait(f"./src/play/levelup.png")
    

    def monkeyCoords(self, x, y):
        '''
        Retorna as coordenadas do macaco\n
        x,y - coordenadas do mouse 
        '''
        return [x,y]
    
    def monkeyUpgrade(self, path_1, path_2, path_3):
        paths = {
            "upgrade_1": path_1,
            "upgrade_2": path_2,
            "upgrade_3": path_3
        }
        for path in paths:
            for path_type in range(int(paths[path])):
                keyboard.press_and_release(config.getMonkeyKey(path))
                sleep(0.3)

    



                
    
