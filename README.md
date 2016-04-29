# mondodbbasic
basic mongodb exercise

install [mongoDb](https://www.mongodb.org/downloads#production) for windows.  You may need to add windows environment variables for mongodb bin folder.

create a db folder next to the package.json.

`mkdir db`

start the mongodb server by running:

`mongod --port 27017 --dbpath db`

now in another console run

`npm start`

now you can use postman to run:

* GET http://localhost:3000/document
* POST http://localhost:3000/document
* DELETE http://localhost:3000/document