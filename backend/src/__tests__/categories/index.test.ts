import { index } from '../../controllers/categories/index';
import Category from '../../db/models/Category';

describe('index', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    // Mock Express request and response objects
    mockRequest = {};
    mockResponse = {
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and send categories', async () => {
    // Mock the dependencies and functions
    const mockCategories: any = ['category1', 'category2'];
    jest.spyOn(Category, 'findAll').mockResolvedValue(mockCategories);

    // Call the index function
    await index(mockRequest, mockResponse);

    // Assertions
    expect(Category.findAll).toHaveBeenCalled();
    expect(mockResponse.send).toHaveBeenCalledWith(mockCategories);
  });

  it('should handle an error and send the error message', async () => {
    // Mock the dependencies and functions
    jest.spyOn(Category, 'findAll').mockRejectedValue('your-mock-error');

    // Call the index function
    await index(mockRequest, mockResponse);

    // Assertions
    expect(mockResponse.send).toHaveBeenCalledWith('your-mock-error');
  });

  // Add more test cases for other scenarios as needed
});
