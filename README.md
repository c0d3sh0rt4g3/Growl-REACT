# Growl

# Index

1. [Introduction](#introduction)
2. [Main features](#main-features)
   - [User authentication](#user-authentication)
   - [Search](#search)
   - [Detailed recipe page](#detailed-recipe-page)
   - [Profile managing](#profile-managing)
   - [Error handling](#error-handling)
3. [Project Structure](#project-structure)
4. [Routing](#routing)
5. [API Integration and Asynchronous Communication in Growl](#api-integration-and-asynchronous-communication-in-growl)
   - [SearchPage Component](#searchpage-component)
6. [Figma](#design-on-figma)
7. [Deployment](#deployment)
8[Deployment](#video-presentation)
9[Final conclusion](#final-conclusion)

## Introduction
This project is a Web App developed using **React + Vite**. It offers features such as recipe searching,  
bookmarking and filtering by ingredients, colories and diet type.

## Main features:

### User authentication:
- Register and login.
- Profile editing.
- Contact form.

### Search
- Allows to search and filter amongst lots of recipes thanks to **Edamam API**, as well as bookmarking them.

### Detailed recipe page
- Specific page for each recipe to display all its data such as ingredients, allergens, diet to which it could belong 
etc.

### Profile managing.
- Main profile page where we can see our bokkmarked recipes and deleted them from bookmarks as well.
- Edit profile page where we can edit some profile settings such as our name, profile picture and recipes tags.

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
    - `LayoutPrivatec/`: Our private Layout folder. 
  - `pages/`: Our app main pages folder.
  - `router/`: App routes config.

## Routing

This app uses **react-router-dom** to handle routes, the following routing is the one I've implemented:<br>
Root Route (`/`):<br>
It displays the public layout and the home page (`Home`)

User related routes: <br>
- `/login`: SignUp page
- `/sign-in` Sign in page
- `/contact-us` Contact form page
- `/profile` Profile page
  - `/profile/edit` Profile edit page

Search route(`/search`): <br>
- `/search` Our recipe searching page.
  - `/search/recipe/:foodId` Specific recipe page

Errors: <br>
Custom 404 error page when the route isn't found

## API Integration and Asynchronous Communication in Growl

This project utilizes the Edamam public API to fetch real-time data about food recipes. The integration and asynchronous 
communication are implemented in the `SearchPage` component, leveraging **React hooks** (`useState`, `useEffect`) to 
manage local state and handle the lifecycle of API requests.

### Implementation Details

### `SearchPage` Component
The `SearchPage` component is the only part of the app that interacts directly with the API. Its primary purpose is to allow users to search for recipes and navigate through the results pages.

#### HTTP Request Management
The `fetch` method is used for asynchronous API requests. The data received is processed and dynamically updated in the user interface.

**Example Request:**
```javascript
const fetchData = async (url) => {
    try {
        setLoading(true)
        const response = await fetch(url)
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setResults(data.hits.map(hit => hit.recipe))
        setNextPage(data._links?.next?.href || null)
    } catch (error) {
        setError(error.message)
    } finally {
        setLoading(false)
    }
}
```
![request_example.png](src%2Fassets%2FAPI_display_example.png)
#### Local States in SearchPage

- `results`: Holds the recipes fetched from the API.
- `loading`: Tracks whether data is being loaded.
- `error`: Stores any errors that occur during API requests.
- `nextPage`: URL for loading the next page of results.
- `prevPages`: A history of previously visited pages to enable backward navigation.

### Pagination

The Edamam API supports pagination, and the SearchPage component implements this feature using the following controls:

- "Next Page" Button: Fetches the next page using the URL stored in nextPage.
- "Previous Page" Button: Navigates back to the previous page using the prevPages history.

**Navigation Handling Example:**
```javascript
const loadNextPage = () => {
    if (nextPage) fetchData(nextPage)
}

const loadPreviousPage = () => {
    if (prevPages.length > 1) {
        const previousPage = prevPages[prevPages.length - 2]
        setPrevPages(prev => prev.slice(0, -1))
        fetchData(previousPage, false)
    }
}
```
![pagination_example.png](src%2Fassets%2Fnext_and_prev_example.png)
### Dynamic User Interface

The data fetched from the API is dynamically rendered using the FoodCard component. This component displays relevant 
information, such as:

- Recipe name.
- Image.
- Calories.

**Conditional Rendering Example:**
```javascript
if (loading) return <div>Loading...</div>
if (error) return <div>Error: {error}</div>

return (
    <div>
        {results.length > 0 ? (
            results.map((food, index) => <FoodCard key={index} food={food} />)
        ) : (
            <div>No results found.</div>
        )}
    </div>
)
```
### Loading and Error Handling
- While data is being fetched, a "Loading..." message is displayed.
- If an error occurs (e.g., network issues or a non-successful HTTP status), an error message is shown to inform the 
user.

### Example Workflow
#### SearchPage Initialization
- An initial request is made to the API with default parameters (e.g., recipes for a high-protein diet).
- The results are processed and displayed as recipe cards.

**Initial Request Example:**
```javascript
useEffect(() => {
    const query = ""
    const diet = "high-protein"
    const appId = import.meta.env.VITE_EDAMAM_APP_ID
    const appKey = import.meta.env.VITE_EDAMAM_APP_KEY

    const initialUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${appId}&app_key=${appKey}&diet=${diet}`
    fetchData(initialUrl)
}, [])
```

## Figma
Link to initial design on figma: [Growl](https://www.figma.com/design/95BlLMMDkeTdRIZzDvuEIk/Proyecto-Sass?node-id=0-1&t=8oFpFg4GZkfdGPok-1)

## Deployment
App deployed on netlify: [Growl](https://growl-react.netlify.app)

## Video presentation
Video presentation: [Video](https://drive.google.com/drive/folders/1mqeb5yG0UgP9YCgIMZpm79oftsTrVtL?usp=sharing)

## Final conclusion
With this project I consider I've improved my skills on React, I've faced some problems with the API like trying to 
paginate it due to how the API is made, it got successfully fixed just by, I also got some problems with Formik because 
in a first stance, I didn't understand it correctly, after reading and seeing examples online I got no further problem, 
finally I also experienced problems while leraning how REACT handles css styles, I managed to style my page while 
investigating it, anyways, I recognise it's hasn't the better practises on a design matter so it'll be improved in future 
projects.