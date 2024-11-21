# Growl

This project is a Web App developed using **React + Vite**. It offers features such as recipe searching,  
bookmarking and filtering by ingredients, colories and diet type.

## Main features:

### User authentication:
- Register and login.
- Profile editing.
- Contact form.

### Search
- Allows to search and filter amongst lots of recipes thanks to **Edamam API**.

### Detailed food page
- Specific page for each recipe to display all its data such as ingredients, allergens, diet to which it could belong 
etc.

### Error handling 
- Custom 404 page with an animation.

## Project Structure:
The project is organized in the following folders
- `src/`: Our project folder.
  - `assets/`: Contains images and static resources
  - `css/`: The folder where all css styles can be found.
  - `font/`: The folder where all external fonts used can be found.
  - `components/`: Contains reusable components, in this project and to organise it better, apart from the components 
  folder filled with components used on different pages, I've added an specific components folder on each page folder.
  - `helpers/`: JS functions that, as its name tells, help us doing specific task in our app.
  - `layouts/`: General private and public layout folder
    - `LayoutPublic/`: Our public Layout folder. 
  - `pages/`: Our app main pages folder.
  - `router/`: App routes config.

## Routing

This app uses **react-router-dom** to handle routes, the following routing is the one I've implemented:<br>
Root Route (`/`):<br>
It displays the public layout and the home page (`Home`)

User related routes: <br>
- `/login`: Login page
- `/sign-in` Sign in page
- `/profile` Profile page
  - `/profile/edit` Profile edit page
- `recipe/:id` Specific recipe page

Errors: <br>
Custom 404 error page when the route isn't found