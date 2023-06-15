import os 
import json

path_config = f"{os.path.dirname(__file__)}/db.json"

if (os.path.exists(path_config)):
   pass
else:
   with open(path_config, "w") as file:
      file.write("[]")
      file.close()

def adicionar_api(id, api):
   if(not usuario(id)):
      adicionar_usuario(id) 
   
   with open(path_config, "r") as file:
      lista = file.read()
      file.close()
      lista = json.loads(lista)
      for user in range(len(lista)):
         if (lista[user]["id"] == id):
            with open(path_config, "w") as file:
               lista[user]["openai_key"] = api
               file.write(json.dumps(lista))
               file.close()

def adicionar_usuario(id):
   if(usuario(id)):
      return 
   
   with open(path_config, "r") as file:
      lista = file.read()
      file.close()
      lista = json.loads(lista)
      lista.append({"id":id,"openai_key":""})
      with open(path_config, "w") as file:
         file.write(json.dumps(lista))
         file.close()

def usuario(id):
   with open(path_config, "r") as file:
      lista = file.read()
      lista = json.loads(lista)
      for target in lista:
         if (target["id"] == id):
            return True
      return False

def usuario_key(id):
   if(usuario(id)):
    with open(path_config, "r") as file:
      lista = file.read()
      lista = json.loads(lista)
      for target in lista:
         if (target["id"] == id):
            if (not target["openai_key"] == ""):
                return target["openai_key"]
      return False
      
