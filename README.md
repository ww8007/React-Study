# React

React Study

### Setting javascriptreact.json

```jsx
{
    "Create Functional React Component": {
        "prefix": "fc",
        "body": [
            "import React from 'react';",
            "",
            "function ${1:${TM_FILENAME_BASE}()} {",
            "    return ( ",
            "        <div>",
            "            ${2}",
            "        </div>",
            "    );",
            "}",
            "",
            "export default ${TM_FILENAME_BASE};"
        ],
        "description": "Create Functional React Component"
    },
    "Create React class Component": {
        "prefix": "rcc",
        "body": [
            "import React, { Component } from 'react';",
            "",
            "class ${TM_FILENAME_BASE} extends Component {",
            "  render() {",
            "    return <div></div>;",
            "  }",
            "}",
            "",
            "export default ${TM_FILENAME_BASE};",
            ""
        ],
        "description": "Create React class Component"
    }
}
```
