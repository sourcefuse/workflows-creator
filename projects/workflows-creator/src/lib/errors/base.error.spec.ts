import {InvalidEntityError, NotProvided, MissingError} from './base.error';

describe('Error Classes', () => {
  let invalidEntityError: InvalidEntityError;
  let notProvidedError: NotProvided;
  let missingError: MissingError;

  beforeEach(() => {
    // Create instances of error classes before each test
    invalidEntityError = new InvalidEntityError('testEntity');
    notProvidedError = new NotProvided('testName');
    missingError = new MissingError('testName');
  });

  describe('InvalidEntityError', () => {
    it('should have the correct message', () => {
      expect(invalidEntityError.message).toBe('Invalid Entity: testEntity');
    });
  });

  describe('NotProvided', () => {
    it('should have the correct message', () => {
      expect(notProvidedError.message).toBe('No provider found for testName');
    });
  });

  describe('MissingError', () => {
    it('should have the correct message', () => {
      expect(missingError.message).toBe('Missing: testName');
    });
  });
});
