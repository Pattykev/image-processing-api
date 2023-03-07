# Scripts
+ build: npm run build

+ lint: npm run lint

+ prettify: npm run prettify

+ run unit tests: npm run tests

+ start server: npm run start

# Usage

The server will listen on port 3000.

## Endpoint to resize images
+ ``htpp://localhost:3000/api/images ``: it will display available images

## Query argument
+ ``filename ``: image's name which can be endcadaport, fjord, icelandwaterfall, paltunnel, santamonica
+ ``width``: a positif numerical value
+ ``height``: a positif numerical value

+ ``htpp://localhost:3000 ``: giving brief instructions
+ ``htpp://localhost:3000/api/images?filename=fjord ``: show the original image
+ ``htpp://localhost:3000/api/images?filename=fjord&width=10&height=10 ``: resize the original image and save to this path ``images/thumbnails`` with the name fjord-10x10.jpg
+ ``htpp://localhost:3000/api/images?filename=fjord&width=10&height=-10 ``: return a message for saying that the value for the parameter is invalid
+ ``htpp://localhost:3000/api/images?filename=fjord&width=10 ``: return a message for saying that the parameter is missing