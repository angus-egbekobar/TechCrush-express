// the goal here is to decluster the main app.js file by moving the route handling logic to a separate file
// this is done by creating a new file routes/about.js and moving the about route logic there
// then we import the router from about.js in app.js and use it with app.use('/about', aboutRoute)
// this way, the main app.js file is cleaner and more maintainable// aboutRoute is a router object that contains the route handling logic for the /about path
// we use app.use('/about', aboutRoute) to mount the router on the /about path
// this means that any request to /about will be handled by the aboutRoute router
// the aboutRoute router can have multiple routes defined in it, and they will all be prefixed with /about
// for example, if aboutRoute has a route defined for /me, it will be accessible at /about/me
// this modular approach helps in organizing the code better, especially as the application grows
// it also makes it easier to maintain and test individual parts of the application
//you can create more route files like about.js for other parts of your application, such as contact.js, products.js, etc.
// this way, each route file can handle its own routes and logic, keeping the main app.js file clean and focused on application setup and configuration
// this is especially useful in larger applications where you have many routes and complex logic
// it also promotes reusability and separation of concerns, as each route file can be developed and tested independently
// overall, using routers and modularizing your routes is a best practice in Express.js development
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    Message: 'About us',
    Description: "Express.js Application Business"
  });
});

router.get('/me', (req, res) => {
  res.json({
    Message: 'About me',
    Description: "Express.js Application Business"
  });
});

export default router;