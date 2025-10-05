//npm install -y
//npm install express
//npm install nodemon --save-dev
//npm install ejs
//"type": "module", // to use ES6 modules in Node.js, you need to set "type": "module" in your package.json file. This allows you to use import and export statements instead of require and module.exports.
//"start": "nodemon app.js" // to run the server using nodemon, which automatically restarts the server when file changes in the directory are detected.
//npm run start // to start the server
//http://localhost:3000 // to access the server in the browser
import express from 'express';
import aboutRoute from './routes/about.js'; // 


const app = express(); // Create an Express app. App is an instance of express which contains methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and more.
const PORT = 3000;
app.set('view engine', 'ejs'); // Set EJS as the templating engine. This allows you to render .ejs files located in the "views" directory by default.
app.set('views', './routes/views'); // Set the directory where the view templates are located. In this case, it's set to './routes/views'.

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to Express JS server home page');
});

// About route (mount the router)
app.use('/about', aboutRoute); // ✅ Use `app.use` to mount the router

// Contact route (can be modularized like about.js)
app.get('/contact', (req, res) => {
  res.status(200).json({ message: "Contact us", email: "contact@example.com" });
});

app.get('/user', (req, res) => {
    res.render('index', { 
    username: 'JohnDoe', 
    email: 'johndoe@example.com' });
});// the render method is used to render a view template. In this case, it renders the 'index' (which is d name of d file u want to render) template and passes an object with username and email to the template.

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});