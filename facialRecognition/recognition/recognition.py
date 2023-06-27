# funcao que faz o reconhecimento dos rostos
import face_recognition as fr
import cv2
from recognition.bd import BD
# from bd import BD

class Recognition:
    def __init__(self):
        self.result = None
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
            # usando try e except tratamos esse erro retornando 10.
            # a ideia é que enquanto o valor de retorno for 10 ou None esse metodo
            # deve ser executado, até que ele me retorne algum valor como True ou False.

            # so salvamos no banco se o metodo estiver me retornando um valor
            # diferente de 10 ou None
           self.result = 10


    # POR ENQUANTO PEGAR APEBAS A ULTIMA FOTO REGISTRADA
    # DEPOIS TENTANTAR FAZER A COMPARAÇÃO COM TODOAS AS FOTOS
    def for_each_photo(self, img_cam):
        pessoas = self.fotos_bd.getPhotos() # [(id, nome, foto)]
        photo = pessoas[0][2]
        path_photo = "../" + photo[:-1]
        self.recognition(img_cam, path_photo)

        # verificar resultado para salvar notificaçao
        if self.result == True:
            self.fotos_bd.insertNotificationConhecido(
                f"{pessoas[0][1]} entrou no carro",
                pessoas[0][0]
            )

        elif self.result == False:
            self.fotos_bd.insertNotificationDesconhecido(
                "pessoa desconhecida entrou no carro"
            )
            

        # for p in pessoas:
        #     photo = p[1][:-1]
        #     path_photo = "../" + photo
        #     self.recognition(img_cam, path_photo)
        #     print(self.result)
