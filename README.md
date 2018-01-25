# RESTapi (nodeJS, express, passport, mongodb)

## REST api 란?
REST는 Representational state transfer의 약자로, 월드와이드웹과 같은 분산 하이퍼미디어 시스템에서 운영되는 소프트웨어 아키텍처스타일(소프트웨어의 주요 특징들을 결정짓는 주요 설계구조) 이다.
HTTP URI로 잘 표현된 리소스에 대한 행위를 HTTP Method로 정의한다.
리소스의 내용은 json, xml, yaml등의 다양한 표현 언어로 정의된다.


※ example
1. GET http://hosturl/user
```
[
  {
    id: 'abc',
    name: '김아무개',
    age: 34
  },
  {
    id: '1234',
    name: '홍길동',
    age: 55
  },
]
```

2. POST http://hosturl/user/abc
```
[
  {
    id: 'abc',
    name: '김아무개',
    age: 34
  }
]
```

3. PUT http://hosturl/user/abc
```
[
  {
    id: 'abc',
    name: '김아무개',
    age: 32
  }
]
```

4. DELETE http://hosturl/user/abc
```
[]
```

## Instructions

1. Install packages: `npm install`
2. Launch: `node server.js` or `nodemon`
3. Visit in your browser at: `http://localhost:8080`

## The Tutorials

- [REST API 제대로 알고 사용하기](http://meetup.toast.com/posts/92)
- [Getting Started and Local Authentication](http://scotch.io/tutorials/easy-node-authentication-setup-and-local)
- [Facebook](http://scotch.io/tutorials/easy-node-authentication-facebook)
- [Google](http://scotch.io/tutorials/easy-node-authentication-google)
- [Build a RESTful API Using Node and Express 4](https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4)
