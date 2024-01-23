# Bitnovo Payment Gateway Integration

## Project Overview

This project features an integration with the Bitnovo API to implement a payment gateway in a testnet environment.

## Key Features

- **Payment Creation Form**

- **Payment Summary and Information Display**
- **Real-Time Payment Status Updates**: The application is equipped with a webhook connection to ensure the payment page is automatically updated when a payment is confirmed or canceled.

- **Metamask Integration**: The project includes functionality to connect with Metamask using the web3 package.

## Technologies Used

- **Next.js**
- **React**
- **TypeScript**
- **TailwindCSS**
- **Shadcn/ui and Radix UI components**

# Handling Payment URI string for QRcode generation.

## Context

The `/orders/info` API endpoint returns the necessary data for populating the payment page. However, it does not include the URI string needed to generate the QR code. This URI string is instead provided by the `orders_create` call, which is accessed on a preceding page in the user flow.

## Considered Solutions

To address this challenge, I considered different solutions for making the URI string available on the page where payment information is displayed:

- **Storing in React Context**: This approach is not ok because the stored data would be lost if the user refreshes the page.

- **Local Storage**: While this method would persist across page refreshes, if a user accesses the payment page from a different device, the necessary string would not be available. In addition, there are potential security risks to consider.

- **Regenerating URI on Frontend**: This method effectively circumvents the drawbacks of the previous two solutions. However, it introduces a redundancy concern, as this functionality is already managed by the backend. Duplicating this logic might affect the consistency of the application.

- **Passing as URL Parameter**: This approach addresses the concerns of the first two methods. Nevertheless, due to my limited expertise in security, particularly concerning cryptocurrency transactions, there might be potential risks associated with exposing the data in URL parameters.

## Final Decision

I decided to implement a URI generator function on the frontend. This function takes the necessary information (currency, address and amount) and creates the payment URI.
A better solution could be implemented after reviewing security problems.
