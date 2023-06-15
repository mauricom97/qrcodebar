import { create } from '../../controllers/categories/create';
import Category from '../../db/models/Category';

describe('create', () => {
    let mockRequest: any;
    let mockResponse: any;
  
    beforeEach(() => {
      // Mock Express request and response objects
      mockRequest = {
        body: {
          name: 'your-test-name',
        },
        company: {
          uuid: 'your-test-company-uuid',
        },
      };
      mockResponse = {
        send: jest.fn(),
      };
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it('should create a category', async () => {
      // Mock the dependencies and functions
      jest.spyOn(Category, 'create').mockResolvedValue('your-mock-category');
  
      // Call the create function
      await create(mockRequest, mockResponse);
  
      // Assertions
      expect(Category.create).toHaveBeenCalledWith({
        name: mockRequest.body.name,
        company_uuid: mockRequest.company.uuid,
      });
      expect(mockResponse.send).toHaveBeenCalledWith('your-mock-category');
    });
  
    it('should handle an error and send the error message', async () => {
      // Mock the dependencies and functions
      jest.spyOn(Category, 'create').mockRejectedValue('your-mock-error');
  
      // Call the create function
      await create(mockRequest, mockResponse);
  
      // Assertions
      expect(mockResponse.send).toHaveBeenCalledWith('your-mock-error');
    });
  
    // Add more test cases for other scenarios as needed
  });