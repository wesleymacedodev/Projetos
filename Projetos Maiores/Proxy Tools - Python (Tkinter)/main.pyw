from tkinter import *
from tkinter import filedialog
from threading import *
from scrapy import proxyscrapy
from scrapy import openproxyspace
from checker import checker
import os
        
class Application:
    def __init__(self, master=None):
        # Root 
        self.root = root 
        self.rows = 2
        self.columns = 2
        for x in range(self.rows): self.root.grid_rowconfigure(x, weight=30)
        for x in range(self.columns): self.root.grid_columnconfigure(x, weight=1)
        self.root.grid_rowconfigure(0, weight=1)
        self.root.geometry("300x200")
        self.root.minsize("300", "200")
        self.root.maxsize("500", "300")
        self.root.title("Proxy Tools")

        # Header 
        self.Header = Frame(master, height=100)
        self.Header.grid(row=0, column=0, columnspan=2, sticky="NSEW")
        self.Header.grid_rowconfigure(0, weight=1)
        self.Header.grid_columnconfigure(0, weight=1)
        self.Header.grid_columnconfigure(1, weight=1)
        self.HeaderTitle = Label(self.Header, text="Função : Scraper | Checker")
        self.HeaderTitle.grid(column=0,row=0, sticky="w")
        self.HeaderStart = Button(self.Header, text="Iniciar", command=self.startProcess)
        self.HeaderStart.grid(column=1, row=0, sticky="e")
        self.HeaderResult = Button(self.Header, text="Resultado", command=lambda: os.startfile(os.getcwd()))
        self.HeaderResult.grid(column=3, row=0, sticky="e")

        # LeftSide
        self.LeftSide = Frame(master)
        self.LeftSide.grid(row=1, column=0, sticky="NSEW")

        # LeftSide - Proxy Mode
        self.LeftSideRadioVar = StringVar(None, "http")
        self.LeftSideHTTP = Radiobutton(self.LeftSide, text="HTTP", variable=self.LeftSideRadioVar, value="http", command=None)
        self.LeftSideSOCKS4 = Radiobutton(self.LeftSide, text="SOCKS4", variable=self.LeftSideRadioVar, value="socks4", command=None)
        self.LeftSideSOCKS5 = Radiobutton(self.LeftSide, text="SOCKS5", variable=self.LeftSideRadioVar, value="socks5", command=None)
        self.LeftSideHTTP.grid(row=0, column=0, sticky="w")
        self.LeftSideSOCKS4.grid(row=1, column=0, sticky="w")
        self.LeftSideSOCKS5.grid(row=2, column=0, sticky="w")

        # LeftSide - Custom List
        self.LeftSideCustomListVar = BooleanVar(value=False)
        self.LeftSideCustomList = Checkbutton(self.LeftSide, text="Custom List", onvalue=True, offvalue=False ,variable=self.LeftSideCustomListVar, command=self.switchCustomList)
        self.LeftSideCustomList.grid(row=3, column=0, sticky="w")
        self.LeftSideLoadList = Button(self.LeftSide, text="Carregar", state="disabled", command=self.customListFile)
        self.LeftSideLoadList.grid(row=3,column=1)
        
        # LeftSide - Threads
        self.LeftSideThreadsLabel = Label(self.LeftSide, text="Threads")
        self.LeftSideThreadsLabel.grid(row=4, column=0)
        self.LeftSideThreadsVar = IntVar(value=20)
        self.LeftSideThreadsInput = Entry(self.LeftSide, width=6, textvariable=self.LeftSideThreadsVar)
        self.LeftSideThreadsInput.grid(row=4, column=1, sticky="w")

        # RightSide
        self.RightSide = Frame(master)
        self.RightSide.grid(row=1, column=1, sticky="NSEW")
        self.RightSide.columnconfigure(0, weight=1)
        self.RightSide.rowconfigure(0, weight=1)

        # RightSide - Console
        self.logs = []
        self.RightSideConsoleVar = Variable(value=self.logs)
        self.RightSideConsole = Listbox(self.RightSide, listvariable=self.RightSideConsoleVar, height=10)
        self.RightSideConsole.grid(column=0, row=0, sticky="SWEN")

    def startProcess(self):
        self.consoleClear()
        if self.LeftSideCustomListVar.get():
            threadProcess = Thread(
                target=lambda: checker.proxyChecker(
                self.archive.read().splitlines(),
                self.LeftSideRadioVar.get(),
                self.LeftSideThreadsVar.get(),
                MainApplication
                ), daemon=True)
            threadProcess.start()
        else:
            threadProcess = Thread(
                target=lambda: checker.proxyChecker(
                proxyscrapy.proxys(self.LeftSideRadioVar.get())+openproxyspace.proxys(self.LeftSideRadioVar.get()),
                self.LeftSideRadioVar.get(),
                self.LeftSideThreadsVar.get(),
                MainApplication
                ), daemon=True)
            threadProcess.start()

    def switchCustomList(self):
        if self.LeftSideCustomListVar.get() == True:
            self.LeftSideLoadList.config(state='normal')
            self.HeaderTitle.config(text="Função : File | Checker")
            self.HeaderStart.config(state="disabled")
        else:
            self.LeftSideLoadList.config(state='disabled')
            self.HeaderTitle.config(text="Função : Scraper | Checker")
            self.HeaderStart.config(state="normal")
    def customListFile(self):
        self.archive = filedialog.askopenfile()
        if self.archive:
            self.HeaderStart.config(state="normal")
    def consoleUpdate(self, args):
        if len(self.logs) > 200:
            self.logs.pop(0)
            self.logs.append(args)
            self.RightSideConsole.insert("end",args)
            self.RightSideConsole.delete(0, None)
            self.RightSideConsole.yview_scroll(1, "units")
        else:
            self.logs.append(args)
            self.RightSideConsole.insert("end",args)
            self.RightSideConsole.yview_scroll(1, "units")
    def consoleClear(self):
        self.logs = []
        self.RightSideConsole.delete(0, "end")

    

root = Tk()
MainApplication = Application(root)
root.mainloop()