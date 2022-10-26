# Y-Eat
[Y-Eat](https://y-eat.herokuapp.com/) is clone inspired by [Yelp](https://www.yelp.com/).
Y-Eat can be used to create and showcase one's businesses, and allow other users (customers/visitors) to rate and review their businesses.

## Wiki Links
- [API routes](https://github.com/tylernaej/YelpClone/wiki/API-routes)
- [Database Schema](https://github.com/tylernaej/YelpClone/wiki/Database-Schema)
- [Features List](https://github.com/tylernaej/YelpClone/wiki/Features-List)
- [Redux State Shape](https://github.com/tylernaej/YelpClone/wiki/Redux-State-Shape)
- [User Stories](https://github.com/tylernaej/YelpClone/wiki/User-Stories)

## Technologies

### Frontend
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Backend
- ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
- ![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)

### Hosting
- ![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Pages

### Splash Page
- On the splash page, 3 main components can be found.
- The NavBar where a user can log in or sign up
- The body that welcomes the user to Y-Eat, and a button to see all the businesses listed on the app
- The footer that includes information about this project, and links to get to know the devs
![image](https://user-images.githubusercontent.com/75222415/191868640-df716f8a-98a9-4f0c-ab85-a0c452741178.png)

### All Businesses Page / Search Page
- On this page, a user can see businesses, and also search / filter through the businesses to find a specific one they are looking for
- A user can also click on the different business cards to be redirected to the business' page
![image](https://user-images.githubusercontent.com/75222415/191868890-a26bcdb5-f3a0-49a3-92d9-b97c7d0bcc9f.png)

### Business Page (About)
- A page to see more details about the business
![image](https://user-images.githubusercontent.com/75222415/191871541-8b3f6751-e6b0-48e9-ae0f-dce228a0a106.png)

### Business Page (Reviews)

#### Reviews
- Users can see reviews about the specific business currently being viewed
- A button to create / edit a review is also available on this page
![image](https://user-images.githubusercontent.com/75222415/191871634-d0067954-248e-45a4-bb9d-98b741e683fb.png)

### Create / Edit Review
- Create a new review or edit your existing review for the business
![image](https://user-images.githubusercontent.com/75222415/191871721-ae1f8a31-c649-4132-9af0-fdeb80f3ed21.png)


### Create Business
- Creating a business is split into 3 forms

#### Info
- The main info/details of the business
![image](https://user-images.githubusercontent.com/75222415/191871848-4e825f08-8193-4e40-8ae0-f39492012572.png)

#### Categories
- Categories are available for the user to choose from for their business
![image](https://user-images.githubusercontent.com/75222415/191872020-4eafb62c-676d-4f6c-b9df-03bd2824e45a.png)

#### Amenities
- Amenities are also available for the user to choose from to describe further about their business
![image](https://user-images.githubusercontent.com/75222415/191872022-01c73ceb-79f4-4fa4-b37e-d34bc292066e.png)

## Run Locally
- Clone the repository
- cd into the project directory and run ``pipenv install`` 
- Create a ``.env`` file in the root of the project and add the following variables
```
SECRET_KEY=<<SECRET_KEY>>
DATABASE_URL=sqlite:///dev.db
```
- Create another ``.env`` file in the root of the react-app directory and add the following variables
```
REACT_APP_BASE_URL=http://localhost:5000
```
- You will need two terminals to run this locally.
- The first terminal will be used for the backend server, run ``pipenv shell``
- Then run the following commands in the terminal
```
flask db upgrade
flask seed all
```
- The second terminal will be used for the frontend server. cd into the react-app directory and run the following commands
```
npm install
```
- Finally run the following command in the second terminal while still in the react-app directory
```
npm start
```
