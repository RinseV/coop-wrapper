<div align="center">
  <h1>
    Coop API Wrapper
  </h1>
  </br>
  <p>
    <a href="https://www.npmjs.com/package/coop-wrapper"><img src="https://img.shields.io/npm/v/coop-wrapper" alt="NPM version" /></a>
    <a href="https://github.com/RinseV/coop-wrapper"><img src="https://img.shields.io/npm/l/coop-wrapper" alt="NPM license" /></a>
    <a href="https://www.npmjs.com/package/coop-wrapper"><img src="https://img.shields.io/librariesio/release/npm/coop-wrapper" alt="NPM dependencies"/></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/coop-wrapper/"><img src="https://nodei.co/npm/coop-wrapper.svg" alt="npm installnfo" /></a>
  </p>
</div>

Unofficial Node.js API wrapper for [Coop Supermarkten](https://www.coop.nl/).

## Installation

```sh
npm install coop-wrapper
```

or

```sh
yarn add coop-wrapper
```

then
```typescript
import { Coop } from 'coop-wrapper';
```

## Basic usage
```typescript
// Creates Coop object, set verbose to true to see all requests
const coop = new Coop({ verbose: true });
// Gets products by name
const products = await coop.product().getProductsFromName('melk');
```

More information about the functions and parameters can be found on the [wiki](https://github.com/RinseV/coop-wrapper/wiki)

## Example usage

For all of these examples, please keep in mind that your function in which you request something should be `async` since the requests return a `Promise`.

#### Product

If I want to find all product names that match a given query:
```typescript
import { Coop } from 'coop-wrapper';

async function findProducts(productName: string) {
    const coop = new Coop();
    const products = await coop.product().getProductsFromName(productName);
    console.log(
        products.elements.map((element) => {
            return element.name;
        })
    );
}

findProducts('karnemelk');
```
```sh
[
  'Zuivelmeester Karnemelk',
  'Melkan Karnemelk',
  'Den Eelder boeren karnemelk',
  'Melkan Houdbare karnemelk',
  'Melkunie Boeren karnemelk',
  'Melkunie Karnemelk',
  'Bio+ Karnemelk',
  'Den Eelder karnemelk rood fruit',
  'Campina Karnemelk houdbaar',
  'Arla Biologisch karnemelk'
]
```

#### Recipe

If I want to find all recipe names that match a given query:

```typescript
import { Coop } from 'coop-wrapper';

async function findRecipes(recipeName: string) {
    const coop = new Coop();
    const recipes = await coop.recipe().getRecipesFromName(recipeName);
    console.log(
        recipes.results.map((result) => {
            return result.title;
        })
    );
}

findRecipes('pizza');
```
```sh
[
  'Naanpizza met tikka masala en paprika',
  'Plaatpizza',
  'Turkse pizza met yoghurt-muntsaus',
  'Pizza-hummus',
  "Lente‘pizza' met gegrilde groenten en mozzarella",
  'Plaatpizza in het groen',
  'Bietenpizza met paprika en spinazie',
  'Broodpizza met gegrilde avocado',
  'Panpizza',
  'Pizza met spinazie, ansjovis en olijven'
]
```