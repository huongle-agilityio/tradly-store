# React Native Practice Advanced

## Overview

- [This document](https://docs.google.com/document/d/1j76knUYuIDnd1sMv68_qeBgSiAGGNlDjRYCwKAAs3zg/edit?tab=t.0#heading=h.ar0k1bmftkqn) provides information about practice-advanced.
- Design:
  - [figma](https://www.figma.com/design/cbyU4pamdddEA1uowX8Am8/grocery-marketplace-tradly.app?node-id=0-1&p=f&t=ESkGikKNacpy0yfQ-0)
- Estimate plan: [plan](https://docs.google.com/document/d/1tvQbWmN5fUllhN7QzrmL-OE3K90_q8P075bEk_3Li9g/edit?tab=t.0)

## App Bio

- Grocery Marketplace Tradly is a fast, convenient, and reliable mobile app for ordering various foods, from fresh groceries to delicious restaurant meals. Browse thousands of options, customize your order, and have it delivered straight to your door!

## Techniques Stack

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

- Understand more about React Native networking, notification & configuration, and get familiar with New Debugger.
- Explore techniques for optimizing the performance of React Native apps
- Study about best practices for navigation
- Learn about security best practices

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
  - The user can see the tab browse and redirect to the Browse screen
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
- Product
  - The user can see a list of their products
  - The user can click add new product
  - The user can click edit product
  - The user can click delete product
- Add New Product
  - The user can see a form to add new product
  - The input that is user enters must be validated
  - The user can upload photo or take photo for new product
  - The user can add new product
- Edit Product
  - The user can see a form to edit product
  - The input that is user enters must be validated
  - The user can upload photo or take photo for new product
  - The user can edit product
- Delete Product
  - The user can delete product

## How to run

### Prerequisites

Make sure you install packages with correct version below:

- [node v20.18.1](https://nodejs.org/en/download/package-manager)
- [yarn 1.22.22](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

- **Note:**
  - Please add `.env` into root of project source code, refer `.env.sample`.

### Getting Started

- Step 1: Clone repository
  - With HTTPS :
    - `$ git clone https://gitlab.asoft-python.com/huong.le/react-native-training.git`
  - With SSH:
    - `$ git clone git@gitlab.asoft-python.com:huong.le/react-native-training.git`
- Step 2: Move to branch feature/practice-advanced
  - `$ git checkout feature/practice-advanced`
- Step 3: `cd TradlyStore`
- Step 4: Install all dependencies
  - `$ yarn install`

### Build and Run app

| Command                    | Action                                                  | Port |
| :------------------------- | :------------------------------------------------------ | :--- |
| `$ yarn android`           | Install the app on an Android emulator/device           | N/A  |
| `$ yarn ios`               | Install the app on an iOS simulator/device              | N/A  |
| `$ yarn storybook:android` | Install the storybook app on an Android emulator/device | N/A  |
| `$ yarn storybook:ios`     | Install the storybook app on an iOS simulator/device    | N/A  |
| `$ yarn start`             | Run app on an emulator/device                           | N/A  |
| `$ yarn test`              | Run unit tests                                          | N/A  |
| `$ yarn coverage`          | Generate test coverage report                           | N/A  |
| `$ yarn build:apk`         | Build a production-ready APK file                       | N/A  |

### Project structure

```shell
.
├── README.md                       # README file
├── .husky                          # Husky configuration
├── .storybook                      # Storybook folder
├── src
│   ├── apis                        # Contain APIs
│   ├── assets                      # Contain images, fonts, and other assets
│   ├── configs                     # App config
│   ├── constants                   # App constants
│   ├── hocs                        # High order components
│   ├── hooks                       # Contain custom hooks
│   ├── interfaces                  # TypeScript interfaces
│   ├── mocks                       # Mock data
│   ├── navigation                  # Navigation folder
│   ├── schemas                     # Schemas validate data
│   ├── services                    # Handle data with API: GET, POST, PUT, DELETE
│   ├── stores                      # Stores
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
