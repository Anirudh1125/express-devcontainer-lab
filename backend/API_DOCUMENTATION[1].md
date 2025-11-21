# API Documentation

This API provides mathematical calculation endpoints for geometric shapes and power operations, as well as a quotebook service for managing and retrieving inspirational quotes.

## Base URL
```
http://localhost:8000
```

---

## Endpoints

### 1. Calculate Circle Properties

**Request Format:** `/math/circle/:radius`

**Request Type:** GET

**Returned Data Format:** JSON

**Description:** Calculates the area and circumference of a circle given its radius. The radius must be a positive number.

**Example Request:** `/math/circle/2`

**Example Response:**
```json
{
    "radius": 2,
    "area": 12.566370614359172,
    "circumference": 12.566370614359172
}
```

**Example Request:** `/math/circle/5`

**Example Response:**
```json
{
    "radius": 5,
    "area": 78.53981633974483,
    "circumference": 31.41592653589793
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `radius` is not a valid positive number, returns an error with message `{"error": "Invalid radius. Please provide a positive number."}`
- Possible 500 errors (all in JSON):
  - If something goes wrong on the server, returns error with `{"error": "Something went wrong; please try again."}`

**Notes:**
- The `radius` must be provided as part of the URL path.
- The radius must be a positive numeric value.
- Area is calculated using the formula: π × r²
- Circumference is calculated using the formula: 2 × π × r

---

### 2. Calculate Rectangle Properties

**Request Format:** `/math/rectangle/:width/:height`

**Request Type:** GET

**Returned Data Format:** JSON

**Description:** Calculates the area and perimeter of a rectangle given its width and height. Both dimensions must be positive numbers.

**Example Request:** `/math/rectangle/4/2`

**Example Response:**
```json
{
    "width": 4,
    "height": 2,
    "area": 8,
    "perimeter": 12
}
```

**Example Request:** `/math/rectangle/10/5`

**Example Response:**
```json
{
    "width": 10,
    "height": 5,
    "area": 50,
    "perimeter": 30
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `width` or `height` is not a valid positive number, returns an error with message `{"error": "Invalid dimensions. Please provide positive numbers."}`
- Possible 500 errors (all in JSON):
  - If something goes wrong on the server, returns error with `{"error": "Something went wrong; please try again."}`

**Notes:**
- Both `width` and `height` must be provided as part of the URL path.
- Both dimensions must be positive numeric values.
- Area is calculated using the formula: width × height
- Perimeter is calculated using the formula: 2 × (width + height)

---

### 3. Calculate Power

**Request Format:** `/math/power/:base/:exponent`

**Request Type:** GET

**Returned Data Format:** JSON

**Description:** Calculates the result of raising a `base` number to an `exponent` power. Optionally, if a query parameter `root` is provided, the nth root of the result will be calculated and returned.

**Example Request:** `/math/power/4/2`

**Example Response:**
```json
{
    "base": 4,
    "exponent": 2,
    "result": 16
}
```

**Example Request with Root:** `/math/power/2/3?root=2`

**Example Response with Root:**
```json
{
    "base": 2,
    "exponent": 3,
    "result": 2.8284271247461903,
    "root": 2
}
```

**Example Request:** `/math/power/9/2?root=2`

**Example Response:**
```json
{
    "base": 9,
    "exponent": 2,
    "result": 9,
    "root": 2
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `base` or `exponent` is not a valid number, returns an error with message `{"error": "Invalid base or exponent. Please provide valid numbers."}`
  - If the `root` parameter is provided but is not a valid non-zero number, returns an error with message `{"error": "Invalid root. Please provide a non-zero number."}`
- Possible 500 errors (all in JSON):
  - If something goes wrong on the server, returns error with `{"error": "Something went wrong; please try again."}`

**Notes:**
- The `base` and `exponent` must be provided as part of the URL path.
- Both `base` and `exponent` are expected to be numeric values.
- The optional `root` query parameter must be a non-zero numeric value.
- The calculation is performed as: (base^exponent)^(1/root) when root is provided.
- Without the `root` parameter, the result is simply base^exponent.

---

### 4. Health Check

**Request Format:** `/health`

**Request Type:** GET

**Returned Data Format:** Plain text

**Description:** Simple health check endpoint to verify the server is running.

**Example Request:** `/health`

**Example Response:**
```
healthy
```

**Notes:**
- Returns HTTP status 200 with plain text response "healthy"
- Used for monitoring and load balancer health checks

---

### 5. Root Endpoint

**Request Format:** `/`

**Request Type:** GET

**Returned Data Format:** JSON

**Description:** Welcome endpoint that confirms the server is running.

**Example Request:** `/`

**Example Response:**
```json
{
    "ok": true,
    "msg": "Hello from Express inside a Dev Container!"
}
```

---

## Quotebook API Endpoints

### 6. Fetch Quote Categories

**Request Format:** `/quotebook/categories`

**Request Type:** GET

**Returned Data Format:** Plain text

**Description:** Returns a list of all available quote categories. Each category is listed on a separate line with the prefix "A possible category is".

**Example Request:** `/quotebook/categories`

**Example Response:**
```
A possible category is successQuotes
A possible category is perseveranceQuotes
A possible category is happinessQuotes
```

**Notes:**
- Returns HTTP status 200 with plain text response
- Each line represents one available category
- Categories can be used with other quotebook endpoints

---

### 7. Get Random Quote from Category

**Request Format:** `/quotebook/quote/:category`

**Request Type:** GET

**Returned Data Format:** JSON

**Description:** Returns a random quote from the specified category. The category must be one of the valid categories available in the system.

**Example Request:** `/quotebook/quote/successQuotes`

**Example Response:**
```json
{
    "quote": "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "author": "Winston S. Churchill"
}
```

**Example Request:** `/quotebook/quote/happinessQuotes`

**Example Response:**
```json
{
    "quote": "Happiness is not something ready made. It comes from your own actions.",
    "author": "Dalai Lama"
}
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If the `category` is not valid, returns an error with message `{"error": "no category listed for [category]"}` where `[category]` is the requested category name

**Notes:**
- The `category` must be provided as part of the URL path
- Available categories: `successQuotes`, `perseveranceQuotes`, `happinessQuotes`
- Each request returns a randomly selected quote from the specified category
- The same category can be requested multiple times and may return different quotes

---

### 8. Add New Quote

**Request Format:** `/quotebook/quote/new`

**Request Type:** POST

**Returned Data Format:** Plain text

**Description:** Adds a new quote to a specified category. Requires a JSON body with three parameters: `category`, `quote`, and `author`.

**Example Request:** `/quotebook/quote/new`

**Request Body:**
```json
{
    "category": "successQuotes",
    "quote": "The only way to do great work is to love what you do.",
    "author": "Steve Jobs"
}
```

**Example Response:**
```
Success!
```

**Error Handling:**
- Possible 400 (invalid request) errors (all in JSON):
  - If any required parameter (`category`, `quote`, or `author`) is missing, returns error with message `{"error": "invalid or insufficient user input"}`
  - If the `category` is not one of the valid categories, returns error with message `{"error": "invalid or insufficient user input"}`

**Notes:**
- Request must include `Content-Type: application/json` header
- All three parameters are required: `category`, `quote`, and `author`
- The `category` must be one of: `successQuotes`, `perseveranceQuotes`, `happinessQuotes`
- Successfully added quotes will be available immediately for retrieval via the random quote endpoint
- The new quote is added to the in-memory array and will persist until the server restarts

---

## General Notes

- All mathematical endpoints return numeric results as floating-point numbers.
- All path parameters and query parameters are case-sensitive.
- Invalid numeric inputs will result in 400 Bad Request errors.
- The API does not require authentication.
- All responses use UTF-8 encoding.

## Server Information

- **Default Port:** 8000 (configurable via PORT environment variable)
- **Framework:** Express.js
- **Response Format:** JSON (except health endpoint)
