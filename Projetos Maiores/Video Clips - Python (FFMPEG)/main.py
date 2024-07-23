import tkinter as tk
from tkinter import messagebox
from tkinter import ttk
import sys, cv2, subprocess

class VideoClip:
    def __init__(self, root):
        self.root = root
        self.root.title("VideoClip")
        self.textColor = "#6B728E"
        self.backgroundColor = "#404258"
        self.inputColor = "#474E68"
        self.root.configure(background=self.backgroundColor)
        self.filePath = sys.argv[1]
        self.getVideoInfo()
        self.clipStart = tk.DoubleVar()
        self.clipStop = tk.DoubleVar()
        self.clipStop.set(self.duration)
        self.interface()

    def getVideoInfo(self):
        self.video = cv2.VideoCapture(self.filePath)
        self.frames = self.video.get(cv2.CAP_PROP_FRAME_COUNT)
        self.fps = self.video.get(cv2.CAP_PROP_FPS)
        self.duration = self.frames/self.fps
        self.video.release()

    def process(self):
        if self.duration < self.clipStop.get():
            messagebox.showerror("Erro", "A duração do video é menor que a do clip.")
            return
        elif self.clipStart.get() > self.clipStop.get():
            messagebox.showerror("Erro", "O inicio do clip é maior que o fim.")
            return
        elif self.clipStart.get() < 0:
            messagebox.showerror("Erro", "O inicio do clipe não pode ser menor que 0.") 
            return
        input = self.filePath
        output = self.filePath.split(".")[0] + "-VideoClip." + self.filePath.split(".")[1]
        ffmpegResize = ""
        resizeSize = int(self.comboBox.get()) 
        if resizeSize != 0:
            resizeSize = 100 - resizeSize
            ffmpegResize = f"-vf scale='iw*{resizeSize/100}:ih*{resizeSize/100}'"
        def convertTime(time):
            return f"{int(time) // 3600:02d}:{(int(time) % 3600) // 60:02d}:{int(time) % 60:02d}"
        ffmpegCrop = f"-ss {convertTime(self.clipStart.get())} -to {convertTime(self.clipStop.get())}"
        ffmpegCommand = f"ffmpeg -y -i \"{input}\" {ffmpegResize} {ffmpegCrop} \"{output}\""
        try:
            subprocess.run(ffmpegCommand, shell=True, check=True)
        except:
            messagebox.showerror("Erro", "Problema ao converter.")
        
        

    def interface(self):
        tk.Label(self.root, text=self.filePath, bg=self.backgroundColor, fg=self.textColor).grid(row=0, column=0, columnspan=4, sticky="ew")
        
        tk.Label(self.root, text=f"Duração : {self.duration:.2f}", anchor="w", bg=self.backgroundColor, fg=self.textColor).grid(row=1, column=0, columnspan=4, sticky="ew")
        
        tk.Label(self.root, text="Inicio", bg=self.backgroundColor, fg=self.textColor).grid(row=2, column=0, sticky="ew")
        tk.Entry(self.root, bg=self.inputColor, textvariable=self.clipStart).grid(row=2, column=1, sticky="ew")
        
        tk.Label(self.root, text="Fim", bg=self.backgroundColor, fg=self.textColor).grid(row=2, column=2, sticky="ew")
        tk.Entry(self.root, bg=self.inputColor, textvariable=self.clipStop).grid(row=2, column=3, sticky="ew")

        tk.Label(self.root, text="Reduzir", bg=self.backgroundColor, fg=self.textColor).grid(row=3, column=0, columnspan=1, sticky="ew")

        comboValues = [0, 25, 50, 75]
        self.comboBox = ttk.Combobox(self.root, values=comboValues)
        self.comboBox.grid(row=3, column=1, columnspan=3, sticky="ew")
        self.comboBox.set("0")
        
        tk.Button(self.root, text="Converter", bg=self.backgroundColor, fg=self.textColor, command=self.process).grid(row=4, column=0, columnspan=4, sticky="ew")

root = tk.Tk()
VideoClip(root)
root.mainloop()

