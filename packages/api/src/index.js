import { Hello, Hi } from 'lib';

const hello = new Hello('api');
console.log(hello.greet());


const hi = new Hi('api');
console.log(hi.greet());