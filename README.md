# Heart Rate API

## Setup

1. Install dependencies:
    ```bash
    npm install
    ```

2. Run the API:
    ```bash
    node server.js
    ```

3. API Endpoint:
    - POST `/api/upload-clinical-data`
    - Form Data:
        - `clinicalMetrics`: Upload your JSON file containing clinical metrics.

## Project Structure

- **server.js**: Entry point of the application.
- **src/controllers**: Contains the controllers for handling requests.
- **src/routes**: Defines the routes for the application.
- **src/services**: Contains business logic for processing data.
- **uploads/**: Temporary storage for uploaded files.
