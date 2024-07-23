@echo off
set script_path="local_do_arquivo\main.py"
start /B "" "local_do_executavel_python\Python\Python310\pythonw.exe" %script_path% %*
