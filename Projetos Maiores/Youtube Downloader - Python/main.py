import pytube
import os

# 19/07/2023

class YoutubeDownloader: 
    def playlist_download(self, url: str, video: bool):
        path = input("Qual o nome da pasta?")
        filter = ['\\','/',':','*','?','"','<','>','|']
        if video:
            playlist = pytube.Playlist(url)
            playlist_length = playlist.length
            for index, value in enumerate(pytube.Playlist(url)):
                for _ in range(5):
                    try:
                        name = pytube.YouTube(value).title
                        for format_name in filter:
                            name = name.replace(format_name,"")
                        self.video_download(value, f"./files/playlist/video/{path}", f"{index+1} - {name}")
                    except:
                        continue 
                    break
                print(f"Video {name}\nPosição : {index}/{playlist_length}")
            input("Download Completo")
            YoutubeMenu().main_menu()
        else:
            playlist = pytube.Playlist(url)
            playlist_length = playlist.length
            for index, value in enumerate(pytube.Playlist(url)):
                # Pytube Bug (15.0.0) - Sistema de "Retry"
                for _ in range(5):
                    try:
                        name = pytube.YouTube(value).title
                        for format_name in filter:
                            name = name.replace(format_name,"")
                        self.audio_download(value, f"./files/playlist/audio/{path}/", f"{index+1} - {name}")
                    except:
                        continue 
                    break
                print(f"Nome : {name}\nPosição : {index+1}/{playlist_length}")
            input("Download Completo")
            YoutubeMenu().main_menu()

    def video_download(self, url: str, path: str, name: str, itag: int= False) -> None:
        if itag:
            pytube.YouTube(url).streams.get_by_itag(itag).download(path, f'{name}.mp4', max_retries=3)
        else:
            pytube.YouTube(url).streams.get_highest_resolution().download(path, f'{name}.mp4', max_retries=3)

    def audio_download(self, url: str, path: str, name: str, itag: int = False) -> None: 
        if itag:
            pytube.YouTube(url).streams.get_by_itag(itag).download(path, name, max_retries=3)
        else:
            pytube.YouTube(url).streams.get_audio_only().download(path, name, max_retries=3)
        self.convert_mp3(name, path)

    def convert_mp3(self, name: str, path: str):
        os.system(f'ffmpeg -i "{path}{name}" -q:a 0 -vn "{path}{name}.mp3" > nul 2>&1', )
        os.remove(f"{path}{name}")

    def video_options(self, url: str) -> list:
        options = []
        for quality in pytube.YouTube(url).streams.order_by("resolution"):
            if quality.is_progressive:    
                options.append((quality.resolution, quality.itag))
        return options
    
    def audio_options(self, url: str) -> list:
        options = []
        for quality in pytube.YouTube(url).streams.filter(only_audio=True).order_by("abr"):
            options.append((quality.abr, quality.itag))
        return options[::-1]
    
class YoutubeMenu(YoutubeDownloader):
    def __init__(self) -> None:
        self.clear = lambda: os.system("cls")

    def main_menu(self):
        self.clear()
        print("Youtube Downloader")
        print("1 - Video Downloader")
        print("2 - Audio Downloader")
        choice = input("-> ")
        match choice:
            case '1':
                self.video_menu()
            case '2':
                self.audio_menu()
            case _:
                self.main_menu()

    def video_menu(self):
        self.clear()
        print("Video Downloader")
        print("1 - Video")
        print("2 - Video Playlist")
        print("0 - Voltar")
        choice = input("-> ")
        match choice:
            case "1":
                print("Adicione o link do video")
                link = input("-> ")
                video_quality = self.video_options(link)
                for index, value in enumerate(video_quality):
                    print(f'{index} - Resolução {value[0]}')
                quality = input("-> ")
                name = input("Nome : ")
                self.video_download(link, "./files/video/", name, video_quality[int(quality)][1])
                input("Download Completo")
                self.main_menu()
            case '2':
                print("Adicione o link da playlist do video")
                link = input("-> ")
                self.playlist_download(link, True)
                input("Download Completo")
                self.main_menu()
            case _:
                self.main_menu()

    def audio_menu(self):
        self.clear()
        print("Audio Downloader")
        print("1 - Audio")
        print("2 - Audio Playlist")
        print("0 - Voltar")
        choice = input("-> ")
        match choice:
            case "1":
                print("Adicione o link do video")
                link = input("-> ")
                audio = self.audio_options(link)
                for index, value in enumerate(audio):
                    print(f'{index} - {value[0]} Bits')
                quality = input("-> ")
                name = input("Nome : ")
                self.audio_download(link, "./files/audio/", name, audio[int(quality)][1])
                input("Download Completo")
                self.main_menu()
            case '2':
                print("Adicione o link da playlist do video")
                link = input("-> ")
                self.playlist_download(link, False)
                input("Download Completo")
                self.main_menu()
            case _:
                self.main_menu()

if __name__ == "__main__":
    YoutubeMenu().main_menu()