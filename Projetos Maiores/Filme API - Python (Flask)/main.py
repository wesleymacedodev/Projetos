import requests

api_url = 'http://localhost:3000'

def get_movies(id: int = False):
    if id: 
        return requests.get(f'{api_url}/movie/{id}').json()
    else:
        return requests.get(f'{api_url}/movie').json()
    
def edit_movie(movie_id: int, movie_name: str):
    return requests.put(f'{api_url}/movie/{movie_id}', json={"id": movie_id, "name": movie_name}).json()

def add_movie(movie_name: str):
    all_ids = [movie["id"] for movie in get_movies()]
    new_id = int(max(all_ids)+1)
    return requests.post(f'{api_url}/movie', json={"id": new_id, "name": movie_name}).json()

def remove_movie(movie_id: int):
    return requests.delete(f"{api_url}/movie/{movie_id}").json()

class Menu:
    def get_movies():
        print("Visualizar Filme")
        choice = input("1 - Visualizar todos os filmes\n2 - Visualizar pelo id\n-> ")
        if choice == "1":
            print(get_movies())
        else:
            movie_id = input("Qual o id do filme ?\n-> ")
            print(get_movies(movie_id))

    def edit_movie():
        print("Editar Filme")
        movie_id = input("Qual o id do filme ?\n-> ")
        movie_name = input("Qual o novo nome do filme ?\n-> ")
        print(edit_movie(movie_id, movie_name))

    def add_movie():
        print("Adicionar Filme")
        movie_name = input("Qual o nome do filme ?\n-> ")
        print(add_movie(movie_name))

    def remove_movie():
        print("Deletar Filme")
        movie_id = input("Qual o id do filme a ser deletado?\n-> ")
        print(remove_movie(movie_id))

def main():
    print(f"""
Manipular API
1 - Visualizar Filme
2 - Adicionar Filme
3 - Editar Filme
4 - Deletar Filme""")
    choice = input("-> ")
    if choice == "1":
        Menu.get_movies()
    elif choice == "2":
        Menu.add_movie()
    elif choice == "3":
        Menu.edit_movie()
    elif choice == "4":
        Menu.remove_movie()

while True:
    main()