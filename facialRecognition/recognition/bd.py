# se conectar ao banco e pegar as fotos
import mysql.connector

class BD:
    def __init__(self):

        self.mydb = mysql.connector.connect(
        host="localhost",
        user="root",
        password="day123456",
        database="spy_cam"
        )

        self.mycursor = self.mydb.cursor()

    def insertNotificationConhecido(self, msg, id):
        sql = """INSERT INTO notificacao 
        (mensagem, id_pessoa, createdAt, updatedAt) 
        VALUES (%s, %s, NOW(), NOW())"""

        self.mycursor.execute(sql, (msg, id))
        self.mydb.commit()

    
    def insertNotificationDesconhecido(self, msg):
        sql = """INSERT INTO notificacao 
        (mensagem, createdAt, updatedAt) 
        VALUES (%s, NOW(), NOW())"""

        self.mycursor.execute(sql, (msg,))
        self.mydb.commit()


    # POR ENQUANTO PEGAR APENAS O ULTIMO REGISTRO
    def getPhotos(self):
        self.mycursor.execute("SELECT id, nome_pessoa, fotos FROM pessoa ORDER BY id DESC LIMIT 1")
        res = self.mycursor.fetchall()
        return res
