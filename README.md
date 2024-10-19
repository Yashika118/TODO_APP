## Introduction
This is a simple TODO application built with React Native, designed to help users organize tasks within different groups. Each task includes a title, description, and a completion checkmark. Users can create, edit, and delete groups and tasks, making it an efficient task management tool.

## Features
- **Group Management:** 
  - Users can create, update, and delete groups.
- **Task Management within Groups:** 
  - Users can create, update, and delete tasks within a group.
  - Each task includes a title, description, and completion status.
- **Persistent Storage:** 
  - The application uses AsyncStorage for local data persistence.
- **User-friendly Interface:** 
  - The app features an intuitive UI with easy navigation across different screens.

## Design Choices
- **Component-based Structure:** 
  - The app follows a component-based design to separate concerns and improve code reusability.
- **FlatList for Efficient Rendering:** 
  - `FlatList` is used for rendering groups and tasks to handle large lists efficiently.
- **Expo Router for Navigation:** 
  - The navigation between screens is managed using Expo Router, providing smooth transitions and managing screen stacks.
- **AsyncStorage for Persistence:** 
  - Local storage is achieved through AsyncStorage, allowing data to be saved across app sessions.
- **Separation of Screens:**
  - The app separates major functionalities into different screens:
    - `TodoList.tsx`: Lists tasks within a selected group.
    
## Technical Stack
- **React Native:** The framework used for mobile app development.
- **Expo:** For easy development, building, and testing.
- **TypeScript:** For type safety and better code management.
- **AsyncStorage:** For data persistence within the app.
- **React Navigation (via Expo Router):** For seamless navigation between screens.