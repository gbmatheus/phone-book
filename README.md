# phone-book

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).
## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (version `^20.19.0` or `>=22.12.0` as specified in `package.json`)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation & Configuration

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/gbmatheus/phone-book.git
    cd phone-book
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project by copying the example file:
    ```sh
    cp .env.example .env
    ```
    Open the `.env` file and set the `VITE_API_URL` to point to your backend API.
    ```
    VITE_API_URL=http://your-backend-api-url.com
    ```

### Running the Application

-   **Development Server:**
    Run the app with hot-reloading for development.
    ```sh
    npm run dev
    ```

-   **Production Build:**
    Compile and minify the application for production.
    ```sh
    npm run build
    ```

-   **Preview Production Build:**
    Locally preview the production build.
    ```sh
    npm run preview
    ```

## Running with Docker

You can also build and run the application using Docker.

1.  **Build the Docker image:**
    ```sh
    docker build -t phone-book .
    ```

2.  **Run the Docker container:**
    The application will be served on port 8088.
    ```sh
    docker run -p 8088:8088 phone-book
    ```
    You can now access the application at `http://localhost:8088`.
