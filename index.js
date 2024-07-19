// index.js

const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db');

// Set EJS as the template engine
app.set('view engine', 'ejs');

// Middleware to parse incoming request bodies
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: true }));
// Establish database connection
const con = db();

app.use(express.static(path.join(__dirname, 'public')));
// Routes
app.get('/', (req, res) => {
    res.render('home'); // Render the home page
});

// Route to handle movie booking
app.get('/booking', (req, res) => {
    const moviename = req.query.movie; // Get the movie name from query parameter

    // Render the booking page and pass moviename to the template
    res.render('booking', { moviename: moviename });
});

// Route to handle form submission (buy ticket)
app.post('/booking', (req, res) => {
    const movie = req.body.movie;
    const selectedTime = req.body.showtime; // Get the selected showtime from the form submission
    const show = req.body.time;
    const count = req.body.count;

    let price;
    let totalprice;

    if (selectedTime) {
        // Calculate price and total price based on show time
        switch (show) {
            case 'Morning':
                price=180;
                totalprice=price*count;
                break;
            case 'Afternoon':
                price = 180;
                totalprice=price*count;
                break;
            case 'Evening':
                price = 200;
                totalprice=price*count;
                break;
            case 'Night':
                price = 200;
                totalprice=price*count;
                break;
            default:
                price = "Price not found";
                break;
        }
        totalprice = price * count;

        // Insert booking details into the database
        const query = `INSERT INTO BOOKINGS (MOVIE_NAME, PEOPLE, PRICE, SHOW_TIME, TIME, TOTAL_PRICE) VALUES ('${movie}', ${count}, ${price}, '${show}', '${selectedTime}', ${totalprice})`;

        con.query(query, (err, result) => {
            if (err) {
                console.log(err);
                res.send('Error booking the ticket');
            } else {
                console.log('Booking successful');
                // Render ticket details page with booking information
                res.render('ticket-details', {
                    movie_name: movie,
                    time: selectedTime,
                    show: show,
                    price: price,
                    totalprice: totalprice,
                    count: count
                });
            }
        });
    } else {
        res.send("Please select a time");
    }
});

// Start the server
const port = 2000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
