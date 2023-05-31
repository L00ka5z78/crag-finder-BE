# crag-finder-BE

 ### Crag finder is a application when one can look for climbing areas in whole world. 
 
One can see crags on the map as a pins. After clicking a pin, you will see details, like
coordinates (lattitude, longitude), how many routes is at the crag, and short description.
There is a register, login, logout feature. If you are logged in, you can, add new crags or update exisiting.
Also, there is an admin role. 

  ### This is a backend to this project and all features are tested in Postman and works well.
  
  There are several branches to make project structure clear. Crag Crud operations was written with Test Driven Development.
  It means that tests was created at the beginning and methods was built after that.
  
  
  I added also some metrics, where one can test application speed and check if it works smooth.
  I used Prometheus (prom-client, and response-time)
  
  
  
## About 
I used Typescript in general, created Mysql2 database with uuid package to make Id's safe.
Also, there is bcrypt package in authentication process, to hash and secure password 
and jsonwebtoken to create tokens during authentication - authorization process.

Rate limiter is added to make app a little bit robust in case of to many requests in given time.

There is a user route and controller, but it is only for testing purposes, to check if logged in
user is redirected to other endpoint. (will be removed soon)

### Note that frontend of this app is still in progress and not all features are built yet. (31.05.23)

Im not frontend dude, so it will take some time for sure, but backend is actually done. There might be some issues,
but I didnt found anything right now. I started with create some Swagger documentation on separate branch, but 
I guess it will be added as a last thing when the fronteng is ready in  most of cases.


## Tech stack used in backend:

* Express
* Typescrit: JS superset
* MySql2: database
* Node
* Jest: to write TDD and add others tests
* Prometheus: to test express metrics

### Other dependencies

* Bcrypt
* Cors
* Cookie parser
* Jsonwebtoken
* express rate limiter
* prom-client
* ts-node
* ts-jest
* response-time
* uuid

### Frontend to this project is available here:
https://github.com/L00ka5z78/crag-finder-FE

### Some screens.
Folder structure

![directories-structure](https://github.com/L00ka5z78/crag-finder-BE/assets/110019733/079f9dbf-4e31-4f03-b58b-42289458ea60)

Database general layout

![db-example-crags](https://github.com/L00ka5z78/crag-finder-BE/assets/110019733/f8ccb4d3-13c2-49dc-a0b8-533287fba4e9)
![db-table](https://github.com/L00ka5z78/crag-finder-BE/assets/110019733/6b67f0b6-4fe8-417e-b49d-2b6de4704d56)
![db-table-crags](https://github.com/L00ka5z78/crag-finder-BE/assets/110019733/cd16cf52-7d09-4e3e-ab98-4f8d28f2de90)
![db-example](https://github.com/L00ka5z78/crag-finder-BE/assets/110019733/4c3bea0b-7e34-449c-b5d1-97a26950e170)

Example of express metrics

![expresmetrics_prometheus](https://github.com/L00ka5z78/crag-finder-BE/assets/110019733/2a339c2f-5f26-4728-a507-68dd98c165ae)
