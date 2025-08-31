# Express Docker ECR Todo API

A simple Todo API built with Express.js, TypeScript, and MongoDB.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Docker (optional, for containerization)

### Installation

#### Option 1: Local Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/express-docker-ecr
   NODE_ENV=development
   ```
4. Build the TypeScript code:
   ```
   npm run build
   ```
5. Start the server:
   ```
   npm run dev
   ```

#### Option 2: Docker Setup

1. Clone the repository
2. Make sure Docker is installed and running on your machine
3. Build the Docker image:
   ```bash
   docker build -t express-docker-ecr .
   ```
4. Run the container:
   ```bash
   # If MongoDB is running on your host machine:
   docker run -p 3000:3000 -e MONGODB_URI=mongodb://host.docker.internal:27017/express-docker-ecr express-docker-ecr

   # If MongoDB is running in another container or cloud service:
   docker run -p 3000:3000 -e MONGODB_URI=mongodb://<mongodb-host>:<mongodb-port>/express-docker-ecr express-docker-ecr
   ```

##### Notes on Docker Setup:

- The `-p 3000:3000` flag maps port 3000 from the container to port 3000 on your host machine
- The `-e MONGODB_URI=...` flag sets the MongoDB connection string environment variable
- Use `host.docker.internal` instead of `localhost` to connect to services running on your host machine from within the container
- You can override other environment variables using the `-e` flag, e.g., `-e PORT=8080 -e NODE_ENV=development`
- To run the container in detached mode (background), add the `-d` flag
- To view logs from a detached container, use `docker logs <container-id>`

## API Endpoints

### Todos

| Method | Endpoint       | Description         | Request Body                                      | Response                                |
|--------|----------------|---------------------|---------------------------------------------------|----------------------------------------|
| GET    | /api/todos     | Get all todos       | -                                                 | Array of todo objects                   |
| POST   | /api/todos     | Create a new todo   | `{ "title": "string", "description": "string", "completed": boolean }` | Created todo object |
| GET    | /api/todos/:id | Get a todo by ID    | -                                                 | Todo object                            |
| PUT    | /api/todos/:id | Update a todo       | `{ "title": "string", "description": "string", "completed": boolean }` | Updated todo object |
| DELETE | /api/todos/:id | Delete a todo       | -                                                 | Empty object                           |

## Example Requests

### Create a Todo

```bash
curl -X POST http://localhost:3000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread", "completed": false}'
```

### Get All Todos

```bash
curl -X GET http://localhost:3000/api/todos
```

### Get Todo by ID

```bash
curl -X GET http://localhost:3000/api/todos/[todo-id]
```

### Update a Todo

```bash
curl -X PUT http://localhost:3000/api/todos/[todo-id] \
  -H "Content-Type: application/json" \
  -d '{"title": "Buy groceries", "description": "Milk, eggs, bread, cheese", "completed": true}'
```

### Delete a Todo

```bash
curl -X DELETE http://localhost:3000/api/todos/[todo-id]
```

## Response Format

All API responses follow this format:

```json
{
  "success": true,
  "data": {}
}
```

Or for an array of objects:

```json
{
  "success": true,
  "data": [
    {
      "id": "60d21b4667d0d8992e610c85",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "createdAt": "2023-08-31T09:45:00.000Z",
      "updatedAt": "2023-08-31T09:45:00.000Z"
    }
  ]
}
```

For errors:

```json
{
  "success": false,
  "error": "Error message"
}
```

## Error Handling

- 400: Bad Request - Invalid input data
- 404: Not Found - Resource not found
- 500: Server Error - Internal server error

## Development

- Build: `npm run build`
- Start development server: `npm run dev`

## Testing

A test script is provided to test all CRUD operations:

1. Make sure the server is running
2. Run the test script:
   ```
   ./test-api.sh
   ```

The script will:
1. Create a new todo
2. Get all todos
3. Get a specific todo by ID
4. Update a todo
5. Get the updated todo
6. Delete a todo
7. Verify the deletion

Note: The script requires `curl` and `json_pp` to be installed on your system.


MONGODB_URI=mongodb+srv://docker_todo:docker_todo@cluster0.kbprlzg.mongodb.net/