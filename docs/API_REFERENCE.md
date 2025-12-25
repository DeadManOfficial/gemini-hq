# Intelligence Hub API Reference

## Base URL
`http://localhost:4000`

## Authentication
All `/api/*` endpoints require an API Key.
- **Header:** `x-api-key: [YOUR_API_KEY]`
- **Default (Dev):** `gemini-secret-key`

## Observability
All responses include a `x-request-id` header for tracing.

---

## Endpoints

### 🩺 Health & Metrics
`GET /health`
- **Auth:** Not required
- **Returns:** System uptime, memory usage, and operational status.

### 📋 Missions (Operations)
`GET /api/missions`
- **Returns:** Array of all active and past missions.

`POST /api/missions`
- **Body:**
  ```json
  {
    "codeName": "string",
    "description": "string",
    "priority": "LOW | MEDIUM | HIGH | CRITICAL"
  }
  ```
- **Returns:** The created mission object.

`PUT /api/missions/:id`
- **Body:** Update status, progress, or priority.

`DELETE /api/missions/:id`
- **Action:** Removes the mission from history.

---

## Error Responses
The system uses the **SHIELDA Protocol**.
```json
{
  "success": false,
  "error": "Human readable message",
  "errorCode": "INTERNAL_ERROR | VALIDATION_ERROR | UNAUTHORIZED",
  "timestamp": "ISO_DATE"
}
```
