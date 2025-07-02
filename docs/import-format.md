# Binder Import Format Documentation

## Overview

The binder import functionality allows you to import classeurs (binders) from external JSON files into Simple Picto. This feature supports importing binder metadata, translations, categories, and pictograms.

## File Format

The import file must be a valid JSON file with the following structure:

```json
{
  "binder": {
    "uuid": "unique-binder-id",
    "author": "Author Name"
  },
  "translations": [
    {
      "objectUuid": "unique-binder-id",
      "language": "fr-FR",
      "key": "title",
      "value": "Titre du Classeur"
    },
    {
      "objectUuid": "unique-binder-id",
      "language": "en-US",
      "key": "title",
      "value": "Binder Title"
    },
    {
      "objectUuid": "unique-binder-id",
      "language": "fr-FR",
      "key": "description",
      "value": "Description du classeur"
    },
    {
      "objectUuid": "unique-binder-id",
      "language": "en-US",
      "key": "description",
      "value": "Binder description"
    }
  ],
  "categories": [
    {
      "uuid": "category-uuid",
      "icon": "icon-name"
    }
  ],
  "pictograms": [
    {
      "uuid": "pictogram-uuid",
      "binderUuid": "unique-binder-id",
      "categoryUuid": "category-uuid",
      "src": "path/to/image.png"
    }
  ]
}
```

## Required Fields

### Binder Object
- `uuid` (string): Unique identifier for the binder
- `author` (string): Author name for the binder

### Translations Array
Each translation object must contain:
- `objectUuid` (string): Must match the binder's UUID
- `language` (string): Language code (e.g., "fr-FR", "en-US")
- `key` (string): Translation key ("title" or "description")
- `value` (string): Translated text

## Optional Fields

### Categories Array
- `uuid` (string): Unique identifier for the category
- `icon` (string): Icon name for the category

### Pictograms Array
- `uuid` (string): Unique identifier for the pictogram
- `binderUuid` (string): Must match the binder's UUID
- `categoryUuid` (string): Must match a category's UUID
- `src` (string): Path or URL to the pictogram image

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

## Error Handling

The import process validates the file format and will show specific error messages if:
- The file is not valid JSON
- Required fields are missing
- Field types are incorrect
- The file structure is invalid

Common error messages:
- "Invalid file format: not a valid JSON object"
- "Invalid file format: missing binder data"
- "Invalid file format: binder must have a valid uuid"
- "Invalid file format: missing or invalid translations array"

## Example Usage

1. **Export from another system**: Create a JSON file following the format above
2. **Click Import button**: In Settings → Binders section
3. **Select file**: Choose your JSON file
4. **Choose import mode**: Select Merge or Replace
5. **Confirm**: The binder will be imported and appear in your binders list

## Sample Import File

Here's a minimal example file you can use as a template:

```json
{
  "binder": {
    "uuid": "my-unique-binder-id",
    "author": "My Name"
  },
  "translations": [
    {
      "objectUuid": "my-unique-binder-id",
      "language": "fr-FR",
      "key": "title",
      "value": "Mon Classeur"
    },
    {
      "objectUuid": "my-unique-binder-id",
      "language": "en-US",
      "key": "title",
      "value": "My Binder"
    },
    {
      "objectUuid": "my-unique-binder-id",
      "language": "fr-FR",
      "key": "description",
      "value": "Description de mon classeur"
    },
    {
      "objectUuid": "my-unique-binder-id",
      "language": "en-US",
      "key": "description",
      "value": "My binder description"
    }
  ],
  "categories": [],
  "pictograms": []
}
```

Save this content as a `.json` file and import it to test the functionality.