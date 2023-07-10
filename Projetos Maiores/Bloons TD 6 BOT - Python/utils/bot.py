import actions
import window
from time import sleep

class Bot:
    def __init__(self, game):
        self.game = game
    
    def selectMap(self):
            window.setWindow()
            for x in range(5):
                if(self.game.mapEventCollect()):
                    actions.screen_click(self.game.mapEventCollect())
                    for x in range(5):
                        if (self.game.mapEventCards()):
                            mapEventCards = self.game.mapEventCards()
                            for x in range(3):
                                actions.screen_click(mapEventCards)
                                sleep(1) 
                        sleep(0.2)
                sleep(0.2)
            if (self.game.play()):
                actions.screen_click(self.game.play())
            while (not self.game.map()):
                if (self.game.next()):
                    actions.screen_click(self.game.next())
                if (self.game.map()):
                    actions.screen_click(self.game.map())
                    break
            if (self.game.mapDificulty()):
                actions.screen_click(self.game.mapDificulty())
            if (self.game.mapMode()):
                actions.screen_click(self.game.mapMode())
            for x in range(10):
                if(self.game.mapOverwrite()):
                    actions.screen_click(self.game.mapConfirm())
                    break
                sleep(0.1)
            if (self.game.mapDeflation()):
                actions.screen_click(self.game.mapConfirm())

    def mapGameInteractions(self):
        if (self.game.mapStartGame()):
            self.game.mapPlay(2)
        while True:
            levelup = self.game.playerLevelUp()
            if(levelup):
                for x in range(4):
                    actions.screen_click(levelup)
                    sleep(1)
            victory = self.game.mapVictory()
            if(victory):
                actions.screen_click(self.game.mapNext())
            sleep(2)
            home = self.game.mapHome()
            if(home):
                actions.screen_click(home)
                break

