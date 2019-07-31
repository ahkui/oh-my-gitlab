module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:node/recommended",
        "plugin:import/errors",
        "plugin:import/warnings"
    ],
    "settings": {
        "node": {
            "allowModules": ["helpers", "services"],
            "resolvePaths": [__dirname],
            "tryExtensions": [".js", ".json", ".node"]
        }
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "no-console": "off",
        "no-restricted-syntax": [
            "error",
            {
                "selector": "CallExpression[callee.object.name='console'][callee.property.name!=/^(log|warn|error|info|trace)$/]",
                "message": "Unexpected property on console object was called"
            }
        ],
        "node/no-extraneous-require": ["error", {
            "allowModules": [
                "lodash",
                "helpers",
                "services"
            ]
        }]
    }

}