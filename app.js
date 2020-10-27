const { send } = require("process");

express = require("express");
app = express();

hotel = require("./hotel.json");

// Get Details of Hotels
app.get("/details", function(req, res)
{
    nameList = [];
    hotel.forEach(element =>
    {
        nameList.push(element.name) // this will only send name of the hotel, for full detail use push(element) 
    });
    res.send(nameList);
})

// Search Hotel by City (Mysore, Banglore and Hyderabad)
app.get("/searchByCity", function(req, res)
{
    keyword = req.query.sCity;
    searchCity = [];
    hotel.forEach(element =>
    {
        if(keyword == element.city)
        {
            searchCity.push(element.name); // this will only send name of the hotel, for full detail use push(element)
        }
    });
    res.send(searchCity);
})

// Search Hotel by Type (Veg/Non-Veg)
app.get("/searchByType", function(req, res)
{
    keyword = req.query.sType;
    searchType = [];
    hotel.forEach(element =>
    {
        if(keyword == element.type)
        {
            searchType.push(element.name); // this will only send name of the hotel, for full detail use push(element)
        }
    });
    res.send(searchType);
})

// Search by Cuisine (Indian, Arabian and Italian)
app.get("/searchByCuisine", function(req, res)
{
    keyword = req.query.sCuisine;
    searchCuisine = [];
    hotel.forEach(element =>
    {
        for (const key in element.cuisine)
        {
            if(keyword == element.cuisine[key])
            {
                searchCuisine.push(element.name);
            }
        }
    });
    res.send(searchCuisine);
})


// Server Listening...
app.listen(3000, function(req, res)
{
    console.log("Server listening to port 3000");
})

