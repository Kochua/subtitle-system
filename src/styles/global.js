import { injectGlobal } from "styled-components";

injectGlobal`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    button:focus {outline:0;}


    body {
        position: relative;
        font-size: 16px;
        font-family: 'Open Sans', sans-serif;
    }
`;
