# Don Dapper
This project is for the Grace Shopper portion of Fullstack Academy. It is a collaborative effort by Ben Rosenbaum, Alon Adelson, and Marco Poetry Chen. Their GitHub profiles can be found below.
- https://github.com/biny235
- https://github.com/ajkatom
- https://github.com/marcopchen

## Using Site
You may browse through products and shop as you would on any other e-commerce website. You can add to cart, edit your cart, and remove items. You can update your user info and change password. You'll have to log in or sign up in order to check out. Feel free to use your own e-mail address to receive an e-mail upon placing an order. You can use the test card number "4242 4242 4242 4242" with any CVC number and a valid expiration date for Stripe. This site is for demonstrative purposes only, so using sensitive information like your usual password or address on the deployed build is not recommended.

## Deployed Build
This project has been deployed via Heroku and can be accessed through the following link.
- https://dondapper.herokuapp.com

## Local Build
To run this project locally, clone the repo and run the following commands in your terminal. This will ensure proper package installation and data seeding.

```
npm install
npm run seed
npm run start:dev
```

### Seed
We used Sequelize to created a database of users, products, categories, orders, line items, and addresses. Default data is included in the seed file. We have prepared an admin profile with the e-mail address "admin@test.com" and a regular user profile with the e-mail address "user@test.com". Default password is "123" for all seeded users.

### Variables
There is some functionality that requires sensitive information, which can be added as process environment variables. For example, you would run the following to set and unset `PASSWORD` as a variable.

```
export PASSWORD=Password1
unset PASSWORD
```

#### Google
You'll need an API key for Places from Google.

#### SendGrid
You'll need an username and password from SendGrid.

#### Stripe
You'll need a publishable API key and the corresponding secret key from Stripe.

### Testing
Test specs can be ran with the following command.

```
npm run test:dev
```
