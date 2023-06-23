#!/usr/bin/python3
import cv2
import os
import threading
import time
from datetime import datetime

from recognition.recognition import Recognition

# declarar variaveis
PROCESSO_ATIVO = False
HORA_DETECCAO = 0
CADASTRAR_ROSTO = True


# instanciar a classe com o metodo de reconhecimento
# esta classe contem o atributo q me retornara o resultado
recog = Recognition()

haar_cascade_xml = 'haarcascade_frontalface_alt2.xml'

faceClassifier = cv2.CascadeClassifier(haar_cascade_xml)

# iniciar a camera
capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while not cv2.waitKey(20) & 0xFF == ord('q'):
    ret, frame = capture.read()

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    face = faceClassifier.detectMultiScale(gray)

    #criar retangulo que detecta rosto
    for x, y, w, h in face:
        face_capture = cv2.rectangle(frame, (x, y), (x + w, y + h), (0,0,255), 2)

        # detectar um rosto, chamar a função de fazer reconhecimento
        if len(face_capture) > 0:
            rosto = frame[y:y+h, x:x+w]

            cv2.imwrite("./fotos_teste/ft.jpg" , rosto)
           
        
    if PROCESSO_ATIVO == False:
        print('vai')
        PROCESSO_ATIVO = True
        time.sleep(1)
        thread = threading.Thread(target=recog.recognition, args=['./fotos_teste/ft.jpg', './clau.jpeg']).start()
 
        
    if recog.result != None:

        if recog.result != 0 and CADASTRAR_ROSTO == True:
        
            HORA_DETECCAO = datetime.now()
            
            print(">>", recog.result)
            CADASTRAR_ROSTO = False # so cadastraremos um novo rosto daqui a 10 min por ex.

            # chamar a funcao que salvará no banco
            # salvarNotificacao("fulano entrou no carro")

            #apagar a ft depois do reconhecimento facial
            caminho_arquivo = './fotos_teste/ft.png'
            if os.path.exists(caminho_arquivo):
                os.remove(caminho_arquivo)
                print("Arquivo excluído com sucesso.")
            else:
                print("O arquivo não existe.")
        
        else:
            # caso o resultado seja 0 significa que o metodo
            # nao conseguiu fazer o reconhecimento
            # entao queremos executar o metodo mais vezes
            PROCESSO_ATIVO = False


    # print(recog.result)

    # virificar se ja passaram os 10 min para poder
    # fazer uma nova identificação
    hora_atual = datetime.now()
    x = str(hora_atual - (HORA_DETECCAO or datetime.now()))[5:]
    hour = float(x)
    print(hour)
    if hour > 10:
        CADASTRAR_ROSTO = True
        PROCESSO_ATIVO = False


    # cv2.imshow('gray', gray)
    cv2.imshow('color', frame)
capture.release()
cv2.destroyAllWindows()