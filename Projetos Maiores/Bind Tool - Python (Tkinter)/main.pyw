import tkinter as tk
import keyboard
import os
import json
import threading

bindsContent = []


class Config():
    def __init__(self):
        self.bindList = []
        if(not os.path.exists("config.json")):
            with open("config.json", "w") as file:
                file.write("{}")

    def load(self, initialize=True):
        with open("config.json", "r") as file:
            binds = json.loads(file.read())
            for bind in binds.keys():
                if initialize:
                    self.bindList.append(keyboard.add_hotkey(
                        bind, self.__keyboard, args=(binds[bind],)))
                else:
                    bindsContent.append({bind: binds[bind]})
            return bindsContent

    def __keyboard(self, content):
        keyboard.write(content)

    def clear(self):
        if self.bindList:
            for i in self.bindList:
                keyboard.remove_hotkey(i)
            self.bindList.clear()

    def addBind(self, bind, content):
        with open("config.json", "r") as file:
            oldJson = json.loads(file.read())
            oldJson.update({bind: content})
        with open("config.json", "w") as file:
            file.write(json.dumps(oldJson))

    def removeBind(self, bind):
        with open("config.json", "r") as file:
            oldJson = json.loads(file.read())
            if(oldJson[bind]):
                oldJson.pop(bind)
        with open("config.json", "w") as file:
            file.write(json.dumps(oldJson))


class Application:
    def __init__(self, master=None, config=None):

        self.config = config
        self.bind = []
        self.bindElem = []
        self.capture = False
        self.thread = False

        self.main = tk.Frame(master)
        self.main.grid()
        self.textBind = tk.Label(self.main, text="Adicione uma bind", width=20)
        self.textBind.grid(column=0, row=0)
        self.buttonBind = tk.Button(
            self.main, text="BIND", command=self.bindKey)
        self.buttonBind.grid(column=1, row=0)
        self.inputBind = tk.Entry(self.main)
        self.inputBind.grid(column=0, columnspan=2, row=1, sticky='ew')
        self.submitBind = tk.Button(
            self.main, text="Adicionar", command=self.saveBind, state="disabled")
        self.submitBind.grid(column=0, columnspan=2, row=2, sticky='ew')
        self.loadBind()

    def bindKey(self):
        self.submitBind["state"] = "disabled"
        self.inputBind["state"] = "disabled"
        self.submitBind["state"] = "disabled"
        self.textBind["text"] = "ESC para cancelar"
        self.bind = []
        self.capture = True

        def keys(key):
            if self.capture:
                if key.name == "esc":
                    self.capture = False
                    self.textBind["text"] = "+".join(self.bind)
                    self.submitBind["state"] = "normal"
                    self.inputBind["state"] = "normal"
                    self.submitBind["state"] = "normal"
                else:
                    self.bind.append(key.name)
        if(not self.thread):
            self.thread = threading.Thread(
                target=lambda: keyboard.on_press(keys))
            self.thread.start()

    def saveBind(self):
        if(self.inputBind.get() == ""):
            return
        self.config.addBind(self.textBind["text"], self.inputBind.get())
        self.config.clear()
        self.config.load()
        self.clear()
        self.loadBind()

    def clear(self):
        for i in self.bindElem:
            i.destroy()
        self.bindElem.clear()
        self.config.clear()
        self.config.load()
        global bindsContent
        bindsContent.clear()

    def deleteBind(self, index, bind):
        self.bindElem[index].destroy()
        self.bindElem.pop(index)
        self.config.removeBind(bind)
        self.clear()
        self.loadBind()

    def loadBind(self):
        self.config.load(False)
        for index, elem in enumerate(bindsContent):
            self.componentBind = tk.Frame(self.main)
            self.componentBind.grid(sticky="ew", columnspan=3)
            self.componentBind.columnconfigure(0, weight=1)
            tk.Label(self.componentBind, text=f"{list(elem.keys())[0]} - {list(elem.values())[0]}").grid(
                row=0, column=0, sticky="w")
            delete_button = tk.Button(self.componentBind, text="Del", command=lambda x=index, y=list(
                elem.keys())[0]: self.deleteBind(x, y))
            delete_button.grid(row=0, column=1, sticky="e")
            self.bindElem.append(self.componentBind)


root = tk.Tk()
config = Config()
config.load()
root.grid_columnconfigure(2)
root.title("Bind Tool")
root.columnconfigure(0, weight=1)
root.rowconfigure(0, weight=1)
root.resizable(False, False)
root.geometry("-0+0")
Application(root, config)
root.mainloop()
