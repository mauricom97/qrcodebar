import { update } from '../../controllers/categories/update';
import Category from '../../db/models/Category';

describe('update', () => {
  let mockRequest: any;
  let mockResponse: any;

  beforeEach(() => {
    // Mock Express request and response objects
    mockRequest = {
      body: {
        name: 'your-test-name',
      },
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

  it('should update a category', async () => {
    // Mock the dependencies and functions
    jest.spyOn(Category, 'update').mockResolvedValue([1]);

    // Call the update function
    await update(mockRequest, mockResponse);

    // Assertions
    expect(Category.update).toHaveBeenCalledWith(
      { name: mockRequest.body.name },
      { where: { uuid: mockRequest.query.uuid } }
    );
    expect(mockResponse.send).toHaveBeenCalledWith([1]);
  });

  it('should handle an error and throw the error message', async () => {
    // Mock the dependencies and functions
    jest.spyOn(Category, 'update').mockRejectedValue('your-mock-error');

    // Call the update function
    await expect(update(mockRequest, mockResponse)).rejects.toThrow('your-mock-error');
  });

  it('should throw an error if name is not provided', async () => {
    // Modify the request to not include the name
    delete mockRequest.body.name;

    // Call the update function
    await expect(update(mockRequest, mockResponse)).rejects.toThrow('Name is required');
  });

  it('should throw an error if uuid is not provided', async () => {
    // Modify the request to not include the uuid
    delete mockRequest.query.uuid;

    // Call the update function
    await expect(update(mockRequest, mockResponse)).rejects.toThrow('UUID is required');
  });

  // Add more test cases for other scenarios as needed
});
