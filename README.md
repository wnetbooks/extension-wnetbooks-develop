# System Project

A dynamic plugin system for loading and executing JavaScript plugins with configuration support.

## Metadata Format

The `map.json` file contains metadata for all available plugins:

```ts
{
  "metadata": {
    "author": string,
    "description": string
  },
  "data": [
    {
      "name": string,        // Plugin name
      "author": string,      // Plugin author
      "path": string,        // Plugin download URL
      "version": number,     // Plugin version
      "domain": string,      // Associated domain
      "icon": string,        // Plugin icon URL
      "description": string, // Plugin description
      "type": string,       // Plugin type (e.g., "comic")
      "locale": string      // Plugin locale (e.g., "vi_VN")
    }
  ]
}
```

### utils build-in support

1. Example register

```js
async function execute(utils, url) {
    const {page}=utils;
    await page.goto(url);
}
```

2. Utils components

   - `page`: playwright page instance. [docs](https://playwright.dev/docs/api/class-page) 
    

    

### Script in extension

1. config.js

   - Contains essential configuration for the plugin
   - Defines constants and selectors for web scraping
   - Example structure:

   ```javascript
   // Base configuration
   const BASE_URL = "https://example.com";

   // Selectors for DOM elements
   const SELECTORS = {
     chapterImages: ".chapter-content img",
     chapterTitle: ".chapter-title",
     nextButton: ".next-chapter",
     prevButton: ".prev-chapter",
   };

   // API endpoints
   const API = {
     search: "/api/search",
     chapters: "/api/chapters",
   };

   // Other constants
   const TIMEOUT = 5000;
   const MAX_RETRIES = 3;
   ```

2. main.js
   - Main entry point for the plugin
   - Handles homepage content and search functionality
   - Example structure:
   ```javascript
   load("config.js");
   async function execute() {
     return;
     [
       {
         title: "Latest Updates",
         url: "/latest",
         script: "gen.js",
       },
       {
         title: "Popular Series",
         url: "/popular",
         script: "gen.js",
       },
     ];
   }
   ```
   3 search.js
