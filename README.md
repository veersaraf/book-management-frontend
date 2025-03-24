# Book Management Frontend

## Description

This repository houses the frontend of a Book Management application built with React and Vite. It serves as the client-side interface for a MERN stack project, designed to allow users to interact with a book catalog through a responsive and intuitive UI. The overall objective is to provide an accessible platform for browsing, creating, editing, and deleting book entries, integrated with a secure backend API.

## Value Proposition

The frontend offers a user-friendly experience with features like a book list view (table or card format), detailed book views, and forms for adding or editing books. It includes user authentication (login/register) to protect sensitive actions, solving the problem of uncontrolled access to book data. Benefits include a visually appealing design (using Tailwind CSS), real-time feedback (e.g., loading spinners, error messages), and seamless integration with the backend for a cohesive book management solution.

## Setup and Usage

### Prerequisites

- Node.js version 14 or higher
- npm (Node Package Manager)
- Docker (optional, for containerized setup)
- Backend server running at `http://localhost:5555` (see backend repository)

### Local Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/book-management-frontend.git
    ```
2. Navigate to the project directory:
    ```sh
    cd book-management-frontend
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Create a `.env` file in the root directory with:
    ```sh
    VITE_API_URL=http://localhost:5555
    ```
    This points to the backend API.
5. Start the development server:
    ```sh
    npm run dev
    ```
    The app will run on `http://localhost:5173` (default Vite port).

### Docker Setup

1. Ensure Docker is installed and running.
2. Ensure the backend is running with its Docker setup and the `mern-network` exists:
    ```sh
    docker network create mern-network
    ```
3. Navigate to the project directory:
    ```sh
    cd book-management-frontend
    ```
4. Build and start the container:
    ```sh
    docker-compose up --build -d
    ```
    The frontend will be available at `http://localhost`.
5. To stop the container:
    ```sh
    docker-compose down
    ```

## Testing

The frontend includes a comprehensive test suite using Jest and React Testing Library, covering components and pages such as `BookModal`, `BooksCard`, `BookSingleCard`, `BooksTable`, `BackButton`, `Spinner`, `CreateBooks`, `DeleteBook`, `EditBook`, and `Home`. All tests are currently passing, ensuring core functionality (rendering, user interactions, API integration) works as expected. No tests are broken or failing.

### Executing Tests

1. Navigate to the project directory:
    ```sh
    cd book-management-frontend
    ```
2. Install dependencies (if not already done):
    ```sh
    npm install
    ```
3. Run the tests:
    ```sh
    npm test
    ```
    This executes all tests in the `src` directory with the `.test.jsx` extension.

No tests are skipped or pending. Each test file verifies specific behaviors (e.g., rendering components, handling clicks, mocking API responses). To add new tests, place them in the appropriate component/page directory with a `.test.jsx` suffix and update `jest.config.js` if needed.

