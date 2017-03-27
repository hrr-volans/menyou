# menYOU

> Say goodbye to clunky, paper menus covered with food stains. Now it's on your phone! 

It's menYOU - the mobile app that puts YOU in charge of the menu

Peruse food and beverage items, see the daily specials, place your order and pay for your meal all from the convenience of your mobile device!

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

In order make it work locally you must create a database called "menyoudb" so the app can interact with. We have some sample data so can get started, the database must be created before you run the following command. In the terminal, from the main folder you can run:

```> node seed.js```

Now you can start the server (nodemon recommended)

```> nodemon server.js``` 

Here is a summary of the endpoints
```GET /categories```

```GET /menuitems```

```GET /orders```

```GET /valid```

```GET /email```

```GET /useroders```

```GET /deeporders```

```GET /getMax```

```GET /kitchenorders```

```GET /ceateMenuItem```

```GET /authenticate```

```GET /newGetCurrentData```

```GET /menuByCategory - Fetches all menu items associated with given Category\n``` 


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

### Installing Dependencies

From within the root directory:

npm install

### Roadmap

View the project roadmap [https://docs.google.com/document/d/1J3KLJxPpNJb4BoB06lMeAijSEvicMkEbhOcOA-jlQmo/edit#]

## Contributing

*** First off, THANKS for your contribution! *** 

The following is a set of guidelines for adding your kick-ass ideas to an already kick-ass app. Welcome to the club! We're glad to have you...


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

*** Javascript

See _STYLE-GUIDE.md in the project root directory

Get the linter! https://github.com/hackreactor-labs/eslint-config-hackreactor


Got something that falls outside of what's here but you're sure it'll add value to menYOU? Reach out to bryce.dooley@menyou.com

