# Accessible Typeahead

This app is a working example of how the TypeAhead component works in a real world app.

The component code is resides in `src/Molecules/TypeAhead`

This app has been deployed to https://typeahead-rl.netlify.app/

## Documentation

`TypeAhead` component helps users to autofill the option which they're going to type.

## Features:

- Extensible `TypeAhead` component to use it multiple times in different places of the app.
- Built accessibility in mind. Supports screen readers, keyboard navigation etc.
- Supports different kinds of API structure with the use of `labelKey` and `optionsParent`
- Support caching, so that we won't request the same API again in the same session to boost performance
- Can pass any extra prop for extra styling.
- Using latest React hooks which makes the code easy to read and understand.
- Blazingly fast and small. Only depends on React and lodash/debounce.
- Support all modern browsers.

### Supported Props

`TypeAhead` component accepts below props:

| Prop           | Default | Description                                      | Required |
| -------------- | ------- | ------------------------------------------------ | -------- |
| apiPrefix      | null    | Which api to hit for the options                 | true     |
| onOptionSelect | null    | Callback url to call on successful option select | true     |
| opts           | {}      | options object                                   | false    |

**Opts Prop** have the following structure:

```
const  opts  = {
  optionsParent: 'items', // The key in the API response where we can see the options.
	labelKey:  'userName', // The key to use for the option object under the API options response to show. Most of the time the API will return an array of option objects
	label:  'Github Users: ',
	errorMsg:  'Please select a Github user',
};
```

#### Example 1

if the API response is like:

```
{
  items: [
    {
      name: 'Option 1',
      id: 123123
    },
    ...
```

The `optionsParent` will be `items`, and the `labelKey` will be `name`

#### Example 2

if the API response is like:

```
 [
     'option 1', 'option 2', ...
]
```

The `labelKey` and the `optionsParent` will not be needed.

### Todo

[ ] 90% test cases
[ ] Full custom styling power to the user.

# Other information about the project

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
