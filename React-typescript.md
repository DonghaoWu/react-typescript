1. 
```bash
$ npx create-react-app <app-name> --template typescript
```

2. Typescript basic

typescript = js + a type system

3. typescript code => typescript complier => plain old JS

4. writing typescript is the same as writing JS with some 'extra documentation'.

5. set up environment

```bash
$ npm i -g typescript ts-node
```

6. install code to path

    - view => command pallete => install path
    - code .
    - 

7. install prettier extention

    - run prettier on save
    - code => prefences => setting => search: format on save => check that( run prettier on save) 

8. Use single quotes with prettier

    - code => prefences => setting => search: single quotes => Prettier: single quote => check that

9. Use two spaces for indentation

    - code => prefences => setting => search: tab size => 2

10. Change theme

    - prefences => setting => search: theme => color theme => 

11. make a network request to fetch some JSON and print the result

12. api: jsonplaceholder.typicode.com

```bash
$ npm init -y
$ npm i axios
$ 
```

13. execute typescript code

    - index.ts

    ```ts
    import axios from 'axios';

    const url = 'https://jsonplaceholder.typicode.com/todos/1';

    // 这是一个 obj，且里面以这些 key 的值为这些类型。

    interface Todo{
        id:number;
        title:string;
        completed:boolean;
    }

    axios.get(url)
    .then(res=>{
        const todo = res.data as Todo; // typeScript

        const {id, title, completed} = todo;

        logTodo(id, title, completed);
    });

    const logTodo = (id: number, title: string, completed: boolean)=>{// TS

        console.log(`
            The Todo with id: ${id},
            Has a title of: ${title},
            Is it finished? ${completed}
        `)
    }
    ```

    - silent error like undefined error.
    - typeScript helps us catch error.

    ```bash
    $ tsc index.ts # compile and get a new index.js file
    $ node.index.js
    $ ts-node index.ts # one line command
    ```

14. Design Patterns with TS.

15. types

    - basic types:
    - primitive types & object types

    - example
```ts
const today = new Date();
today.getMonth();

const person={
    age:20
};

class Color{

}

const red = new Color();

// error
today.hey;
person.hey;
red.hey;
```

16. annotations

```ts
const apples: number = 5;
let speed: string = 'fast';
let hasName:boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;
let now: Date = new Date();

let colors: string[] = ['red','green', 'blue'];
let myNumbers: number[] = [1,2,3];
let truths: boolean[] = [true, false];

class Car{

}
let car:Car = new Car();

// object literal
let point: { x: string; y:number;} = {
    x:'hello',
    y:20
}

// function
const logNumber:(i: number) => void = (i: number) =>{
    console.log(i);
}
```

17. inference

    - type inference

    ```ts
    // let inference guess what the type is.

    const color = 'red'
    ```

18. inference 和 annotation 相比，inference 更常用。

5/31:

1. typeScript basic.