import requests
import threading
import os
import time 

def _proxySave(type: str, proxy: list):
    fileName = f"{type} - {fileTime.tm_mday}-{fileTime.tm_mon}-{fileTime.tm_year} {fileTime.tm_hour}-{fileTime.tm_min}"
    if not os.path.exists("./results"):
        os.mkdir("results")
    with open(f"./results/{fileName}.txt", "a+") as file:
        file.write(f"{proxy}\n")

def proxyChecker(list: list, type: str, threadLimit: int=10, ApplicationInstance=None):
    global fileTime
    global maxThread
    fileTime = time.localtime()
    maxThread = threading.Semaphore(value=threadLimit)
    ApplicationInstance.HeaderStart["state"] = "disabled"
    ApplicationInstance.LeftSideHTTP["state"] = "disabled"
    ApplicationInstance.LeftSideSOCKS4["state"] = "disabled"
    ApplicationInstance.LeftSideSOCKS5["state"] = "disabled"
    ApplicationInstance.LeftSideCustomList["state"] = "disabled"
    ApplicationInstance.LeftSideLoadList ["state"] = "disabled"
    ApplicationInstance.LeftSideThreadsInput ["state"] = "disabled"
    threadList = []
    for proxy in list:
        thread = threading.Thread(target=_checker, args=(type, proxy, ApplicationInstance))
        threadList.append(thread)
        thread.start()
    for joinThread in threadList:
        joinThread.join()
    ApplicationInstance.HeaderTitle.config(text="Proxys Verificadas!")
    ApplicationInstance.HeaderStart["state"] = "normal"
    ApplicationInstance.LeftSideHTTP["state"] = "normal"
    ApplicationInstance.LeftSideSOCKS4["state"] = "normal"
    ApplicationInstance.LeftSideSOCKS5["state"] = "normal"
    ApplicationInstance.LeftSideCustomList["state"] = "normal"
    ApplicationInstance.LeftSideLoadList ["state"] = "normal"
    ApplicationInstance.LeftSideThreadsInput ["state"] = "normal"
    

def _checker(type: str, proxy: str, ApplicationInstance):
    maxThread.acquire()
    proxyValid = []
    if type == "http":
        proxies = {"http": f"http://{proxy}","https": f"https://{proxy}"}
    elif type == "socks4":
        proxies = {"http": f"socks4://{proxy}","https": f"socks4://{proxy}"}
    elif type == "socks5":
        proxies = {"http": f"socks5://{proxy}","https": f"socks5://{proxy}"}
    else: 
        raise "Tipo de proxy não encontrado!"
    try:
        proxyStatus = requests.get("http://www.google.com/", proxies=proxies, timeout=5).status_code
        if proxyStatus == 200:
            ApplicationInstance.consoleUpdate(f"{proxy} Valida!")
            proxyValid.append(proxy)
            _proxySave(type, proxy)
    except requests.RequestException:
        ApplicationInstance.consoleUpdate(f"{proxy} Invalida!")
    maxThread.release()

