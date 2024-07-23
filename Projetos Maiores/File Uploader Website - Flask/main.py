import flask 
import os

app = flask.Flask(__name__)
app.config["SECRET_KEY"] = "chave"
app.config["UPLOAD_FOLDER"] = "static\\files"

@app.route("/", methods=["GET", "POST"])
def home():
    if flask.request.method == "POST":

        downloadFile = flask.request.form.get("download")
        if downloadFile != None:
            return flask.send_file(os.path.join(app.config["UPLOAD_FOLDER"], downloadFile), as_attachment=True)

        removeFile = flask.request.form.get("remove")
        if removeFile != None:
            os.remove(os.path.join(app.config["UPLOAD_FOLDER"], removeFile))
            return flask.redirect("/")
        
        file = flask.request.files.get("file")
        if file != None:  
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename))
            return flask.redirect("/")

    arquivos = os.listdir(app.config["UPLOAD_FOLDER"])
    def fileStrip(file):
        extension = file.split(".")[-1]
        extension = extension if extension != file else "unknown"
        match extension:
            case "apk":
                extension = "apk.svg"
            case "zip" | "rar":
                extension = "compact.svg"
            case "exe":
                extension = "exe.svg"
            case "png" | "jpeg" | "jpg":
                extension = "image.svg"
            case "pdf":
                extension = "pdf.svg"
            case "txt":
                extension = "text.svg"
            case _:
                extension = "unknown.svg"
        return file, extension
    arquivos = list(map(fileStrip, arquivos))

    return flask.render_template("index.html", arquivos=arquivos)

app.run("0.0.0.0", 5000, debug=True)