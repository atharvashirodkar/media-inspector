# Media Inspector: Manual Backend Test Cases

This document defines manual test cases for the `/inspect` API endpoint.
These tests validate expected behavior before automated tests are added.

---

## API Under Test

**Endpoint:** `POST /inspect`

**Content-Type:** `application/json`

---

## Test Case 1: Valid Static HTML with `<video><source>`

**Purpose**
Verify that the inspector can extract video sources from static HTML.

**Input**

```json
{
  "url": "https://www.w3schools.com/html/html5_video.asp"
}
```

**Expected Result**
- `success: true`
- `found` equals the number of **unique** video URLs
- Duplicate video sources in the HTML are returned only once
- Video URLs are resolved to absolute paths
- Formats such as `video/mp4` and `video/ogg` are detected

---

## Test Case 2: Page with No Video Content

**Purpose**
Ensure the inspector handles pages without video gracefully.

**Input**

```json
{
  "url": "https://example.com"
}
```

**Expected Result**

* `success: true`
* `found: 0`
* `videos: []`

---

## Test Case 3: Blocked or Restricted Website

**Purpose**
Confirm that blocked websites return a controlled error response.

**Input**

```json
{
  "url": "https://pixabay.com/videos/boat-man-fishing-boat-wooden-boat-181376/"
}
```

**Expected Result**

* `success: false`
* `statusCode: 403` or `500`
* Error message explaining access restriction
* No server crash

---

## Test Case 4: Missing URL in Request Body

**Purpose**
Validate input validation logic.

**Input**

```json
{}
```

**Expected Result**

* HTTP status `400`
* `success: false`
* Clear error message indicating URL is required