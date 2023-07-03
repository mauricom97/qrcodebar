import { index } from '../../controllers/categories/index';
import Category from '../../db/models/Category';

// Mock dos objetos necessários
const mockReq: any = {
  company: { uuid: 'mocked-uuid' }
};

const mockRes: any = {
  send: jest.fn()
};

// Mock da função `findAll` do modelo Category
jest.mock('../../db/models/Category', () => ({
  findAll: jest.fn()
}));

describe('Index', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve retornar as categorias', async () => {
    // Mock do retorno da função `findAll`
    const mockCategories = ['Categoria 1', 'Categoria 2'];
    (Category.findAll as jest.Mock).mockResolvedValue(mockCategories);

    await index(mockReq, mockRes);

    expect(Category.findAll).toHaveBeenCalledWith({
      where: {
        company_uuid: 'mocked-uuid'
      }
    });

    expect(mockRes.send).toHaveBeenCalledWith(mockCategories);
  });

  it('deve retornar o erro em caso de falha', async () => {
    // Mock do lançamento de uma exceção
    const mockError = new Error('Erro simulado');
    (Category.findAll as jest.Mock).mockRejectedValue(mockError);

    await index(mockReq, mockRes);

    expect(Category.findAll).toHaveBeenCalledWith({
      where: {
        company_uuid: 'mocked-uuid'
      }
    });

    expect(mockRes.send).toHaveBeenCalledWith(mockError);
  });
});