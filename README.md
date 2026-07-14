# Courses Management API

A basic Express-based REST API built for the PC 24 Terminal Practical Assessment. 

**Submitted by:** Diana Parinas
**Section:** BSITFS-B


## How to Install and Run
1. Extract the project directory and open your terminal inside it.
2. Install the required dependencies using npm:
   ```bash
   npm install
3. Run the development
4. the application will start running at `http://localhost:3000`

## API Endpoints
* **GET**
  * **Endpoint:** `/api/courses`
  * **Description:** retrieves the entire in-memory list of courses
* **GET**
  * **Endpoint:** `/api/courses/:id`
  * **Description:** retrieves a single course matching the provided ID parameter
* **POST**
  * **Endpoint:** `/api/courses`
  * **Description:** validates and adds a brand new course object to the registry
* **PUT**
  * **Endpoint:** `/api/courses/:id`
  * **Description:** completely replaces an existing course's details by its ID.
* **DELETE**
  * **Endpoint:** `/api/courses/:id`
  * **Description:** permanently deletes a specified course from the collection
