# Global Variable n8n Node

> Inspired by `n8n-nodes-globals`
>
> https://github.com/umanamente/n8n-nodes-globals


![](/screenshots/workflow-canvas.png)

# Install `n8n-nodes-global-variable`

> Requires self-hosted n8n

![](/screenshots/install.png)

# How it works

## 1. Create a `Global Variables` credential

> Note: you can have as many of these as you want to organize your variables.

![](/screenshots/search-credential.png)

## 2. Define your variables as JSON

Simply define all your variables in a single JSON field. You can include any type of data - strings, numbers, booleans, objects, arrays, etc.

Example:
```json
{
  "apiUrl": "https://api.example.com",
  "retryCount": 3,
  "enableLogging": true,
  "config": {
    "timeout": 5000,
    "headers": {
      "Content-Type": "application/json"
    }
  },
  "supportedFormats": ["json", "xml", "csv"]
}
```

![](/screenshots/json.png)

## 3. Add a `Global Variables` node in your workflow

> Choose the credential you created in step 1.

![](/screenshots/search-nodes.png)

![](/screenshots/workflow-canvas.png)

![](/screenshots/node-choode-credential.png)

![](/screenshots/node-all-variables-in-one-key.png)

## That's it!

Wherever the node is used, your variables will be available in the workflow after the node is executed in `$json`.

![](/screenshots/one-key-table.png)

### `$json.vars.X`

If you choose `Put All Variables in One Key` in the node options, all variables will be available under the `$json.<the name you chose>` key.

![](/screenshots/one-key-table.png)

![](/screenshots/one-key-json.png)

### `$json.X`

If you disable `Put All Variables in One Key` in the node options, each variable will be available under its own key in `$json`.

![](/screenshots/not-one-key-table.png)

![](/screenshots/not-one-key-json.png)

## Does not overwrite existing variables

If you have existing variables in your workflow, the `Global Variables` node will not overwrite them.

It will only add the variables that are defined in the credential.

![](/screenshots/workflow-canvas-with-edit-fields.png)

![](/screenshots/show-existing-value.png)

# Attribution

This node is inspired by the `n8n-nodes-globals` node by [Umanamente](https://github.com/umanamente).
>
> https://github.com/umanamente/n8n-nodes-globals
>
> License MIT
