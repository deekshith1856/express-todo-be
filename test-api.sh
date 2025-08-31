#!/bin/bash

# Test script for Todo API
# Make sure the server is running before executing this script

BASE_URL="http://localhost:3000/api/todos"
TODO_ID=""

echo "Testing Todo API CRUD operations"
echo "================================="

# Test 1: Create a new todo
echo -e "\n1. Creating a new todo..."
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL \
  -H "Content-Type: application/json" \
  -d '{"title": "Test Todo", "description": "This is a test todo", "completed": false}')

echo "Response: $CREATE_RESPONSE"

# Extract the todo ID from the response
TODO_ID=$(echo $CREATE_RESPONSE | grep -o '"_id":"[^"]*' | sed 's/"_id":"//')

if [ -z "$TODO_ID" ]; then
  echo "Failed to extract todo ID. Make sure the server is running."
  exit 1
fi

echo "Created Todo ID: $TODO_ID"

# Test 2: Get all todos
echo -e "\n2. Getting all todos..."
curl -s -X GET $BASE_URL | json_pp

# Test 3: Get todo by ID
echo -e "\n3. Getting todo by ID..."
curl -s -X GET $BASE_URL/$TODO_ID | json_pp

# Test 4: Update todo
echo -e "\n4. Updating todo..."
curl -s -X PUT $BASE_URL/$TODO_ID \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Test Todo", "description": "This todo has been updated", "completed": true}' | json_pp

# Test 5: Get updated todo
echo -e "\n5. Getting updated todo..."
curl -s -X GET $BASE_URL/$TODO_ID | json_pp

# Test 6: Delete todo
echo -e "\n6. Deleting todo..."
curl -s -X DELETE $BASE_URL/$TODO_ID | json_pp

# Test 7: Verify deletion
echo -e "\n7. Verifying deletion (should return 404)..."
curl -s -X GET $BASE_URL/$TODO_ID | json_pp

echo -e "\nTesting completed!"