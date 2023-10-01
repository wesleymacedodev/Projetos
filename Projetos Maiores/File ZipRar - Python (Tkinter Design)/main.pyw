from pathlib import Path
from tkinter import Tk, Canvas, Entry, Text, Button, PhotoImage, Label, filedialog, messagebox
import zipfile, os, time, patoolib

OUTPUT_PATH = Path(__file__).parent
ASSETS_PATH = OUTPUT_PATH / Path(r".\assets\frame0")
BACKGROUND_COLOR = "#5D2B2B"
COLOR_2 = "#401E1E"
File_Type = True
path = "./"

def relative_to_assets(path: str) -> Path: return ASSETS_PATH / Path(path)
window = Tk()
window.title("File ZipRar")
window.geometry("400x175")
window.configure(bg = BACKGROUND_COLOR)

# MAIN SECTION
canvas = Canvas(window, bg = BACKGROUND_COLOR, height = 175, width = 400, bd = 0, highlightthickness = 0, relief = "ridge")
canvas.place(x = 0, y = 0)

# TITLE SECTION
canvas.create_rectangle(10.0, 10.0, 390.0, 49.0, fill=COLOR_2, outline="")
canvas.create_text(145.0, 16.0, anchor="nw", text="File ZipRar", fill="#FFFFFF", font=("LilitaOne", 24 * -1))

# PATH SECTION
canvas.create_rectangle(10.0, 68.0, 299.0, 110.0, fill=COLOR_2, outline="")
path_text = canvas.create_text(20.0, 76.0, anchor="nw", text="Caminho", fill="#FFFFFF", font=("LilitaOne", 24 * -1))

# PATH BUTTON
button_image_1 = PhotoImage(file=relative_to_assets("button_1.png"))
button_1 = Label(image=button_image_1, borderwidth=0, highlightthickness=0, relief="flat", cursor="hand2")
button_1.place(x=299.0, y=68.0, width=91.0, height=42.0)
button_1.bind("<Button-1>", lambda _: File_Select())

# ZIP BUTTON
button_image_2 = PhotoImage(file=relative_to_assets("button_2_active.png"))
button_2 = Label(image=button_image_2, borderwidth=0, highlightthickness=0, relief="flat", bg=BACKGROUND_COLOR, cursor="hand2")
button_2.place(x=215.0, y=129.0, width=73.0, height=29.0)
button_2.bind("<Button-1>", lambda _: Compress_Type(True))

# RAR BUTTON
button_image_3 = PhotoImage(file=relative_to_assets("button_3.png"))
button_3 = Label(image=button_image_3, borderwidth=0, highlightthickness=0, relief="flat", bg=BACKGROUND_COLOR, cursor="hand2")
button_3.place(x=310.0, y=129.0, width=76.0, height=29.0)
button_3.bind("<Button-1>", lambda _: Compress_Type(False))

# ACTION BUTTON
action = canvas.create_rectangle(10.0, 125.0, 193.0, 161.0, fill=COLOR_2, outline="")
action_button = canvas.create_text(55.0, 130, anchor="nw", text="Executar", fill="#FFFFFF", font=("LilitaOne", 24 * -1))
canvas.tag_bind(action, "<Enter>", lambda event: canvas.configure(cursor="hand2"))
canvas.tag_bind(action, "<Leave>", lambda event: canvas.configure(cursor=""))
canvas.tag_bind(action, "<Button-1>", lambda _: Compress_File())
canvas.tag_bind(action_button, "<Button-1>", lambda _: Compress_File())
canvas.tag_bind(action_button, "<Enter>", lambda event: canvas.configure(cursor="hand2"))
canvas.tag_bind(action_button, "<Leave>", lambda event: canvas.configure(cursor=""))

def Compress_Type(status):
    global File_Type
    File_Type = status
    if File_Type:
        button_image_2_src = PhotoImage(file=relative_to_assets("button_2_active.png"))
        button_image_3_src = PhotoImage(file=relative_to_assets("button_3.png"))
    else:
        button_image_2_src = PhotoImage(file=relative_to_assets("button_2.png"))
        button_image_3_src = PhotoImage(file=relative_to_assets("button_3_active.png"))
    button_2.configure(image=button_image_2_src)
    button_2.image = button_image_2_src
    button_3.configure(image=button_image_3_src)
    button_3.image = button_image_3_src

def File_Select():
    global path
    path = filedialog.askdirectory() or filedialog.askopenfilename() 
    if path: canvas.itemconfig(path_text, text=path[-22:])

def Compress_File():
    global path
    if path == "./": return 
    if os.path.isdir(path):
        if File_Type:
            with zipfile.ZipFile(f"./zip_{time.strftime('%d-%m-%Y-%H-%M-%S', time.localtime())}.zip", "w") as archive:
                for raiz, diretorios, arquivos in os.walk(path):
                    for arquivo in arquivos:
                        caminho_completo = os.path.join(raiz, arquivo)
                        caminho_relativo = os.path.relpath(caminho_completo, path)
                        archive.write(caminho_completo, caminho_relativo)
        else:
            arquivos_e_diretorios = []
            for pasta_atual, subpastas, arquivos in os.walk(path):
                for arquivo in arquivos:
                    caminho_completo = os.path.join(pasta_atual, arquivo)
                    print(arquivo)
                    arquivos_e_diretorios.append(caminho_completo)
            patoolib.create_archive(f"./rar_{time.strftime('%d-%m-%Y-%H-%M-%S', time.localtime())}.rar", arquivos_e_diretorios, interactive=False)
    if os.path.isfile(path):
        match os.path.splitext(path)[1]:
            case ".zip":
                with zipfile.ZipFile(path, "r") as archive:
                    archive_directory = f"{os.path.splitext(path)[0]}/"
                    archive.extractall(archive_directory)
                    os.system(f"explorer {os.path.abspath(archive_directory)}")
            case ".rar":
                archive_directory = f"{os.path.splitext(path)[0]}/"
                patoolib.extract_archive(path, outdir=os.path.dirname(path), verbosity=0, interactive=False)
                os.system(f"explorer {os.path.abspath(archive_directory)}")
            case _:
                return    
    
window.resizable(False, False)
window.mainloop()
