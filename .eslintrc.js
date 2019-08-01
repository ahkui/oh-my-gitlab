module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module",
        "allowImportExportEverywhere": false,
        "codeFrame": true
    },
    env: {
        browser: true,
        node: true,
    },
    "extends": [
        "eslint:recommended"
    ],
    "rules": {
        "indent": [
            "error",
            4
        ],
        "no-console": "off",
    }

}
