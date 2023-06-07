import cv2
from datetime import datetime, time

cadastrar = True

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

            data = datetime.now()
            data_str = str(data)
            
            if cadastrar:
                print("peguei um")
                cv2.imwrite("./fotos_teste/" + data_str + ".png", rosto)
                cadastrar = False


    # cv2.imshow('gray', gray)
    cv2.imshow('color', frame)
