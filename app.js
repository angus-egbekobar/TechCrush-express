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
import multer from 'multer'; // Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files. It makes it easy to handle file uploads in your Express applications.
import  fs from 'node:fs'; // fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions.
import checkAuth from './customized-middleware/auth.js'; // Import the custom authentication middleware
import authenticate from './customized-middleware/authenticate.js'; // Import the custom authentication middleware



const app = express(); // Create an Express app. App is an instance of express which contains methods for routing HTTP requests, configuring middleware, rendering HTML views, registering a template engine, and more.This line of code parses our json on line 76
const PORT = 3000;
app.set('view engine', 'ejs'); // Set EJS as the templating engine. This allows you to render .ejs files located in the "views" directory by default.
app.set('views', './routes/views'); // Set the directory where the view templates are located. In this case, it's set to './routes/views'.

app.use(express.json()); //Express will not parse json directly and that is why u need the middleware  to parse JSON request bodies. This allows you to access the request body as req.body in your route handlers.The line of code it is parsing is on line 76
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded request bodies (e.g., form submissions). The extended: true option allows for rich objects and arrays to be encoded into the URL-encoded format, using the qs library.

//the diskStorage () is a method provided by multer to configure how and where the uploaded files should be stored.
//it takes an object with two properties: destination and filename.
// destination is a function that specifies the folder where the uploaded files will be stored. it takes three arguments: the request object (req), the file object (file), and a callback function (cb).
// filename is a function that specifies the name of the file within the destination folder.It takes the same three arguments as destination.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    

    // Check if the 'uploads' directory exists
    if (!fs.existsSync('./uploads')) {
      fs.mkdirSync('./uploads'); // Create the directory if it doesn't exist
    }

    // Pass the directory to Multer
    cb(null, './uploads'); // Ensure the 'uploads' directory exists in your project root
  },
  filename: (req, file, cb) => {
    // Use 'file', not 'image'
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1MB
});


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

app.get('/headers', (req, res) => {
  //console.log(req.headers); // Log all request headers to the console
  //console.log(req.get('User-Agent')); // get is a method and it accesses a specific header (User-Agent in this case)
  console.log(req.headers['User-Agent']); // Another way to access the User-Agent header
  res.set("Custom-Header", "HeaderValue"); // Set a custom header in the response

  /**if(req.headers.api_key !== 'undefined' && req.header.api-key === '12345'){
    res.status(200).json({ 
      message: "Valid API Key",
       email: "contact@example.com",
       username : "JohnDoe"
      });
  }else{
    res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }**/
 //console.log(req.headers['api_key']); // Access the 'api_key' header
// you can set your own custom headers(key and value) in the request, for example, using Postman or curl.
  const apiKey = req.headers['api_key']; // Access the 'api_key' header. this api_key was sent from postman
  if (apiKey && apiKey === '12345') {  // Check if apiKey exists and matches the expected value '12345'
    res.set("server-status","active"); // we can set our own key and value in the response's header using res.set()
    res.status(200).json({ 
      message: "Valid API Key",
      email: "contact@example.com",
      username : "JohnDoe"
    });
  } else {
    res.set("server-status","not active"); // we can set our own custom key and value in the response's header using res.set()
    res.status(403).json({ message: "Forbidden: Invalid API Key" });
  }
  
});

app.get('/search', (req, res) =>{
  //console.log(req.query); // Log all query parameters to the console.These parameters are sent in the URL after the '?' symbol.The URL can be postman
  const {name,age, sex,track} = req.query // Destructure specific query parameters
  res.send(`You searched for : ${name} , ${age} , ${sex} , ${track}`)
})

app.post('/json-data',(req,res) =>{ // the middleware express.json() on line 18 is used to parse JSON request bodies
  // Access the JSON data sent in the request body
  console.log(req.body); // Log the JSON data to the console
  const {username, email, password} = req.body; // Destructure specific fields from the JSON data
  console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
  
  const userid = 200;
  res.json({
    status: "success",
    userid : userid,
    message: "User created successfully",// Send a JSON response back to the client
})
})

app.post('/submit-form',(req,res) => { // the middleware express.urlencoded() on line 19 is used to parse URL-encoded request bodies (e.g., form submissions)
  // Access the form data sent in the request body
  console.log(req)  // Log the entire request object to the console
  console.log(req.body); // Log the form data to the console
  const {username, email, password} = req.body; // Destructure specific fields from the form data
  console.log(`form submitted by : Username: ${username}, Email: ${email}, Password: ${password} `);
  res.send(`Form submitted successfully by : Username: ${username}, Email: ${email}, Password: ${password} `); // Send a response back to the client
})



app.get('/protected', checkAuth, (req, res) => {  // Use the checkAuth middleware for this route to protect it
  res.send('You have accessed to a protected route');
})


app.get('/dashboard', authenticate, (req, res) => { // Use the authenticate middleware for this route to protect it 
  res.send('Welcome to your dashboard!.You are authenticated.');
});

app.post('/upload', upload.single('file'), (req, res) => { // Use the multer middleware to handle file upload. 'profilePic' is the name of the form field that contains the file.
  // Access the uploaded file via req.file
  console.log(req.file); // Log the file information to the console 
  res.send(`file uploaded successfully: ${req.file.filename}`); // Send a response back to the client with the filename
});




// Start the server
app.listen(PORT, () => {
  console.log('Server running on http://localhost:3000');
});