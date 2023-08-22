import pyfiglet 
from flask import Flask, request
from flask_cors import CORS

app = Flask("Api")
CORS(app)

@app.route("/text", methods=["POST"])
def text():
    args = request.get_json()
    content = args["content"]
    font = args["font"]
    if font == "all":
        asciiArt = ""
        for i in pyfiglet.FigletFont.getFonts():
            asciiTemp = pyfiglet.Figlet(font=i, width=200).renderText(content)
            asciiArt += "".join(f"{i}\n{asciiTemp}")
    else:
        asciiArt = pyfiglet.Figlet(font=font, width=200).renderText(content) 
    res = app.make_response(asciiArt)
    return res



@app.route("/text/fonts", methods=["GET"])
def fonts():
    fonts = pyfiglet.FigletFont.getFonts()
    fonts.insert(0, "all")
    res = app.make_response(fonts)
    return res

app.run("0.0.0.0", 3333)


