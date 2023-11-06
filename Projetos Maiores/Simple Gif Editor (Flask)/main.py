import os
from flask import Flask, render_template, request, send_file, after_this_request
import uuid
import gifUtils

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if(not os.path.exists("uploads")):
    os.makedirs("uploads")

def clearStatic():
    staticFolder = os.path.join(app.config["UPLOAD_FOLDER"])
    for files in os.listdir(staticFolder):
      os.remove(f"{staticFolder}/{files}")

@app.route("/")
def home():
    clearStatic()
    return render_template("index.html")

@app.route("/upload", methods=["GET", "POST"])
def upload():
    clearStatic()
    if(request.method == "POST"):
        file = request.files["file"]
        if(file):
            filename = str(uuid.uuid4())+".gif"
            fileLocation = os.path.join(app.config["UPLOAD_FOLDER"], filename)
            file.save(fileLocation)
            blur = request.form.get("blur")
            crop = request.form.get("crop")
            reverse = request.form.get("reverse")
            filter = request.form.get("filter")
            resize = request.form.get("resize")
            rotate = request.form.get("rotate")
            if(blur.isdigit()):
                blur = int(blur)
                gifUtils.blurGif(fileLocation, fileLocation, blur)
            if(crop == "on"):
                start_x = int(request.form.get("start_x"))
                start_y = int(request.form.get("start_y"))
                end_x = int(request.form.get("end_x"))
                end_y = int(request.form.get("end_y"))
                gifUtils.cropGif(fileLocation, fileLocation, start_x, start_y, end_x, end_y)
            if(reverse == "on"):
                gifUtils.reverseGif(fileLocation, fileLocation)
            if(filter in ["grayscale","invert"]):
                gifUtils.filterGif(fileLocation, fileLocation, filter)
            if(resize.isdigit()):
                resize = int(resize)
                if(resize >= 1 and resize <= 99):
                    gifUtils.resizeGif(fileLocation, fileLocation, resize)
            if(rotate.isdigit()):
                rotate = int(rotate)
                if(rotate >= -180 and rotate <= 180):
                    gifUtils.rotateGif(fileLocation, fileLocation, rotate)
            return send_file(fileLocation, as_attachment=True, mimetype='image/gif')
    return render_template("index.html")

if __name__ == '__main__':
    app.run("0.0.0.0", 5000, debug=True)
