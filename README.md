# Internship Management System (IMS) - Admin Portal Frontend

A premium, responsive administrative dashboard for managing the Internship Management System. Built with a focus on visual excellence and seamless user experience.

## 🎨 Design Philosophy

The portal features a **premium, glassmorphic UI** with vibrant aesthetics, dynamic background elements, and smooth micro-animations to provide a state-of-the-art administrative experience.

## 🚀 Tech Stack

- **Framework**: React 19 (Vite)
- **State Management**: Redux Toolkit & React-Redux
- **Routing**: React Router 7
- **Styling**: Tailwind CSS 4 with custom glassmorphism
- **Table System**: @tanstack/react-table
- **Icons**: Lucide React & React Icons
- **Notifications**: React Toastify
- **UI Components**: Shadcn UI (Radix UI primitives)
- **API Client**: Axios with custom API processor
- **PDF Generation**: jsPDF

## 🛠 Features

- **Dynamic Dashboard**: At-a-glance metrics (Live soon).
- **User Management**: 
  - Admin view for managing all staff/admins.
  - Role-based visibility (Staff cannot edit/delete).
  - Search by Name, Email, or ID.
- **Internship Management**:
  - High-impact detail views with functional tabs.
  - Active/Inactive status management.
  - Real-time applicant counters.
- **Application Tracking**:
  - Comprehensive list of all internship applications.
  - Rich detail views for candidate profiles.
  - Status management (Pending, Approved, Rejected).
- **Secure Authentication**: Protected routes with token-based session management.

## 🚦 Getting Started

### Prerequisites

- Node.js installed
- Running Backend API

### Installation

1. Install dependencies:
   ```bash
   yarn install
   ```

2. Configure environment variables (Create a `.env` file):
   ```env
   VITE_BASE_API_URL=http://localhost:8000
   ```

3. Run in development mode:
   ```bash
   yarn dev
   ```

4. Build for production:
   ```bash
   yarn build
   ```

## 📂 Project Structure

- `src/components/`: Reusable UI components and table layouts.
- `src/features/`: Redux slices, actions, and API definitions.
- `src/pages/`: Main page components (Auth, Internship, Applications).
- `src/hooks/`: Custom React hooks (Forms, etc.).
- `src/services/`: API communication layer.
- `src/styles/`: Global CSS and Tailwind configuration.
