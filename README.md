# Employee Management System

A full-stack web application to manage employees, departments, and projects using:
- **Backend**: ASP.NET Core Web API + Entity Framework Core + SQL Server
- **Frontend**: Angular / React
- **Database**: SQL Server

---

## 📁 Project Structure

```
Employee-Management-System/
│
├── backend/
│   └── aspnet-core-api/
│       ├── Controllers/
│       ├── Models/
│       ├── Data/
│       └── ...
│
├── frontend/
│   └── angular-frontend/ or react-frontend/
│       ├── src/
│       └── ...
```

---

## ✅ Prerequisites

- [.NET SDK 7.0+](https://dotnet.microsoft.com/en-us/download)
- [Node.js and npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli) or [React CLI tools](https://reactjs.org/)
- SQL Server (Express or Developer edition)

---

## 🔧 Backend Setup (ASP.NET Core)

1. Open a terminal and navigate to the backend folder:

```bash
cd backend/aspnet-core-api
```

2. Install EF Core CLI (if not already):

```bash
dotnet tool install --global dotnet-ef
```

3. Restore packages:

```bash
dotnet restore
```

4. Add a migration:

```bash
dotnet ef migrations add InitialCreate
```

5. Update the database:

```bash
dotnet ef database update
```

6. Run the API:

```bash
dotnet run
```

API will be available at: `https://localhost:5001` or `http://localhost:5000`

---

## 💻 Frontend Setup (Angular / React)

1. Navigate to the frontend directory:

```bash
cd frontend/angular-frontend   # or react-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm start         # for React
ng serve          # for Angular
```

App will run on `http://localhost:4200` (Angular) or `http://localhost:3000` (React)

---

## 🌐 API Endpoints

| Method | Endpoint                 | Description              |
|--------|--------------------------|--------------------------|
| GET    | /api/employees           | Get all employees        |
| POST   | /api/employees           | Add new employee         |
| PUT    | /api/employees/{id}      | Update employee          |
| DELETE | /api/employees/{id}      | Delete employee          |
| ...    | ...                      | More for Departments & Projects |

---

## 📷 ER Diagram

See the `ERDiagram.png` file or [download here](./ERDiagram.png)

---

## 📌 Notes

- Update your SQL Server connection string in `appsettings.json`.
- Trust development certificates for HTTPS (`dotnet dev-certs https --trust`)
- Use `Postman` or `Swagger` to test API endpoints.

---

## 🧑‍💻 Author
 
© 2025 – All rights reserved
