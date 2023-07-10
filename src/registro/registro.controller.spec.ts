import { Pessoa } from './../pessoa/entities/pessoa.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { RegistroController } from './registro.controller';
import { RegistroService } from './registro.service'; 


describe("Teste classe de equivalencia ReegistroControlles", () => {
    let controller: RegistroController
    let service: RegistroService
    let registros = [
        {
            id: 1,
            mensagem: "claudio ta no carro",
            pessoa_id: 1,
            createdAt: "2023-07-09T12:56:01.000Z",
            updatedAt: "2023-07-09T12:56:01.000Z"
        }
    ]
    let semRgistros = []

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: RegistroService,
                    useValue: {
                        cadastrarRegistro: jest.fn(),
                        listarRegistros: jest.fn().mockResolvedValue(registros),
                        listarRegistro: jest.fn(),
                    }
                }
            ],
            controllers: [RegistroController]
        }).compile()

        controller = module.get<RegistroController>(RegistroController)
        service = module.get<RegistroService>(RegistroService)
    })

    it('should be define', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
      })

      describe("testando a funcao que me retorna uma lista de registros", () => {
        it("deve retornar uma lista dos registros", async () => {
            const result = await controller.listarRegistro()
           expect(result).toEqual(registros)  
           expect(service.listarRegistros).toHaveBeenCalledTimes(1)
        })

        it("deve retornar uma lista vazia em caso de nao haver nehum registro", async () => {
            jest.spyOn(service, "listarRegistros").mockResolvedValueOnce(semRgistros)

            const result = await controller.listarRegistro()
           expect(result).toEqual(semRgistros)  
           expect(service.listarRegistros).toHaveBeenCalledTimes(1)
        })

        // it("deve retornar uma notificacao assim que um novo registro e inserido no banco", async () => {

        //     jest.spyOn(service, "listarRegistro").mockResolvedValueOnce(noti)
        //     const result = await controller.Notificar()
        //    expect(result).toEqual({})  
        // })
      })
})