# Ravel Virtual Dressing Room
Our virtual dressing room application provides users with an interactive platform to explore and purchase clothing with advanced customization options. Users can select garments, choose colors, sizes, and quantities, and add them to their cart for easy checkout. The system features account creation and login, enabling users to track orders and manage their preferences.

A unique aspect of this platform is the 3D clothing customization module. Users can fully personalize their garments by:

Changing the color of the item.
- Uploading their own images or using pre-set images to print on the clothing.
- Adjusting the scale and positioning (X, Y, Z coordinates) of the images on the garment.
- Viewing the 3D model in 360 degrees for a comprehensive experience.
- The platform combines convenience and creativity, offering a seamless online shopping experience with innovative customization tools.


# Getting Started with Project

To get started with the project, follow these steps:

1. Clone the Repository: Clone the project repository to your local machine using the following command:
    - git clone <repository_url> 
2. Install Dependencies: Open a terminal within the project directory and run the following command to install all dependencies:
    - npm install 
3. Create .env file: use "MONGO" for your MongoDB url and use "JWT_SECRET" for secret key:
    - JWT_SECRET = "anything"
    - MONGO = "mongodb+srv://xxx:xxx@xxx-xxx.nfsmyma.mongodb.net/?retryWrites=true&w=majority&appName=xxx-xxx"
4. Run Backend Server: Start the backend server by running the following command in the terminal:
    - npm run dev
5. Run Frontend Server: Open a new terminal and navigate to the frontend directory within the project directory using the following command:
    - cd frontend
6. Then, run the following command to start the frontend server:
    - npm run dev
7. Access the Application: Open a web browser and go:
    -  http://localhost:5173/
8. Login: You can log in as an admin, faculty, or student using the provided credentials.
9. With these steps, you should now be able to run the project locally and access it through your web browser.
