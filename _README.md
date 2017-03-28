# menYOU

MenYOU is a web-based ordering system for use on an in-store kiosk or on a mobile device that lets restaurants take orders, track orders and communicate with their customers. 

menYOU puts YOU in charge of the menu! Peruse food and beverage items, see the daily specials, place your order and pay for your meal all from the convenience of your mobile device!

## Team

  - __Product Owner__: Ignacio Palma
  - __Scrum Master__: Bryce Dooley
  - __Development Team Members__: Preston Moore, Shane Tanguis

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    1. [Tasks](#tasks)
1. [Team](#team)
1. [Contributing](#contributing)

## Usage

After forking and cloning the app to your local machine, you must install the dependencies with npm install. You must have Postgres Database installed, npm and node.

```> sudo npm install```

In order make it work locally you must create a database called "menyoudb" so the app will have a DB to interact with. Once you have installed PostgreSQL, enter this in the terminal command line:

```> createdb menyoudb```

We have some sample data so can get started. Once you have created the DB, in the terminal, from the main folder run:

```> node seed.js```

Note: Currently, category names need to be stored in sentence case (first letter capitalized).

This may appear to freeze your console. Hit Ctrl-C to exit out and your DB should be seeded fine.

Now you can start the server (nodemon recommended)

```> nodemon server.js``` 

In your browswer, go to localhost:5000. 

Note: if this is the first time you are running the app locally, make sure your local  storage does not have anything saved from the app. This can be done by clearing your cache, or manually deleting from local storage in your browser. 

Here is a summary of the endpoints
```GET /categories```

```GET /menuitems```

```
  POST /orders
    // Creates a new order record and its related suborders
    // It expects a JSON object containing the order and a menuitems 
    // property with its suborders associated:

    { customer: 'Alice Green',
      totalprice: '20.22',
      menuitems: [ 
        { id: 13,
          name: 'cool lunch',
          description: 'bla bla bla',
          price: '12.23',
          category_id: 2,
          quantity: 1 },
        { id: 7,
          name: 'Grilled Cheese Sandwich',
          description: 'Tasty grilled cheese sandwich',
          price: '7.99',
          category_id: 2,
          quantity: 1 
        } 
      ] 
    }
```

```GET /valid```

```
  GET /useroders
    // This endpoint will return orders for a specific client.
    // Since we are not login in clients nor storing them in DB
    // the data comes from the local Storage in the browser.
    // it expect an array of orders id. Returns JSON in this shape:

    { orders_ids: '[88,89,90]' } 
```

```GET /deeporders - Fetches orders by id. Subsequent suborders included.  ```

```GET /getMax - Gets most recent order ```

```
	GET /kitchenorders?last_id=20
		// This endpoint will return the last orders since the previous request
		// When opening the kitchen page, will default to 0 it will bring them all
		// subsequent request must specify the last order id so it will return only the new ones
		[
		  {
		    "id": 24,
		    "customer": "Bryce",
		    "totalprice": "12.99",
		    "complete": false,
		    "menuitems": [
		      {
		        "id": 38,
		        "description": "Philly Cheese Sandwich",
		        "subtotalprice": "12.99",
		        "quantity": 1,
		        "id_orders": 24,
		        "id_menuitems": 2
		      }
		    ]
		  }
		]
```

```GET /ceateMenuItem```

```GET /authenticate```

```
  GET /newGetCurrentData?current_time=22
  	// This endpoint is expecting a query params related to current time
  	// It returns proper data to the specific time of the day

  	{
		  "menuItems": [
		    {
		      "id": 1,
		      "name": "Walker Texas Brisket",
		      "description": "Texas sized burger in walker sauce",
		      "price": "12.99",
		      "category_id": 3
		    }
		  ],
		  "categoryName": {
		    "name": "Dinner",
		    "id": 3
		  }
		}
```
```
GET /menuByCategory 
  // Fetches all menu items associated with given Category, returns JSON
  {
    "Dinner": [
      {
        "id": 1,
        "name": "Walker Texas Brisket",
        "description": "Texas sized burger in walker sauce",
        "price": "12.99",
        "category_id": 3
      }
    ],
    "Deserts": [
      {
        "id": 12,
        "name": "Mango Spritzer",
        "description": "Mango and orange juice in champagne",
        "price": "7.99",
        "category_id": 4
      }
    ]
  }
``` 

``` POST /email - Sends validated email ``` 

```POST /valid - Validates an email address```

User

Upon opening app, user chooses which menu they'd like to access via a slider - Breakfast, Lunch, Dinner or Drinks. User touch/clicks the items they wish to purchase. 

Upon touch/clicking any menu item, a suborder component appears below the menu item list displaying the chosen item, its quantity, the cost per item and the total amount of all items. Subsequent touch/clicks to the same menu item increases the quantity in the suborder section. Touch/clicking the item in the suborder component decreases the quantity (if > 1) or removes the item altogether. 

Below the suborder component is a "Place Order" button, the pressing of which sends the order for processing and takes the user to a thank you/order summary page which displays the order total and an order number. 

There is an optional field into which the user can enter an email address for discounts/special offers and a "Back to Home" button which returns them to the home page for the next order.

Admin

Admin users can add an item to the menu or add a Category (i.e. Breakfast, Lunch, etc.).

Kitchen 

Kitchen users can toggle between a list of completed orders or pending orders. 

The display lists the Order ID, customer name, the menu items associated with the order and a "Done" button which moves a pending order to a "completed" status.

## Requirements

- Node 6.10.x
- Postgresql 9.4.x

## Development
![diagram](https://drive.google.com/uc?export=view&id=0B25X__DxySt2M3JyTGt6dW5mMkk)

### Installing Dependencies

From within the root directory:

npm install

(Optional) - The app currently uses SCSS, and moving forward you can either continue to use the SCSS or make edits directly in the CSS files and abondon SCSS. To compile SCSS you'll need Compass installed on your computer. Once installed just run ```grunt compass``` or ```grunt --watch compass``` to compile.

##Additional Dependencies (outside of package.json)
- Neat 1.8.0 (currently pulled in via script in index.html)
- Bourbon 4.2.7 (currently pulled in via script in index.html)
- Angular (currently pulled in via script in index.html)
- Slick Slider (currently pulled in via script in index.html)

### Roadmap

View the project roadmap [https://docs.google.com/document/d/1J3KLJxPpNJb4BoB06lMeAijSEvicMkEbhOcOA-jlQmo/edit#]

## Contributing

*** First off, THANKS for your contribution! *** 

The following is a set of guidelines for adding your great idea to an already great app. Welcome to the club! We're glad to have you...


Code of Conduct

This project adheres to the Contributor Covenant Code of Conduct (http://contributor-covenant.org/version/1/4). By participating, you are expected to uphold this code. Please report unacceptable behavior to bryce.dooley@menyou.com.


How Can I Contribute?

*** Bug Reports

 - Use a clear and descriptive title
 - Describe the exact steps which reproduce the problem and be as detailed as possible (Imagine explaining it to a 12-year-old who's never seen this codebase before)
 - Describe the behavior you observed after the listed steps
 - Explain what you expected to happen instead of what did
 - Include screenshots if possible and any other information that might help 

*** Suggest Enhancements

These are tracked as GitHub issues (Learn more about GitHub issues here: https://guides.github.com/features/issues/)


Styleguide

*** Git Commits and Pull Requests

 - In regard to commit and PR notation, shoot for brevity with accuracy (less is more as long as we can understand you)
 - In general, think of commits and PR notations in terms of ending this sentence: "When added to the codebase, this commit/PR will..."

**************************************************

IMPORTANT: 

You MUST MUST MUST rebase (git pull --rebase upstream master) and resolve any issues immediately before submitting ANY pull request

**************************************************

For more detail, see _CONTRIBUTING.md in the project root directory

*** Javascript

Get the linter! https://github.com/hackreactor-labs/eslint-config-hackreactor


Got something that falls outside of what's here but you're sure it'll add value to menYOU? Reach out to bryce.dooley@menyou.com

