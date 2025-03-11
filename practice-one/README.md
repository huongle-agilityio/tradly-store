# React Native Practice

## Overview

- [This document](https://docs.google.com/document/d/1aS8AhKQFDCAP4z6BiXEQSNRqKfu9sYxsW04Az-V6NNk/edit?tab=t.0#heading=h.rwumtsd7x4py) provides information about practice-one React Native with Expo
- Design:
  - [figma](https://www.figma.com/design/cbyU4pamdddEA1uowX8Am8/grocery-marketplace-tradly.app?node-id=0-1&p=f&t=ESkGikKNacpy0yfQ-0)
- Estimate plan: [plan](https://docs.google.com/document/d/1YjACcz5QU7xLmbRVsBSrQjZ23EH5aaVi_4cnxKZN-UA/edit?tab=t.0)

## App Bio

- Grocery Marketplace Tradly is a fast, convenient, and reliable mobile app for ordering various foods, from fresh groceries to delicious restaurant meals. Browse thousands of options, customize your order, and have it delivered straight to your door!

## Techniques Stack

- [Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)/ [Jest](https://jestjs.io/)
- [React Hook Form](https://react-hook-form.com/)
- [valibot](https://valibot.dev/)
- [Strapi](https://strapi.io/)

## Development Tools

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Husky](https://github.com/typicode/husky)
- [Commitlint](https://commitlint.js.org/#/)
- [Storybook](https://storybook.js.org/)

## Targets

- Storybook is required
- Unit test coverage should be greater than 80%
- Configure the app icon, and splash screen that matches the Expo app.
- Must have a Login screen
- Must have a Home screen with a list greater than 100 items
- Building an APK (Android Package) can be a valuable part of practice for trainees

## Requirements

- Onboarding screen
  - The user can see onboarding screens
  - The user must pass 3 steps onboarding process
- Login screen
  - The input that is user enters must be validated
  - The user can log in
- Home screen
  - The user can see a list of categories
  - The user can see a list of promo
  - The user can see a list of new products
  - The user can see a list of popular product
  - The user can see a list of stores they can follow
- Tabs
  - The user can see the tab home and redirect to the Home screen
  - The user can see the tab browse and redirect to the Browse screen (Upcoming screen)
  - The user can see the tab Store and redirect to the Store screen
  - The user can see the tab Order History and redirect to the Order History screen (Upcoming screen)
  - The user can see the tab profile and redirect to the Profile screen (Upcoming screen)
- List products of each category
  - The user can see a list products of from each category
- Product Details
  - The user can see product detail
  - The user can click the button Add to cart
- My Cart
  - The user can see the list of products which are added to the cart
  - The user can update the quantity of cart item
  - The user can remove the cart item
  - The user can see the total price of products
  - The user can click to Add a new address
  - Button Checkout must be disabled until the address filled
  - The user can click the button Checkout
- Add New Address
  - The input that is user enters must be validated
  - The user can save the address
- Order Details
  - The user can see the list item's order success
  - The user can see their delivery address
  - The user can click "Back to home" or the X button to redirect to the Home screen

## How to run

### Prerequisites

Make sure you install packages with correct version below:

- [node v20.11.0](https://nodejs.org/en/download/package-manager)
- [npm 10.2.4](https://www.npmjs.com/)

- **Note:**
  - Please add `.env` into root of project source code, refer `.env.sample`.

### Build and Run app

| Command                       | Action                                      | Port |
| :---------------------------- | :------------------------------------------ | :--- |
| `$ npm install`               | Install all dependencies                    | N/A  |
| `$ npm run android`           | Start the app on an Android emulator/device | N/A  |
| `$ npm run ios`               | Start the app on an iOS simulator/device    | N/A  |
| `$ npm run storybook:android` | Run Storybook on an Android emulator/device | N/A  |
| `$ npm run storybook:ios`     | Run Storybook on an iOS simulator/device    | N/A  |
| `$ npm run prebuild`          | Build android apk file                      | N/A  |
| `$ npm run test`              | Run unit tests                              | N/A  |
| `$ npm run coverage`          | Generate test coverage report               | N/A  |
| `$ npm run build:apk`         | Build a production-ready APK file           | N/A  |

### Project structure

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── src
│   ├── apis                        # Contain APIs
│   ├── app                         # App folder
│   ├── assets                      # Contain images, fonts, and other assets
│   ├── constants                   # App constants
│   ├── hooks                       # Contain custom hooks
│   ├── interfaces                  # TypeScript interfaces
│   ├── mocks                       # Mock data
│   ├── schemas                     # Schemas validate data
│   ├── services                    # Handle data with API: GET, POST, PUT, DELETE
│   ├── ui                          # Folder contain ui of app
│       ├── components              # React components
│       ├── icons                   # Icons folder
│       ├── layouts                 # React components for app layout
│       ├── screens                 # Screens components
│       ├── sections                # Sections components
│       ├── themes                  # Custom themes styles
│   ├── utils                       # Utilities folder
├── .eslintrc.js                    # ESLint configuration
├── .lintstagedrc                   # Lint-stage
├── .prettierrc                     # Prettier configuration
├── app.config.js                   # App configuration
├── babel.config.js                 # Babel configuration
├── jest.config.ts                  # Jest configuration
├── jest.setup.ts                   # Jest setup
├── metro.config.js                 # Metro configuration
└── tsconfig.json                   # TypeScript configuration
```
