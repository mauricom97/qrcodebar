import { destroy } from '../../controllers/categories/destroy';
import Category from '../../db/models/Category';

describe('destroy', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    // Mock Express request and response objects
    mockRequest = {
      query: {
        uuid: 'your-test-uuid',
      },
    };
    mockResponse = {
      send: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should destroy a category and send the quantity', async () => {
    // Mock the dependencies and functions
    const mockDestroyedCategoryCount = 1;
    jest.spyOn(Category, 'destroy').mockResolvedValue(mockDestroyedCategoryCount);

    // Call the destroy function
    await destroy(mockRequest, mockResponse);

    // Assertions
    expect(Category.destroy).toHaveBeenCalledWith({ where: { uuid: mockRequest.query.uuid } });
    expect(mockResponse.send).toHaveBeenCalledWith(`quantity: ${mockDestroyedCategoryCount}`);
  });

  it('should handle an error and log the error', async () => {
    // Mock the dependencies and functions
    jest.spyOn(Category, 'destroy').mockRejectedValue('your-mock-error');
    console.log = jest.fn(); // Mock console.log to track log calls

    // Call the destroy function
    await destroy(mockRequest, mockResponse);

    // Assertions
    expect(console.log).toHaveBeenCalledWith('your-mock-error');
  });
});
