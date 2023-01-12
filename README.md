# Guesty Tokenization JS SDK

There are two ways to integrate the SDK:

### Manually include a script tag

Add a script tag to your application ``head`` or ``body`` and replace ``CLIENT_API_KEY`` with your personal client API key.
This loads ``guestyTokenization`` object to the global ``window`` scope of the browser

```html
<script src="https://pay.guesty.com/tokenization/js/v1.js" data-client-api-key="CLIENT_API_KEY"></script>
```

#### Note: To be PCI-compliant, you must load the SDK directly from https://pay.guesty.com. You cannot include it in a bundle or host it yourself

### Use it as an ES module

Advantages of loading the SDK as a module:

- loads script asynchronously to ensure page rendering isn't blocked
- returns a Promise to know when script loading is complete
- resolves to ``null`` if called in a server environment

## Installation

Use ``npm`` to install the Guesty Tokenization JS module:

```sh
npm install @guesty/tokenization-js
```

## Usage

Import the ``loadScript`` function for asynchronously loading the Guesty Tokenization JS SDK


### loadScript(CLIENT_API_KEY)

-   accepts a client API key to be set as an attribute on the script
-   returns a Promise that resolves with `window.guestyTokenization` after the SDK is finished loading

#### Async/Await

```js
import { loadScript } from "@guesty/tokenization-js";

try {
    const guestyTokenization = await loadScript(CLIENT_API_KEY);
    // Guesty Tokenization JS SDK is loaded and ready to use
} catch (error) {
    console.error("Failed to load the Guesty Tokenization JS SDK script", error);
}
```

#### Promises

```js
import { loadScript } from "@guesty/tokenization-js";

loadScript(CLIENT_API_KEY)
    .then((guestyTokenization) => {
        // Guesty Tokenization JS SDK is loaded and ready to use
    })
    .catch((error) => {
        console.error("Failed to load the Guesty Tokenization JS SDK script", error);
    });
```

## TypeScript Support

This package includes TypeScript type definitions for the Guesty Tokenization JS SDK. This includes types for the `window.guestyTokenization` namespace. We support projects using TypeScript versions >= 3.8.

## CHANGELOG

The changelog is available [here](https://github.com/guestyorg/tokenization-js/blob/master/CHANGELOG.md)
