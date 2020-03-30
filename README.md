COMP249 Web Technology 2019: Javascript Web Application
Sophie Kaelin (45198543)

*** Overview ***
    The aim of his project is to design, create and implement the front-end code for the WT online store web application using javascript. The end product will be an interface to the store, allowing you to view items and them to your cart. I have used jQuery to complete this task, but have not used Handlebars.

*** How Implementation Fits Together ***

-- Startup --
    On startup, the application makes a get request to both ‘/products’ and ‘/cart’ which contain the json representations of our items. The values of these requests will be passed into local javascript variable arrays, which will be used to update the information on our page. Upon the success of both of these requests, an event ‘dataChangedEvent’ is dispatched to begin updating our front-end code to create the interface for the online store.

-- Data Changed Event --
    The ‘dataChangedEvent’ is called whenever:
        -> The page is generated
        -> The values in the cart are updated
        -> The order of our products in the product table are manipulated (re-sorted).
    When this event is called, the table is regenerated, and the values inside our view cart table are adjusted to represent the current state of the cart.
    It also contains all of our click handlers. This event must be dispatched whenever data is changed so that our click handlers are always enabled.

    The click handlers call various other functions created such as:
        -> updatecart(). Updates the table containing the values of the cart on the page.
        -> sortCost(). Sorts the table of products by cost in ascending order.
        -> sortName(). Sorts the table of products alphabetically by name.
        -> createProductTable(). Adds the products to the table in the order they are currently sorted in.

*** Implemented Features ***

-- Show Product Table
    This was not implemented using handlebars, as I felt it was much easier to use the append and empty functions to manipulate the values of HTML tables. This was accomplished using a standard for loop to iterate through each of the products in the array and add the details to the table for each. The id of each row was set to the product id of the item. This made accessing the item data much easier in future operations.

-- Click Product to Display Details
    When you select a product name from the product table, details including an image, description and cost will be displayed beside the table. This was accomplished using a click handler which took the row id and looped through the array of products to find the product which the matching id. Using those details, the division containing ‘more details’ could be populated, or re populated. There was also an added close button when an item was selected, that when clicked will hide the ‘more details’ division, removing it from display.

-- Add Item To Cart Form
    When the division containing more details of a product is shown, a form allowing you to add that item to your cart is also visible. The default method for posting a request to the database had to be overridden, using ‘preventDefault()’, to stop the redirection to the ‘/cart’ page. This was overridden with a manual post request which posted the serialised form data, and upon success, posted a get request to retrieve the updated cart array. This manual request was made to stop the redirection and refreshing of the index page.

-- Visible state of cart
    The number of items and total cost of a cart is always visible. When a user adds a new item to the cart, this display is immediately updated as a consequence of the manual post request made when the cart is updated.

-- View more cart details
    Clicking on the cart icon will show a table with the current cart contents as well as the current total cost. Clicking the close icon will hide this from display.

*** Extension Features ***

-- Sorting of products table --
    I implemented two sorting functions to sort the products array by name or by the cost of each product. When either of the table headings are clicked, the sorting function is called and the ‘dataChangedEvent’ event is dispatched to update the table values and re-activate click handlers.

-- Update product quantity in cart --
    This was not implemented.
