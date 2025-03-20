# Backend - Inventory Management Application

## Overview
This backend application is built using **Java 17** and **Spring Boot**. It provides a REST API for managing inventory products, supporting CRUD operations and calculating inventory metrics.

## Technologies
- **Java 17**
- **Spring Boot**
- **Maven**

## Setup Instructions
1. Ensure you have **Java 17** and **Maven** installed on your system.
2. Clone the repository to your local machine.
3. Navigate to the root directory of the backend project.

## Running the Application
To start the backend application, run:

```bash
mvn spring-boot:run
```

This command will start the Spring Boot application on the default port (typically 8080).

## Running Tests
To run all tests for the backend application, execute:

```bash
mvn test
```

This command runs all unit and integration tests and displays the results in the console.

## Developer Notes
- The API endpoints are prefixed with `/api/products`.
- The application uses an in-memory repository for inventory management.
- Follow the project's coding conventions and best practices.
- Update DTOs and documentation if API contracts change.
- Prepared the code for an easy implementation with the ORM JPA.
