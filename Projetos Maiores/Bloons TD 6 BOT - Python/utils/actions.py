import pyautogui
import keyboard

def screen_click(coords):
    '''
    coords - coordenadas que o mouse ira clicar
    '''
    pyautogui.click(coords)

def image_locator(img, region = [10, 33, 810, 630], grayscale = False, confidence = 0.8):
    '''
    Retorna as coordenadas da imagem esperando o valor
    img - imagem 
    region - região
    grayscale - tons cinzas
    '''
    value = pyautogui.locateOnScreen(image=img, region=region, grayscale=grayscale, confidence=confidence)
    while (value == None):
        value = pyautogui.locateOnScreen(image=img, region=region, grayscale=grayscale, confidence=confidence)
        if value != None:
            break
    return value

def image_locator_center(img, region = [10, 33, 810, 630], grayscale = False, confidence=0.8):
    '''
    Retorna as coordenadas do centro da imagem esperando o valor
    img - imagem 
    region - região
    grayscale - tons cinzas
    '''
    value = pyautogui.locateCenterOnScreen(image=img, region=region, grayscale=grayscale, confidence=confidence)
    while (value == None):
        value = pyautogui.locateCenterOnScreen(image=img, region=region, grayscale=grayscale, confidence=confidence)
        if value != None:
            break
    return value


def image_locator_nowait(img, region = [10, 33, 810, 630], grayscale = False, confidence = 0.8):
    '''
    Retorna as coordenadas da imagem
    img - imagem 
    region - região
    grayscale - tons cinzas
    '''
    return pyautogui.locateOnScreen(image=img, region=region, grayscale=grayscale, confidence=confidence)



def image_locator_center_nowait(img, region = [10, 33, 810, 630], grayscale = False, confidence=0.8):
    '''
    Retorna as coordenadas do centro da imagem
    img - imagem 
    region - região
    grayscale - tons cinzas
    '''
    return pyautogui.locateCenterOnScreen(image=img, region=region, grayscale=grayscale, confidence=confidence)

