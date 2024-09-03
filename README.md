# Heart Rate API

This project is a Node.js-based API that processes heart rate data received from a patient monitoring device. It aggregates the heart rate data into 15-minute intervals, identifies the minimum and maximum heart rates within each interval, and optionally stores this data in a PostgreSQL database.

## Setup

### Prerequisites

- Node.js and npm installed
- PostgreSQL database instance running

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/heart-rate-api.git
   cd heart-rate-api
   
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
