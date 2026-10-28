# 🏢 Employee Leave & Attendance Management System (ELAMS)

A full-stack HR platform built with **Spring Boot Microservices** and **React.js**, designed to streamline employee attendance tracking, leave management, and shift scheduling within an organization.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Microservices & Ports](#-microservices--ports)
- [Features](#-features)
- [API Documentation](#-api-documentation)
- [Frontend Routes](#-frontend-routes)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Project Structure](#-project-structure)

---

## 🔍 Overview

ELAMS is a production-grade, role-based HR management system supporting three user roles:

| Role | Capabilities |
|---|---|
| **Employee** | Clock in/out, apply for leave, view attendance reports & leave balances |
| **Manager** | Approve/reject leave, manage team attendance, add/promote employees, assign shifts |
| **Admin** | Full access — all manager capabilities + admin-level controls |

---

## 🏛 Architecture

```
                        ┌─────────────────────┐
                        │    React.js SPA      │
                        │  (Vite + MUI + Axios) │
                        └────────┬────────────┘
                                 │ HTTP (JWT Bearer)
                        ┌────────▼────────────┐
                        │    API Gateway       │  :9090
                        │  (Spring Cloud GW)   │
                        │  JWT Auth + Routing  │
                        └──┬──────┬────────┬──┘
                           │      │        │  (Feign Clients)
              ┌────────────▼─┐ ┌──▼──────┐ ┌▼─────────────────┐
              │   Employee   │ │  Leave  │ │   Attendance      │
              │  Management  │ │  Mgmt   │ │   Management      │
              │   :9191      │ │  :9192  │ │   :9193           │
              └──────────────┘ └─────────┘ └───────────────────┘
                           │      │        │
                        ┌──▼──────▼────────▼──┐
                        │      MySQL DB         │
                        └─────────────────────┘
                        
              ┌──────────────────┐   ┌──────────────────┐
              │  Eureka Registry  │   │  Config Server    │
              │     :8761         │   │     :8888         │
              └──────────────────┘   └──────────────────┘
```

All downstream services register with **Eureka** for service discovery. The **API Gateway** handles JWT validation and routes requests to the appropriate service. Inter-service calls are made via **OpenFeign** clients.

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Java 21 | Core language |
| Spring Boot 3.5 | Microservice framework |
| Spring Cloud Gateway | API Gateway & request routing |
| Netflix Eureka | Service discovery & registration |
| Spring Cloud Config | Centralized configuration management |
| OpenFeign | Declarative inter-service HTTP client |
| Spring Security + JJWT 0.12.6 | JWT authentication (HS256) |
| Spring Data JPA + Hibernate | ORM & database access |
| MySQL | Relational database |
| Lombok | Boilerplate reduction |
| ModelMapper | DTO ↔ Entity mapping |
| Springdoc OpenAPI | Swagger UI documentation |
| Maven | Build tool |
| Docker | Containerization |

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI library |
| Vite 6 | Build tool & dev server |
| Material-UI (MUI) v7 | Component library & theming |
| MUI X Charts | Data visualization (shift, leave, attendance charts) |
| MUI X Data Grid | Tabular data display |
| MUI X Date Pickers | Date range selection |
| React Router DOM v7 | Client-side routing |
| Axios | HTTP client with JWT interceptors |
| React Context API | Global state management |
| notistack | Snackbar notifications |
| date-fns / dayjs | Date utilities |

---

## 📡 Microservices & Ports

| Service | Port | Description |
|---|---|---|
| **API Gateway** | `9090` | Single entry point — JWT auth, routing |
| **Config Server** | `8888` | Centralized config for all services |
| **Eureka Registry** | `8761` | Service discovery & health monitoring |
| **Employee Management** | `9191` | Employee CRUD, roles, shifts |
| **Leave Management** | `9192` | Leave requests & balance tracking |
| **Attendance Management** | `9193` | Clock-in/out & reporting |

---

## ✨ Features

### 👤 Employee Dashboard
- **Clock In / Clock Out** — real-time shift-aware attendance recording
- **Leave Application** — apply for 6 leave types with date range selection
- **Leave Balance Tracker** — view remaining balances per leave type
- **Attendance Calendar** — visual calendar with daily status (PRESENT, ABSENT, HALF_DAY, ABNORMAL)
- **Attendance Reports** — weekly, monthly, and custom date-range reports
- **Profile Management** — view and update personal profile

### 🗂 Manager Dashboard
- **Team Attendance Overview** — daily summary report for all team members
- **Leave Approval Queue** — approve or reject pending leave requests
- **Manage Employees** — add, promote, demote, delete employees, assign managers
- **Shift Assignment** — assign shifts (MORNING / EVENING / NIGHT / GENERAL) to team members
- **Visual Analytics** — shift distribution chart, leave request distribution chart, attendance report chart
- **Manager Profile** — view team members and personal details

### 🔐 Security
- JWT tokens issued at API Gateway (10-hour expiry, HS256 signing)
- `OncePerRequestFilter` validates tokens on every request before routing
- Role-based route protection on both frontend (React Router guards) and backend (Spring Security)
- Axios interceptors automatically attach Bearer tokens to every API request

### 📊 Leave Types Supported
`SICK_LEAVE` · `CASUAL_LEAVE` · `VACATION_LEAVE` · `PATERNITY_LEAVE` · `COMPENSATORY_OFF` · `LOSS_OF_PAY`

### 🕐 Shift Types Supported
`MORNING` · `EVENING` · `NIGHT` · `GENERAL`

---

## 📖 API Documentation

### Authentication (API Gateway — :9090)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/login` | Authenticate and receive JWT token |

---

### Employee Management (:9191)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/employees/add-employee` | Add a new employee |
| `POST` | `/api/employees/add-manager` | Add a new manager |
| `POST` | `/api/employees/add-admin` | Add a new admin |
| `GET` | `/api/employees` | Fetch all employees |
| `GET` | `/api/employees/{id}` | Fetch employee by ID |
| `PUT` | `/api/employees/{id}/update` | Update employee details |
| `POST` | `/api/employees/{id}/promote` | Promote employee role |
| `POST` | `/api/employees/{id}/demote` | Demote employee role |
| `POST` | `/api/employees/{id}/delete` | Delete an employee |
| `POST` | `/api/employees/{employeeId}/assign-manager/{managerId}` | Assign manager |
| `GET` | `/api/employees/{managerId}/team-members` | Get team members |
| `GET` | `/api/employees/get-employee-by-shift?shiftType=` | Filter by shift |
| `GET` | `/api/shifts/all` | Get all shifts |
| `GET` | `/api/shifts/{id}` | Get shift by ID |
| `GET` | `/api/shifts?type=` | Get shift by type |
| `PUT` | `/api/shifts/{id}` | Update shift details |

---

### Leave Management (:9192)
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/leave-requests` | Submit a leave request |
| `GET` | `/api/leave-requests` | Fetch all leave requests |
| `GET` | `/api/leave-requests/{leaveId}` | Fetch leave request by ID |
| `PUT` | `/api/leave-requests/{leaveId}/status` | Approve / Reject request |
| `GET` | `/api/leave-requests/by-status` | Filter by status |
| `GET` | `/api/leave-requests/by-status-and-employee` | Filter by status + employee |
| `POST` | `/api/leave-balances` | Add leave balance |
| `GET` | `/api/leave-balances` | Fetch all leave balances |
| `GET` | `/api/leave-balances/{id}` | Fetch balance by ID |
| `GET` | `/api/leave-balances/employee/{employeeId}` | Balances by employee |
| `PUT` | `/api/leave-balances/{id}` | Update leave balance |
| `PATCH` | `/api/leave-balances/adjust` | Adjust balance on approval/rejection |
| `DELETE` | `/api/leave-balances/{id}` | Delete leave balance |
| `POST` | `/api/leave-balances/initialize/{employeeId}` | Initialize balances for new employee |

---

### Attendance Management (:9193)
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/attendances` | Fetch all attendance records |
| `POST` | `/api/attendances/clock-in/{employeeId}` | Record clock-in |
| `POST` | `/api/attendances/clock-out/{employeeId}` | Record clock-out |
| `GET` | `/api/attendances/{id}` | Fetch record by ID |
| `DELETE` | `/api/attendances/{id}/delete` | Delete attendance record |
| `GET` | `/api/attendances/by-employee/{employeeId}` | All records for employee |
| `GET` | `/api/attendances/by-employee/{employeeId}/today` | Today's record |
| `GET` | `/api/attendances/last-attendance/{employeeId}` | Last attendance record |
| `GET` | `/api/attendances/is-clocked-in/{employeeId}` | Check clock-in status |
| `GET` | `/api/attendances/is-clocked-out/{employeeId}` | Check clock-out status |
| `GET` | `/api/attendances/{employeeId}/range/?startDate=&endDate=` | Date range records |
| `GET` | `/api/attendances/by-manager/{managerId}` | Team attendance records |
| `GET` | `/api/attendance-reports/employee/{employeeId}` | All reports for employee |
| `GET` | `/api/attendance-reports/employee/{employeeId}/type/{type}` | Reports by type (WEEKLY/MONTHLY/YEARLY) |
| `GET` | `/api/attendance-reports/employee/{employeeId}/custom?startDate=&endDate=` | Custom report |
| `GET` | `/api/attendance-reports/manager/{managerId}/custom/?startDate=&endDate=` | Team daily summary |

---

## 🖥 Frontend Routes

| Path | Role | Page |
|---|---|---|
| `/login` | All | Login page |
| `/` | Employee / Manager | Role-based dashboard |
| `/profile` | Employee / Manager | Role-based profile |
| `/leaveManagement` | Employee | Leave application & balance |
| `/attendanceManagement` | Employee | Attendance calendar & reports |
| `/manage-employee` | Manager / Admin | Add, promote, manage employees |
| `/manage-leave` | Manager / Admin | Approve / reject leave requests |
| `/manage-attendance` | Manager / Admin | Team attendance overview |

---

## 🚀 Getting Started

### Prerequisites
- Java 21+
- Maven 3.8+
- Node.js 18+ & npm
- MySQL 8+
- Docker (optional)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ELAMS.git
cd ELAMS
```

---

### 2. Set Up MySQL Database

Create the required databases:

```sql
CREATE DATABASE employee_db;
CREATE DATABASE leave_db;
CREATE DATABASE attendance_db;
CREATE DATABASE auth_db;
```

---

### 3. Start Backend Services (in order)

```bash
# 1. Config Server
cd elams-microservices/config-server
mvn spring-boot:run

# 2. Eureka Registry
cd ../registry-server
mvn spring-boot:run

# 3. Employee Management
cd ../employee-management
mvn spring-boot:run

# 4. Leave Management
cd ../leave-management
mvn spring-boot:run

# 5. Attendance Management
cd ../attendance-management
mvn spring-boot:run

# 6. API Gateway (last)
cd ../api-gateway
mvn spring-boot:run
```

---

### 4. Start Frontend

```bash
cd elams-react
npm install
npm run dev
```

The app will be available at **http://localhost:5173**

---

### 5. Docker (Optional)

Each service has its own Dockerfile. Build and run individually:

```bash
# Example: build the API Gateway
docker build -f Dockerfile.gateway -t elams-gateway .
docker run -p 9090:9090 elams-gateway
```

---

## 🔧 Environment Variables

### Frontend (`elams-react/.env`)

```env
VITE_API_URL=http://localhost:9090
```

### GitHub Pages frontend preview

The React frontend is built and deployed to [https://darkk-shadow.github.io/elams/](https://darkk-shadow.github.io/elams/) by the `Deploy ELAMS frontend to GitHub Pages` workflow. The preview serves the frontend only; GitHub Pages does not run the Spring Boot services or MySQL database.

To enable sign-in against a deployed backend, add a repository Actions variable named `VITE_API_URL` containing the public API Gateway URL. The gateway must allow requests from the GitHub Pages origin. Without that backend configuration, the login form is visible but authentication and live data are unavailable.

### Backend — configure in each service's `application.properties` or Config Server:

```properties
# MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/<db_name>
spring.datasource.username=root
spring.datasource.password=yourpassword

# Eureka
eureka.client.service-url.defaultZone=http://localhost:8761/eureka/

# Config Server
spring.config.import=optional:configserver:http://localhost:8888
```

---

## 📁 Project Structure

```
ELAMS/
├── elams-microservices/
│   ├── api-gateway/          # JWT auth, Spring Cloud Gateway routing
│   ├── config-server/        # Centralized configuration
│   ├── registry-server/      # Netflix Eureka service registry
│   ├── employee-management/  # Employee CRUD, shifts, roles
│   ├── leave-management/     # Leave requests & balances
│   └── attendance-management/# Clock-in/out, attendance reports
│
├── elams-react/
│   └── src/
│       ├── components/       # Reusable UI components (by feature)
│       ├── contexts/         # React Context providers (auth, leave, attendance...)
│       ├── pages/            # Page-level components (employee/ & manager/)
│       ├── routes/           # React Router config & auth guards
│       ├── services/         # Axios API service layer
│       ├── themes/           # MUI light/dark theme config
│       └── util/             # Helpers, custom hooks (useMobile, useApi...)
│
├── Dockerfile.gateway
├── Dockerfile.attendance
├── Dockerfile.employee
├── Dockerfile.leave
├── Dockerfile.config
├── Dockerfile.registry
└── README.md
```

---

## 🛡 Security Flow

```
Client → API Gateway → JwtFilter (OncePerRequestFilter)
                            │
                    ┌───────▼────────┐
                    │ Extract token   │
                    │ Validate (HS256)│
                    │ Load UserDetails│
                    │ Set Auth Context│
                    └───────┬────────┘
                            │ Valid ✅
                    Route to downstream service
```

---

## 📄 License

This project is for educational and portfolio purposes.
