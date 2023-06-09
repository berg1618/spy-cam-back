import cv2
import os



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

    # criar retangulo que detecta rosto
    for x, y, w, h in face:
        face_capture = cv2.rectangle(frame, (x, y), (x + w, y + h), (0,0,255), 2)

        # detectar um rosto, chamar a função de fazer reconhecimento
        if len(face_capture) > 0:
            rosto = frame[y:y+h, x:x+w]

            cv2.imwrite("./fotos_teste/ft.png" , rosto)
        


    # cv2.imshow('gray', gray)
    cv2.imshow('color', frame)
capture.release()
cv2.destroyAllWindows()
#apagar a ft depois do reconhecimento facial

caminho_arquivo = './fotos_teste/ft.png'
if os.path.exists(caminho_arquivo):
    os.remove(caminho_arquivo)
    print("Arquivo excluído com sucesso.")
else:
    print("O arquivo não existe.")