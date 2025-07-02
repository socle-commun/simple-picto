import { describe, it, expect } from 'vitest';
import { validateBinderImportData, type BinderImportData } from '../../../src/features/import/binderImport';

describe('BinderImport', () => {
  describe('validateBinderImportData', () => {
    it('should validate correct binder data', () => {
      const validData: BinderImportData = {
        binder: {
          uuid: 'test-uuid',
          author: 'Test Author'
        },
        translations: [
          {
            objectUuid: 'test-uuid',
            language: 'fr-FR',
            key: 'title',
            value: 'Test Title'
          }
        ],
        categories: [],
        pictograms: []
      };

      const result = validateBinderImportData(validData);
      expect(result.success).toBe(true);
      expect(result.data).toEqual(validData);
      expect(result.error).toBeUndefined();
    });

    it('should reject data with missing binder', () => {
      const invalidData = {
        translations: []
      };

      const result = validateBinderImportData(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: missing binder data');
    });

    it('should reject data with missing binder uuid', () => {
      const invalidData = {
        binder: {
          author: 'Test Author'
          // missing uuid
        },
        translations: []
      };

      const result = validateBinderImportData(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: binder must have a valid uuid');
    });

    it('should reject data with missing binder author', () => {
      const invalidData = {
        binder: {
          uuid: 'test-uuid'
          // missing author
        },
        translations: []
      };

      const result = validateBinderImportData(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: binder must have a valid author');
    });

    it('should reject data with missing translations', () => {
      const invalidData = {
        binder: {
          uuid: 'test-uuid',
          author: 'Test Author'
        }
        // missing translations
      };

      const result = validateBinderImportData(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: missing or invalid translations array');
    });

    it('should reject data with invalid translation structure', () => {
      const invalidData = {
        binder: {
          uuid: 'test-uuid',
          author: 'Test Author'
        },
        translations: [
          {
            objectUuid: 'test-uuid',
            language: 'fr-FR'
            // missing key and value
          }
        ]
      };

      const result = validateBinderImportData(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: invalid translation structure');
    });

    it('should reject non-object input', () => {
      const result = validateBinderImportData('invalid');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: not a valid JSON object');
    });

    it('should reject null input', () => {
      const result = validateBinderImportData(null);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: not a valid JSON object');
    });

    it('should handle optional categories and pictograms', () => {
      const validData = {
        binder: {
          uuid: 'test-uuid',
          author: 'Test Author'
        },
        translations: [
          {
            objectUuid: 'test-uuid',
            language: 'fr-FR',
            key: 'title',
            value: 'Test Title'
          }
        ],
        categories: [
          {
            uuid: 'cat-uuid',
            icon: 'test-icon'
          }
        ],
        pictograms: [
          {
            uuid: 'pic-uuid',
            binderUuid: 'test-uuid',
            categoryUuid: 'cat-uuid',
            src: 'test.png'
          }
        ]
      };

      const result = validateBinderImportData(validData);
      expect(result.success).toBe(true);
      expect(result.data?.categories).toHaveLength(1);
      expect(result.data?.pictograms).toHaveLength(1);
    });

    it('should reject invalid categories format', () => {
      const invalidData = {
        binder: {
          uuid: 'test-uuid',
          author: 'Test Author'
        },
        translations: [
          {
            objectUuid: 'test-uuid',
            language: 'fr-FR',
            key: 'title',
            value: 'Test Title'
          }
        ],
        categories: 'invalid'
      };

      const result = validateBinderImportData(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: categories must be an array');
    });

    it('should reject invalid pictograms format', () => {
      const invalidData = {
        binder: {
          uuid: 'test-uuid',
          author: 'Test Author'
        },
        translations: [
          {
            objectUuid: 'test-uuid',
            language: 'fr-FR',
            key: 'title',
            value: 'Test Title'
          }
        ],
        pictograms: 'invalid'
      };

      const result = validateBinderImportData(invalidData);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid file format: pictograms must be an array');
    });
  });
});