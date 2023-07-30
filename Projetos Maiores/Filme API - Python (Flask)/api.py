from flask import Flask, jsonify, request

app = Flask("Filmes")

movies = [
    {
        "name": "Spider Man",
        "id": 0
    },
    {
        "name": "Iron Man",
        "id": 1
    }, 
    {
        "name": "Hulk",
        "id": 2
    },
        {
        "name": "Doctor Strange",
        "id": 3
    }
]

@app.route("/movie", methods=["GET"])
def get_movie():
    return jsonify(movies)

@app.route("/movie", methods=["POST"])
def movie_add():
    request_body = request.get_json()
    movies.append(request_body)
    return request_body

@app.route("/movie/<int:id>", methods=["GET"])
def get_movie_id(id: int):
    for movie in movies:
        if movie.get("id") == id:
            return jsonify(movie)
    return jsonify({"error": "movie not found"})

@app.route("/movie/<int:id>", methods=["PUT"])
def movie_edit(id: int):
    request_body = request.get_json()
    for index, movie in enumerate(movies):
        if movie.get("id") == id:
            movies[index].update(request_body)
            return jsonify(movies[index])
    return jsonify({"error": "movie not found"})    

@app.route("/movie/<int:id>", methods=["DELETE"])
def movie_delete(id: int):
    for index, movie in enumerate(movies):
        if movie.get("id") == id:
            movie = movies[index]
            del movies[index]
            return jsonify(movie)
    return jsonify(movies)

app.run("localhost", 3000)