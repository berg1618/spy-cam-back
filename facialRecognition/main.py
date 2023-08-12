#!/usr/bin/python3
import cv2
import threading
import time
import tempfile
import datetime

from recognition.recognition import Recognition

from recognition.modules import countTime, countSecondes


# declarar variaveis
HORA_DETECCAO = datetime.datetime.now()
ARQUIVO_TEMPORARIO = None
CAPTURAR_ROSTO = True
IGNORE_TIME = True # se essa variavel for True, realizaremos o reconhecinmento, sem esperar os 10 min


# instanciar a classe com o metodo de reconhecimento
# esta classe contem o atributo q me retornara o resultado
recog = Recognition()

haar_cascade_xml = 'haarcascade_frontalface_alt2.xml'

faceClassifier = cv2.CascadeClassifier(haar_cascade_xml)

# # iniciar a camera
capture = cv2.VideoCapture(0)
capture.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
capture.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)

while not cv2.waitKey(20) & 0xFF == ord('q'):
    try:

        ret, frame = capture.read()

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

        face = faceClassifier.detectMultiScale(gray)

        face_capture = []

        #criar retangulo que detecta rosto
        for x, y, w, h in face:
            face_capture = cv2.rectangle(frame, (x, y), (x + w, y + h), (0,0,255), 2)


        # rosto detectado, chamar a função de fazer reconhecimento
        if len(face_capture) > 0:

            # so chamar o metodo de reconhecimento depois de 10 min para evitar que
            # o algoritimo seja chamado o tempo todo, caso a msm pessoa ainda esteja la

            # Mas caso alguem saia e entre outra pessoa, queremos ignorar esse tempo de espera
            if (
                countTime(HORA_DETECCAO) >= 10 #  so depois de 10 min
                or IGNORE_TIME == True
                or recog.exe_processo_novamente == True): # o algoritimo deve ser chamado dnv
                
                with tempfile.NamedTemporaryFile(suffix='.jpg', delete=False) as temp_file:
                    ARQUIVO_TEMPORARIO = temp_file.name
                    cv2.imwrite(ARQUIVO_TEMPORARIO, frame)
            
        
                # so fzr o reconhecimento se ouver um arquivo
                # verificar se o arquivo nao esta corrompido
                if ARQUIVO_TEMPORARIO != None:
                    if ".jpg" in ARQUIVO_TEMPORARIO:
                        
                        # so devemos chamar a função de reconhecimento caso, nao haja nenhum processo rodando
                        # ele so pode ser executada quando o outro processo for encerrado
                        if recog.processo_ativo != True:
                            
                            recog.processo_ativo = True # nao permitir a execução de outro processo

                            thread = threading.Thread(target=recog.for_each_photo, args=[ARQUIVO_TEMPORARIO]).start()

                            HORA_DETECCAO = datetime.datetime.now()
                            ARQUIVO_TEMPORARIO = None
                            CAPTURAR_ROSTO = True
                            IGNORE_TIME = False
                            
        else:
            IGNORE_TIME = True

        # cv2.imshow('gray', gray)
        cv2.imshow('color', frame)

    except:
        print("erro")
    
recog.exe_processo = False # parar o algoritimo de reconhecimento

capture.release()
cv2.destroyAllWindows()