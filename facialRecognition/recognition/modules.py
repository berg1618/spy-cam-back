import datetime
import time

def countTime(horaIni):
    dataAgora = datetime.datetime.now()
    tempo = dataAgora - horaIni
    tempo_str = str(tempo).split(":")
    tempo_int = int(tempo_str[1])

    return tempo_int

def countSecondes(horaIni):
    dataAgora = datetime.datetime.now()
    tempo = dataAgora - horaIni
    tempo_str = str(tempo).split(":")
    seconds = tempo_str[2].split(".")[0]
    
    if seconds[0] == "0":
        tempo_int = int(seconds[1:])
        return tempo_int
    else:
        tempo_int = int(seconds)
        return tempo_int
