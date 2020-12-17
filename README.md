# Cart & Go  
"Cart & Go" allows user to select food & drink from a restaurant with premade menu. The app also allows user to get food/restaurant recommendations based on their location.

#### Visit Our Website Here:  
http://ec2-3-137-176-157.us-east-2.compute.amazonaws.com:3000/

# Languages/Frameworks used 
- JavaScript as frontend tools
- EJS to generate HTML on client-side
- Node.js Express as backend tools 
- MongoDB as the project's main database  

# Functionality
- User Data Management:
    - New users can register/log in using their previously created account.
    - Paswords are hashed, salted, and checked securely.
    - Users can log out.
    - User information are safely stored in a MongoDB database.
    - By correctly entering the username, email, and old password, user can reset their password.
- Food Section:
    - Successfully displayed a premade menu.
    - Users should be able to add meals to their cart and checkout.
    - A notification should pop up on main screen about the total cost of the order.
- Food recommendation by location:
    - Users can see a list of restaurant recommendations based on their nearby location.
    - Users can see a list of famous food in the country they are in.
- Drinks Section:
    - Utilize an free online APIs to generate drinks based on the user's ingredient options. 
- Order History
    - User's order history is saved for future reference in a MongoDB database. User can see their detailed history orders with purchased date, purchased items, quantity, total cost, etc.    

# App Demo
### Log In/Register Page
<img src="demo/login.png" width="500">

### Main Menu
<img src="demo/menu.png" width="500">

### Drink Menu
<img src="demo/drink.png" width="500">

### Nearby Restaurant Recommendation
<img src="demo/nearby.png" width="500">

### Famous Cuisine
<img src="demo/cuisine.png" width="500">

### User's Cart
<img src="demo/cart.png" width="500">

### Order History
<img src="demo/order_history.png" width="500">