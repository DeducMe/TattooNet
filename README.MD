# TattooNet

The TattooNet app is an open-source application designed to help users find tattoo artists in their city and country. It is built using the MERN stack, which includes MongoDB, Express, React native, and Node.js.

## Project Overview

The TattooNet is currently a pet project that showcases my experience with React Native. The app allows users to search for tattoo artists in their local area and provides information such as their portfolio, ratings, and contact details.

## Getting Started

To start the project, follow these steps:

1. Install all project dependencies by running the following command:

   ```
   yarn
   ```

   and then:

   ```
   npx pod-install
   ```

   on M1 you should use:

   ```
   arch -x86_64 pod install
   ```

2. Create a configuration file by duplicating the `configExample.ts` file located in the `src/common` directory. Rename the duplicated file to `config.ts` and update the necessary configurations inside.

3. Run the app on iOS or Android devices using one of the following commands:

   ```
   yarn ios
   ```

   or

   ```
   yarn android
   ```
