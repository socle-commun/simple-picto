# Binder Import Format Documentation

## Overview

The binder import functionality allows you to import binders from external JSON files into Simple Picto. This feature supports importing binder metadata, translations, categories, and pictograms.

## OpenAPI Schema

The import file must be a valid JSON file conforming to the following OpenAPI 3.0 schema:

```yaml
openapi: 3.0.0
info:
  title: Binder Import Schema
  version: 1.0.0
  description: Schema for importing binders into Simple Picto

components:
  schemas:
    BinderImportData:
      type: object
      required:
        - binder
        - translations
      properties:
        binder:
          $ref: '#/components/schemas/Binder'
        translations:
          type: array
          items:
            $ref: '#/components/schemas/Translation'
          minItems: 1
        categories:
          type: array
          items:
            $ref: '#/components/schemas/Category'
          default: []
        pictograms:
          type: array
          items:
            $ref: '#/components/schemas/Pictogram'
          default: []

    Binder:
      type: object
      required:
        - uuid
        - author
      properties:
        uuid:
          type: string
          description: Unique identifier for the binder
          example: "my-unique-binder-id"
        author:
          type: string
          description: Author name for the binder
          example: "John Doe"

    Translation:
      type: object
      required:
        - objectUuid
        - language
        - key
        - value
      properties:
        objectUuid:
          type: string
          description: Must match the binder's UUID
          example: "my-unique-binder-id"
        language:
          type: string
          description: Language code (BCP 47 format)
          pattern: '^[a-z]{2}-[A-Z]{2}$'
          example: "en-US"
        key:
          type: string
          description: Translation key
          enum: ["title", "description"]
          example: "title"
        value:
          type: string
          description: Translated text
          example: "My Binder"

    Category:
      type: object
      required:
        - uuid
        - icon
      properties:
        uuid:
          type: string
          description: Unique identifier for the category
          example: "category-uuid"
        icon:
          type: string
          description: Icon name for the category
          example: "icon-name"

    Pictogram:
      type: object
      required:
        - uuid
        - binderUuid
        - categoryUuid
        - src
      properties:
        uuid:
          type: string
          description: Unique identifier for the pictogram
          example: "pictogram-uuid"
        binderUuid:
          type: string
          description: Must match the binder's UUID
          example: "my-unique-binder-id"
        categoryUuid:
          type: string
          description: Must match a category's UUID
          example: "category-uuid"
        src:
          type: string
          description: Path or URL to the pictogram image
          example: "path/to/image.png"
```

## Import Modes

When importing a binder, you can choose between two modes:

### Merge Mode
- **Default option**
- Adds the imported binder to existing binders
- Preserves all existing data
- **Recommended** for most use cases

### Replace Mode
- **Destructive option**
- Completely replaces all existing binders with the imported one
- **Use with caution** - this will delete all existing data
- Only use when starting fresh or migrating data

## Example JSON File

Here's a minimal example file conforming to the schema:

```json
{
  "binder": {
    "uuid": "my-unique-binder-id",
    "author": "John Doe"
  },
  "translations": [
    {
      "objectUuid": "my-unique-binder-id",
      "language": "en-US",
      "key": "title",
      "value": "My Binder"
    },
    {
      "objectUuid": "my-unique-binder-id",
      "language": "fr-FR",
      "key": "title",
      "value": "Mon Classeur"
    },
    {
      "objectUuid": "my-unique-binder-id",
      "language": "en-US",
      "key": "description",
      "value": "My binder description"
    },
    {
      "objectUuid": "my-unique-binder-id",
      "language": "fr-FR",
      "key": "description",
      "value": "Description de mon classeur"
    }
  ],
  "categories": [],
  "pictograms": []
}
```

## Usage Instructions

1. **Create JSON file**: Follow the OpenAPI schema specification above
2. **Access import**: Navigate to Settings → Binders section
3. **Click import button**: Green button with upload icon
4. **Select file**: Choose your JSON file
5. **Choose import mode**: Select Merge or Replace mode
6. **Confirm**: The binder will be imported and validated

## Validation

The import process validates all data against the OpenAPI schema and provides specific error messages for any validation failures. Files must conform exactly to the schema requirements for successful import.