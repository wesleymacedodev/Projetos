import pygetwindow
import win32gui

def verifyWindow():
    '''Retorna se a tela do jogo existe (True, False)'''
    if pygetwindow.getWindowsWithTitle("BloonsTD6")[0] != []:
        return True
    return False

def getWindowRegionSize():
    '''Consiga o tamanho da tela do jogo'''
    if verifyWindow() == True:
        return pygetwindow.getWindowsWithTitle("BloonsTD6")[0]

def setWindow():
    '''Move a janela para o local de execução'''
    if verifyWindow() == True:
        hwnd = win32gui.FindWindow(None, "BloonsTD6")
        win32gui.MoveWindow(hwnd, 0,0, getWindowRegionSize().width, getWindowRegionSize().height,False)
