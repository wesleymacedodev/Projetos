import flask, json, os
from flask_cors import CORS
from time import time
from utils import createQrcode, readQrcode

app = flask.Flask(__name__)
CORS(app)

INPUT = "files\\input\\"
OUTPUT = "files\\output\\"

@app.route("/qrcode", methods=["GET", "POST"])
def qrcode():
    method = flask.request.method
    if method == "GET":
        text = flask.request.args.get("text")
        timestamp = int(str(time()).replace(".", ""))
        if text == "": return
        filePath = f"{OUTPUT}{timestamp}.png"
        createQrcode(text, filePath)
        return flask.send_file(filePath, mimetype="image/png")
    if method == "POST":
        timestamp = int(str(time()).replace(".", ""))
        image = flask.request.files['image']
        prefix = image.filename.split(".")[-1]
        path = f"{INPUT}{timestamp}.{prefix}"
        image.save(path)
        result = readQrcode(path)
        if result != None:
            return flask.jsonify({"response": result})
        else:
            return flask.jsonify({"error": "Não foi possivel ler o QRCode"})
    return flask.jsonify({"error", "Requisição invalida!"})

app.run("0.0.0.0", 5000)