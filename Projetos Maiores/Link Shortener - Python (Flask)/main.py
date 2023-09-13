import flask, string, random, os, json

app = flask.Flask(__name__)
shortLinks = {}

class DB:
    def __init__(self):
        if not os.path.exists("./config.json"):
            with open("config.json", "w+") as file:
                file.write("{}")
    def save(self, url):
        with open("./config.json", "r") as file:
            oldFile = file.read()
            oldFile = json.loads(oldFile)
            oldFile.update(url)
            with open("./config.json", "w") as file:
                file.write(json.dumps(oldFile))
    def load(self):
        with open("./config.json", "r") as file:
            return json.loads(file.read())

def genShortUrl(length=10):
    characters = string.ascii_letters + string.digits
    shortCode = random.choices(characters, k=length)
    return "".join(shortCode)

@app.route("/", methods=["GET", "POST"])
def home():
    if flask.request.method == "POST":
        defaultUrl = flask.request.form.get("link")
        shortUrl = genShortUrl()
        DB().save({shortUrl: defaultUrl})
        shortLinks.update({shortUrl: defaultUrl})
        return flask.redirect(flask.url_for("showLink", link=f"{shortUrl}"))
    return flask.render_template("index.html", homePage=True)

@app.route("/show/")
def showLink():
    link = flask.request.args.get("link")
    formatedLink = f"{str(flask.request.url_root)}{link}"
    if link == None:
        return flask.redirect(flask.url_for("shortUrl", shortUrl=""))
    return flask.render_template("index.html", urlShort=formatedLink)

@app.route("/<shortUrl>")
def shortUrl(shortUrl):
    shortUrlLink = shortLinks.get(shortUrl)
    if shortUrlLink:
        return flask.redirect(shortUrlLink)
    else:
        return flask.render_template("404.html"), 404

@app.errorhandler(404)
def pageNotFoundHandler(error):
    return flask.render_template("404.html"), 404


if "__main__" == __name__:
    shortLinks = DB().load()
    app.run("0.0.0.0", 3001)