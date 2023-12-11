# Pokémassify

## Pokémon Explorer web application using the [PokeAPI](https://pokeapi.co/docs/v2)

## Getting started

#### Requirements

- Git >= 2.42
- Yarn >= 1.22
- Node >= 18.15

#### Clone the repository with Git:

```bash
git clone https://github.com/antoniogoulao/pokemassify.git
```

#### Install the dependencies:

```bash
yarn install
```
#### Run the following to start CRA (Webpack):

```bash
yarn start
```

#### Run tests:

1. Run the command
```bash
yarn test
```
2. Select `Component Testing`.
3. Select a browser (for instance: `Chrome`) and click `Start Component Testing in <browser>`.
4. Select the tests you would like to run.


### Project goals 

1. Pokédex View:
   1. Display a list of Pokémon, including their names and images. ✅
   2. Implement pagination or infinite scrolling for a smooth browsing experience. ✅
2. Pokémon Details:
   1. Upon selecting a Pokémon from the list, show detailed information. ✅
   2. Include the Pokémon's types, abilities, and base stats. ✅
   3. If the Pokémon has evolutions, display the evolution chain. ✅
3. Search:
   1. Implement a search bar to allow users to find Pokémon by name. ✅
4. Responsive Design:
   2. Ensure the application is responsive and works well on both desktop and mobile
   devices. ✅
5. Tests:
   1. Write a test for the 3 most popular features. ✅
6. Bonus Task (Optional):
   1. Add animations or transitions to enhance the user interface. ❌
   2. We encourage you to explore additional features or functionalities that go beyond
   the basic requirements. Feel free to innovate and showcase your creativity in
   leveraging the extensive data offered by the API. Whether it's implementing
   advanced search filters, creating engaging visualizations, allow the user to build and
   save their Pokémon teams (browser API), or introducing unique user interactions,
   this is your opportunity to stand out and demonstrate the depth of your frontend
   engineering skills. Surprise us with your inventive approach, and let your imagination
   run wild within the bounds of a polished and user-friendly interface.
      1. Add translations: Used [react-intl](https://formatjs.io/docs/react-intl/) ✅
      2. Make it performant and save [PokeAPI](https://pokeapi.co/docs/v2) from thousands of requests: Used [@tanstack/react-query](https://tanstack.com/query/latest) ✅
      3. Make it easy to scale and costumize: Used a component library [MUI](https://mui.com/) and [@tanstack/react-router](https://tanstack.com/router/v1) ✅
      4. Use filters to refine search: Tried to use type as filter. ❌
         1. Due to the lack of a search API, the burden of implementing filtering would require to have all the information about every pokémon in the FE. 