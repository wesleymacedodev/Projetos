import tkinter as tk
from tkinter import ttk
from tkinter import filedialog
from ttkthemes import ThemedStyle
from PIL import Image, ImageTk
import os

window = tk.Tk()
window.title("Image Remover")
window.configure(background="#656565")

style = ThemedStyle(window)
style.set_theme("equilux")

folderPath = tk.StringVar()

index = 0
images = []

def selectFolder():
    global index, images 
    folderPath.set(filedialog.askdirectory())
    index = 0
    images = imageLoader()
    if len(images) > 0:
        imageDisplay(imageFrame, os.path.join(folderPath.get(), images[0]))

def imageLoader():
    files = os.listdir(folderPath.get())
    images = []
    extensions = [".jpg", ".png", ".jpeg"]
    for file in files:
        for extension in extensions:
            if file.endswith(extension):
                images.append(file)
    return images

def imageDisplay(frame, image):
    loadImage = Image.open(image)
    loadImage = loadImage.resize((300, 200))
    loadImage = ImageTk.PhotoImage(loadImage)
    frame.config(image=loadImage)
    frame.image = loadImage

def forwardImage():
    global index, images
    if index < len(images)-1:
        index += 1
        imageDisplay(imageFrame, os.path.join(folderPath.get(), images[index]))  

def backImage():
    global index, images
    if index > 0:
        index -= 1
        imageDisplay(imageFrame, os.path.join(folderPath.get(), images[index]))

def deleteImage():
    global index, images 
    if len(images) == 0: return
    os.remove(os.path.join(folderPath.get(), images[index]))
    images.pop(index)
    if index > 0:     
        index -= 1
    elif index < 0:
        index += 1
    if len(images) == 0: return
    imageDisplay(imageFrame, os.path.join(folderPath.get(), images[index]))

folderNameLabel = ttk.Label(window, textvariable=folderPath, width=15, font=("Arial", 17))
folderNameLabel.grid(row=0, column=0, columnspan=2, padx=10, pady=10, sticky="ew")

selectFolderButton = ttk.Button(window, text="Selecionar", command=selectFolder)
selectFolderButton.grid(row=0, column=2, padx=10, pady=10, sticky="ew")

imageFrame = ttk.Label(window)
imageFrame.grid(row=1, column=0, columnspan=3, padx=10, pady=10)

backButton = ttk.Button(window, text="Anterior", command=backImage)
backButton.grid(row=2, column=0, padx=(10,2), pady=10, sticky="ew")

deleteButton = ttk.Button(window, text="Apagar", command=deleteImage)
deleteButton.grid(row=2, column=1, padx=2, pady=10, sticky="ew")

forwardButton = ttk.Button(window, text="Proximo", command=forwardImage)
forwardButton.grid(row=2, column=2, padx=(2,10), pady=10, sticky="ew")




window.mainloop()
