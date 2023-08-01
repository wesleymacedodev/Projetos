import tkinter as tk 
from tkinter import filedialog
import os
import time

class Application:
    def __init__(self, master=None):
        
        # Corpo da aplicação
        self.widget = tk.Frame(master)
        self.widget.pack(fill="both", expand=1, pady=10, padx=10)

        self.archive_labels = []

        # Cabeçalho da aplicação
        self.header = tk.Frame(self.widget)
        self.header.config(background='red')
        self.header.pack(fill="x")
        self.message = tk.Label(self.header, text=f"Selecione uma pasta", width=30, height=1)
        self.message.config()
        self.message.pack(side="left", expand=1, fill="both")
        self.button = tk.Button(self.header, text=f"Selecionar", width=18, padx=3, height=1, command=self.select_folder)
        self.button.config()
        self.button.pack(side="left")
        
        # Lado esquerdo
        self.left_side = tk.Frame(self.widget, width=100)
        self.left_side.config()
        self.left_side.pack(fill="both", side="left", expand=1)

        # Prefixo elemento
        self.prefix = tk.Frame(self.left_side)
        self.prefix.pack(anchor="nw")
        self.prefix_var = tk.IntVar()
        self.prefix_confirm = tk.Button(self.prefix, text="alterar", state="disabled", command=self.prefix_rename)
        self.prefix_confirm.pack(side="right")
        self.prefix_check_input = tk.Entry(self.prefix, state="disabled", width=20)
        self.prefix_check_input.pack(side="right")
        self.prefix_check = tk.Checkbutton(self.prefix, text="Prefixo", variable=self.prefix_var, command=lambda: self.enable(self.prefix_var, self.prefix_confirm, self.prefix_check_input))
        self.prefix_check.pack(side="left")

        # Sufixo elemento
        self.suffix = tk.Frame(self.left_side)
        self.suffix.pack(anchor="nw")
        self.suffix_var = tk.IntVar()
        self.suffix_confirm = tk.Button(self.suffix, text="alterar", state="disabled", command=self.suffix_rename)
        self.suffix_confirm.pack(side="right")
        self.suffix_check_input = tk.Entry(self.suffix, state="disabled", width=20)
        self.suffix_check_input.pack(side="right")
        self.suffix_check = tk.Checkbutton(self.suffix, text="Sufixo", variable=self.suffix_var, command=lambda: self.enable(self.suffix_var, self.suffix_confirm, self.suffix_check_input))
        self.suffix_check.pack(side="left")
        
        # Replace
        self.replace = tk.Frame(self.left_side)
        self.replace.pack(anchor="nw")
        self.replace_var = tk.IntVar()
        self.replace_check_input = tk.Entry(self.replace, state="disabled", width=20, textvariable=tk.StringVar(value="novo"))
        self.replace_check_input.pack(side="bottom")
        self.replace_check_input2 = tk.Entry(self.replace, state="disabled", width=20, textvariable=tk.StringVar(value="antigo"))
        self.replace_check_input2.pack(side="bottom")
        self.replace_check = tk.Checkbutton(self.replace, text="Renomear", variable=self.replace_var, command=lambda: self.enable(self.replace_var, self.replace_confirm, self.replace_check_input, self.replace_check_input2))
        self.replace_check.pack(side="left")
        self.replace_confirm = tk.Button(self.replace, text="alterar", state="disabled", command=self.replace_rename)
        self.replace_confirm.pack(side="left")

        # Parte das ações
        self.actions = tk.Frame(self.left_side)
        self.actions.pack(anchor="nw")
        self.actions_var = tk.IntVar()
        self.actions_check = tk.Checkbutton(self.actions, text="Ações", variable=self.actions_var, command=lambda: self.enable(self.actions_var, self.actions_uppercase, self.actions_lowercase, self.actions_capitalize))
        self.actions_check.pack(side="left")
        self.actions_uppercase = tk.Button(self.actions, text="UPPER", state="disabled", command=self.uppercase)
        self.actions_uppercase.pack(side="left")
        self.actions_lowercase = tk.Button(self.actions, text="lower", state="disabled", command=self.lowercase)
        self.actions_lowercase.pack(side="left")
        self.actions_capitalize = tk.Button(self.actions, text="Capitalize", state="disabled", command=self.capitalize)
        self.actions_capitalize.pack(side="left")

        # Parte da enumeração
        self.enumerate = tk.Frame(self.left_side)
        self.enumerate.pack(anchor="nw")
        self.enumerate_var = tk.IntVar()
        self.enumerate_check = tk.Checkbutton(self.enumerate, text="Enumerar", variable=self.enumerate_var, command=lambda: self.enable(self.enumerate_var, self.enumerate_choice, self.enumerate_check_input, self.enumerate_confirm))
        self.enumerate_check.pack(side="left")
        self.enumerate_check_input = tk.Entry(self.enumerate, state="disabled", width=20, textvariable=tk.StringVar(value="novo"))
        self.enumerate_check_input.pack(side="bottom")
        self.enumerate_confirm = tk.Button(self.enumerate, text="alterar", state="disabled", command=self.enumerate_item)
        self.enumerate_confirm.pack(side="left")
        self.enumerate_var2 = tk.StringVar()
        self.enumerate_var2.set("modo")
        self.enumerate_choice = tk.OptionMenu(self.enumerate, self.enumerate_var2, *["prefixo", "sufixo"])
        self.enumerate_choice.configure(state="disabled")
        self.enumerate_choice.pack(side="left")
        self.enumerate_commands = tk.Label(self.left_side, text="<num> => Variável do numero\n<day> => Variável do dia\n<month> => Variável do mês\n<year> => Variável do ano")
        self.enumerate_commands.pack(anchor="nw")

        # Aba de arquivos
        self.archives = tk.Frame(self.widget, width=20)
        self.archives.config()
        self.archives.pack(fill="both", side="right")
        self.yscrollbar = tk.Scrollbar(self.archives)
        self.yscrollbar.pack( side = "right", fill ="y" )
        self.xscrollbar = tk.Scrollbar(self.archives, orient="horizontal")
        self.xscrollbar.pack( side= "bottom", fill="x")
        self.archives_list = tk.Listbox(self.archives, yscrollcommand = self.yscrollbar.set, xscrollcommand= self.xscrollbar.set)
        self.archives_list.pack( side = "left", fill = "both" )
        self.yscrollbar.config( command = self.archives_list.yview )
        self.xscrollbar.config( command = self.archives_list.xview )

    def enumerate_item(self):
        template_string = self.enumerate_check_input.get()
        template_string = template_string.replace("<day>", str(time.gmtime().tm_mday))
        template_string = template_string.replace("<month>", str(time.gmtime().tm_mon))
        template_string = template_string.replace("<year>", str(time.gmtime().tm_year))
        for index, name in enumerate(os.listdir(self.archive)):
            template_string = template_string.replace("<num>", str(index+1))
            if self.enumerate_var2.get() == "prefixo":
                text, ext = os.path.splitext(name)
                os.rename(f"{self.archive}/{name}", f"{self.archive}/{template_string}{text}{ext}")
            elif self.enumerate_var2.get() == "sufixo":
                text, ext = os.path.splitext(name)
                os.rename(f"{self.archive}/{name}", f"{self.archive}/{text}{template_string}{ext}")
        self.archive_update()

    def capitalize(self):
        for name in os.listdir(self.archive):
            text, ext = os.path.splitext(name)
            os.rename(f"{self.archive}/{name}", f"{self.archive}/{text.capitalize()}{ext}")
        self.archive_update()

    def lowercase(self):
        for name in os.listdir(self.archive):
            text, ext = os.path.splitext(name)
            os.rename(f"{self.archive}/{name}", f"{self.archive}/{text.lower()}{ext}")
        self.archive_update()

    def uppercase(self):
        for name in os.listdir(self.archive):
            text, ext = os.path.splitext(name)
            os.rename(f"{self.archive}/{name}", f"{self.archive}/{text.upper()}{ext}")
        self.archive_update()

    def replace_rename(self):
        for name in os.listdir(self.archive):
            replaced_text = name.replace(self.replace_check_input2.get(), self.replace_check_input.get())
            os.rename(f"{self.archive}/{name}", f"{self.archive}/{replaced_text}")
        self.archive_update()
    
    def suffix_rename(self):
        for name in os.listdir(self.archive):
            text, ext = os.path.splitext(f"{name}")
            os.rename(f"{self.archive}/{name}",f"{self.archive}/{text}{self.suffix_check_input.get()}{ext}")
        self.archive_update()

    def prefix_rename(self):
        for name in os.listdir(self.archive):
            os.rename(f"{self.archive}/{name}",f"{self.archive}/{self.prefix_check_input.get()}{name}")
        self.archive_update()
    
    def enable(self, *args):
        for index, arg in enumerate(args):
            if args[0].get() == 1:
                if index == 0:
                    continue
                arg["state"] = "normal"
            else:
                if index == 0:
                    continue
                arg["state"] = "disabled"

    def select_folder(self):
        self.archive = filedialog.askdirectory()
        self.archive_update()

    def archive_update(self):
        if self.archive != "":
            self.message["text"] = self.archive
            self.clear_archives()
            for index, arc in enumerate(os.listdir(self.archive)):
                self.archives_list.insert("end", arc)
                self.archive_labels.append(index)
        
    def clear_archives(self):
        for arc in self.archive_labels:
            self.archives_list.delete(arc, 'end')

root = tk.Tk()
root.minsize(400,300)
root.maxsize(400,300)
root.title("File Tools")
Application(root)
root.mainloop()