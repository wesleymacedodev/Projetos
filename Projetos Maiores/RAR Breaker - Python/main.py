import os
import subprocess
import random
import string 
import math

WINRAR_PATH = "C:\\Program Files\\WinRAR\\UnRAR.exe"
FILE_OUTPUT = os.path.join(os.getcwd(), "files")
CARACTERES = string.ascii_letters+string.digits
WORDLIST_FILE = "wordlist.txt"

def maxCombinations(numItems, numPossibility):
    combinations = (math.factorial(numItems + numPossibility - 1)) / (math.factorial(numItems - 1) * math.factorial(numPossibility))
    return combinations

def passwordChecker(file, password):
    filename = os.path.basename(file)
    verifyMessage = "Senha incorreta para"
    cmd = subprocess.run(f"{WINRAR_PATH} x -p{password} \"{file}\" \"{FILE_OUTPUT}\\{filename}\\\"", capture_output=True, text=True)
    if cmd.stderr.find(verifyMessage) != -1:
        return False 
    else:
        return True 

def main():
    passwords = []
    print("""\
RAR Breaker
1 - Brute Force
2 - WordList\
""")
    option = input("> ")
    if option == '1':
        charactersLimit = int(input("Qual o limite de caracteres : ")) 
        file = input("Selecione o arquivo : ")
        combinations = maxCombinations(len(CARACTERES), charactersLimit)
        while len(passwords) < combinations:
            passwordGenerated = ''.join(random.choices(CARACTERES, k=charactersLimit))
            if passwordGenerated in passwords:
                continue
            passwords.append(passwordGenerated)
            if passwordChecker(file, passwordGenerated) == True:
                print(f"* Senha Valida ({passwordGenerated})")
                break
            else:
                print(f"- Senha Invalida ({passwordGenerated})")
    elif option == '2':
        file = input("Selecione o arquivo : ")
        with open(WORDLIST_FILE, "r") as words:
            for word in words.read().splitlines():
                if passwordChecker(file, word) == True:
                    print(f"* Senha Valida ({word})")
                    break
                else:
                    print(f"- Senha Invalida ({word})")
    else:
        main()

main()