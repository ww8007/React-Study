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

# mongo DB

- 관계형 DB
  MySQL, Oracle DB, ProsgreSQL
  **RDMBS** 관계형 데이터 베이스
  - 한계
  1. 데이터 스키마 고정적
     새로 등록하는 데이터가 기존 형식과 다르면 새로 짜줘야함
  1. 확장성
     처리해야 할 데이터양 늘어나면 데이터 베이스 서버의 성능을 업그레이드 시켰어야 함
- NoSQL
  MongoDB -> 한계 극복 데이터 베이스
  유동적인 스키마 가능
  데이터가 자주 바뀐다면 Mongo DB가 유리함
  - 까다로운 조건으로 데이터 필터링 하거나 ACID 특성 지켜야 할 시 관계형 DB가 더 나을 수 있음
    -> AID 데이터베이스가 트랜잭션이 안전하게 처리되는 것을 보장
