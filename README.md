# Computer Store Management Dashboard Client

This project is a Computer Store Management Dashboard Client aimed at providing a user-friendly interface for managing computer inventory and sales. It is built using React. The client application offers various features including authentication, CRUD operations for managing inventory, sales management, comprehensive filtering options, real-time UI updates, efficient state management using Redux, and bulk delete functionality.

## Features

### 1. Authentication
- **User Registration and Login**: Users must register and log in to access the dashboard. JWT (JSON Web Tokens) are used for secure authentication. For now, there will be a single role, essentially a user responsible for managing the system.

### 2. Functionality
- **CRUD Operations**: Users can perform CRUD operations on computer items in the inventory.
  - **Create**: Add a new computer item to the inventory.
  - **Read**: View the list of computer items.
  - **Update**: Update computer item details.
  - **Delete**: Remove computer items from the inventory.
- **Robust Filtering System**: Implement a comprehensive filtering system to effectively narrow down computer item selections based on various criteria.
- **Bulk Delete**: Users can efficiently manage their inventory by implementing a bulk delete feature for computer items.

### 3. Sales Management
- **Create Sale**: Users can create sales transactions, providing details such as quantity, buyer name, product name, price, and sale date. If the quantity reaches zero, the product will be automatically removed from the inventory.

### 4. Comprehensive Computer Items Filter System
- **Category Filter**: Allow users to set a filter for specific computer item categories (e.g., monitors, RAM, graphics cards).
- **Brand Filter**: Implement a real-time search functionality for computer item brands.
- **Compatibility Filter**: Enable searching by compatibility with different systems (e.g., Windows, Mac).
- **Price Range Filter**: Implement a price range filter for computer items.
- **Interface Filter**: Allow users to filter computer items based on interface types (e.g., USB, HDMI, Thunderbolt).
- **Condition Filter**: Implement a filter for new or used items.
- **Capacity Filter**: Include a filter for items with varying capacities (e.g., storage capacity for hard drives).
- **Additional Relevant Filter Parameters**: Introduce other relevant filter parameters such as color, form factor, or any custom attributes associated with the computer items.

### 5. User Interface Features
- **Real-time UI Updates**: Gracefully update the UI in real-time when changes occur (e.g., product updates, sales, etc.).
- **Efficient CRUD Operations**: Utilize RTK Query for efficient CRUD operations.
- **Re-fetching Functionality**: Implement Re-fetching functionality to ensure data accuracy and consistency.

### 6. State Management
- **Redux**: Utilize Redux for state management to maintain a consistent application state.

## Tools Used
- React
- Shadcn
- Typescript
- Redux
- TailwindCSS
- Zod
- React-Hook-Form
- React-Router

## Getting Started
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the client application using `npm run dev`.
