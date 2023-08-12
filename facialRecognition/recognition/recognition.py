# funcao que faz o reconhecimento dos rostos
import face_recognition as fr
import cv2
from recognition.bd import BD
# from bd import BD
import time
import datetime
from recognition.modules import countTime


class Recognition:
    def __init__(self):
        self.result = None
        self.processo_ativo = False
        self.exe_processo = True
        self.exe_processo_novamente = False
        self.fotos_bd = BD()

    def recognition(self, pessoa_conhecida: str, img_camera: str):
        try:

            # pegar uma foto minha
            img_pessoa = fr.load_image_file(pessoa_conhecida)
            # imgClaudio = cv2.cvtColor(imgClaudio, cv2.COLOR_BGR2RGB)

            # a foto capturada pela camera
            img_cam = fr.load_image_file(img_camera)
            # imgCamera = cv2.cvtColor(imgCamera, cv2.COLOR_BGR2RGB)
            

            # retorna as codernadas do rosto
            localizar_rosto = fr.face_locations(img_pessoa)[0]
            cv2.rectangle(img_pessoa, (localizar_rosto[3], localizar_rosto[0], localizar_rosto[1], localizar_rosto[2]), (0, 255, 0), 2)

            # pegar pontos de indentificação na imagem
            encode_claudio = fr.face_encodings(img_pessoa)[0]  
           
            encode_img_camera = fr.face_encodings(img_cam)[0]

            compare = fr.compare_faces([encode_claudio], encode_img_camera)
            self.result = compare[0]

        except:
            # nem sempre o metodo conseguirá reconhecer que se trata de um rosto 
            # logo de primeira. Isso pode causar um erro.
            # usando try e except tratamos esse erro retornando None.
            # a ideia é que enquanto o valor de retorno for None, esse metodo
            # deve ser executado, até que ele me retorne algum valor como True ou False.

            # so salvamos no banco se o metodo estiver me retornando um valor
            # diferente de None
            self.result = None


   
    def for_each_photo(self, img_cam):
        DESCONHECIDOS = []
        pessoas = self.fotos_bd.getPhotos() # [(id, nome, foto)]
        pessoa_id = self.fotos_bd.verificarNotificacao() # verificar ultima notificacao
       
        i = 0
        t = 0
        while i < len(pessoas):

            photo = pessoas[i][2]
            path_photo = "../" + photo[:-1]

            time.sleep(0.2)
            self.recognition(img_cam, path_photo)
            print("...")

            if self.exe_processo == False:
                break
            
            if self.result == True or self.result == False:
                print(">>", self.result)
                DESCONHECIDOS.append(self.result)

                self.exe_processo_novamente = False

                i += 1
                t = 0
                # self.exe_processo_novamente = False

                if self.result == True:

                    # verificar se a pessoa que detectei e a mesma
                    # que acabei de registrar
                    # se ja tiver registrado essa pessoa, so faço a
                    # nova notificação depois de 10 min 
                    if pessoa_id[0][0] == pessoas[i-1][0]:

                        data_notif = pessoa_id[0][1]
                       
                        if countTime(data_notif) >= 10: # só depois de 10 min
                            self.fotos_bd.insertNotificationConhecido(
                                f"{pessoas[i-1][1]} entrou no carro",
                                pessoas[i-1][0]
                            )

                    else:
                        self.fotos_bd.insertNotificationConhecido(
                                f"{pessoas[i-1][1]} entrou no carro",
                                pessoas[i-1][0]
                            )
                
                    break # parar o programa ao detectar a pessoa
            
            else:
                # fotos meio desfocadas podem causar problemas na detecção dos pontos de reconhecimento
                # caso esteja ocorrendo muitos erros, parar o algoritimo
                t += 1
                if t >= 3:
                    self.exe_processo_novamente = True
                    break


        if True not in DESCONHECIDOS and len(DESCONHECIDOS) > 0:
            if pessoa_id[0][0] == None:
                # verificar se nao estou cadastrando a msm coisa de novo 
  
                data_notif = pessoa_id[0][1]
                if countTime(data_notif) >= 10: # cadastrar de novo só depois de 10 min

                    self.fotos_bd.insertNotificationDesconhecido(
                        "pessoa desconhecida entrou no carro"
                    )
            
            else:
                self.fotos_bd.insertNotificationDesconhecido(
                        "pessoa desconhecida entrou no carro"
                    )
           
        # processo finalizado
        self.processo_ativo = False # finalizar oprocesso
        self.result = None