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
    - code => prefences => setting => search: `default formatter`
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

    const color = 'red';
    ```

18. inference 和 annotation 相比，inference 更常用。

5/31:

1. typeScript basic.

6/1:

1. enviroment set up: VS Code

6/3:

1. type annotations & type inference

2. when to use annotations:
    - function that returns the 'any' type
```js
const json = {'x':10, 'y':20};
const cordinates = JSON.parse(json);

console.log(coordinates);
```

6/4:

1. 

6/5:
- 以下是关于使用 annotation 的场景。
1. Fix the 'Any' type.
- JSON.parse canr return any data type.
```js
const json = {'x':10, 'y':20};
const cordinates:{x:number;y:number} = JSON.parse(json);

console.log(coordinates);
```

2. Delayed initialization
- when we declare a variabel on one line and initalizate it later.
```js
let words = ['red', 'green','blue'];
// let foundWord = false;
let foundWord:boolean;

for(let i = 0; i < words.length; i++){
    if(words[i] === 'green'){
        foundWord = true;
    }
}
```

- 最好的办法是直接定义为 false，这样 typeScript 就直接知道定义的数据类型。

3. WHen inference doesn't work
- variable whose type cannot be inferrend correctly.
```js
let numbers =[-10, -1, 12];
// if one number is positve, set the number, if not, set false, bad practise.
// this will get error
let numberAboveZero = false;
// fix case
let numberAboveZero: boolean | number = false;

for(let i = 0; i M numbers.length; i++){
    if(number[i] > 0){
        numberAboveZero = numbers[i];
    }
}
```

4. function - type annotation for functions.

```js
const logNumber:(i:number) =>void = (i: number)=>{
    console.log(i);
};
```

- `always add argument type.`
```js
// type annotation
// best parctise, always add return annotation.
const add = (a:number, b: number) : number =>{
    return a + b;
}

// bad practise
const add = (a:number, b: number) =>{
    return a + b;
}
```

```js
function divide(a: number, b: number): number{
    return a/b;
}

const mutiply = function(a:number, b:number): number{
    return a * b;
}
```

```js
const logger = (message:string): void =>{
    console.log(message);
    return null;
}

const throwError = (message:string): never =>{
    throw new Error(message);
}
```

```js
const forcast = {
    date:new Date(),
    weather:'sunny'
}

const logWeather = (forcast:{ date: Date, weather:string}):void =>{
    console.log(forcast.date);
    console.log(forcast.weather);
}

logWeather(forcast);

// typeScript destructuring
const logWeather = ({date, weather} :{date: Date, weather:string}): void =>{
    console.log(date);
    console.log(weather);
}
```

- type infernce for functions - typeScript tries to figure out what type of `value a function will return.`


- Annotation around Objects

```js
const profile={
    name:'alex',
    age:20,
    coords:{
        lat:0,
        lng:15
    },
    setAge(age: number): void{
        this.age = age;
    }
};

const {age}:{age:number} = profile;

const {age, name}:{age:number; name:string} = profile;

const {coords:{lat, lng}}:{coords:{lat:number; lng:number}} = profile;
```

5. array in TyprScript

```js
// annotation 一般用在未有值的定义层面上
const carMakers: string[] = [];
const carMakers = ['ford', 'toyota', 'chevy'];

const dates = [new Date(), new Date()];

// annotation 一般用在未有值的定义层面上
const carsByMake: string[][] = [];
const carsByMake = [
    ['f150'],
    ['corolla'],
    ['camaro']
]
```

- why typeScript in array
```js
// Help with inference when extractiong values
const car = carMakers[0];
const myCar = carMakers.pop();

// Prevent incompatible values
carMakers.push(100);

// Help with 'map'
carMakers.map((car:string):string =>{
    return car;
})

// Mutiple types in array
const importantDates :(Date | string)[] = [];
importantDates.push('2021');
const importantDates = [new Date(), '2020'];
```

- when to use types Arrays
```js

```

6. tuples in action, set up the type order in an array.
```js
const drink = {
    color:'brown',
    carbonated: true,
    sugar:40
}

const pepsi:[string, boolean, number] = ['brown', true, 40];

// best practise
type Drink = [string, boolean, number];
const pepsi:Drink = ['brown', true, 40];
```

- why tuples?( not used too often.)
```js
const car :[number, number] =[400, 401];

const catStates = {
    horsepower:400;,
    weight:401
}
```

7. interfaces, `not inference`
- interfaces + classes
- how we get really strong code reuse in TS
- long type annotations

```js
const oldCivic = {
    name:'civic',
    year:2000,
    broken:true
};

const printVehicle = (vehicle: { name: string; year:number; broken:boolean}):void =>{
    console.log(`Name:${vehicle.name}`);
}

printVehicle(oldCivic);
```

```js
interface Vehicle{
    name:string;
    year:number;
    broken:boolean;
}

const oldCivic = {
    name:'civic',
    year:2000,
    broken:true
};

const printVehicle = (vehicle: Vehicle):void =>{
    console.log(`Name:${vehicle.name}`);
}

printVehicle(oldCivic);
```

- interface 的意思大概就是采用自己定制的数据类型，以供重复使用。

- interface syntax

```js
interface Vehicle{
    name:string;
    year:number;
    broken:boolean;
    summary():string;
}

const oldCivic = {
    name:'civic',
    year:2000,
    broken:true,
    summary():string{
        return `${this.name}`;
    }
};

const printVehicle = (vehicle: Vehicle):void =>{
    console.log(vehicle.summary());
};

printVehicle(oldCivic);
```

- functions in interfaces / 输入的 Vehicle 没有全部 key, 这样 printVehicle 的输入 object 只需要符合就可以了。`部分合规也是允许的。`

```js
interface Reportable{
    summary():string;
}

const oldCivic = {
    name:'civic',
    year:2000,
    broken:true,
    summary():string{
        return `${this.name}`;
    }
};

const printVehicle = (vehicle: Reportable):void =>{
    console.log(vehicle.summary());
};

printVehicle(oldCivic);
```

- code reuse with interfaces.

```js
interface Reportable{
    summary():string;
}

const oldCivic = {
    name:'civic',
    year:2000,
    broken:true,
    summary():string{
        return `${this.name}`;
    }
};

const drink = {
    color:'brown',
    carbonated:true,
    sugar:40,
    summary():string{
        return `My drink has ${this.sugar} grams of sugar.`;
    }
}

const printSummary = (item: Reportable):void =>{
    console.log(item.summary());
};

printSummary(oldCivic);
printSummary(drink);
```

- general plan with interfaces
```js
// reuse interface.
```

8. classes
- class, blueprint to create an object

- public / private / protected.`modifier`

```js
class Vehicle{
    private drive():void{
        console.log('hello');
    }

    protected honk():void{
        console.log('world')
    }
}

class Car extends Vehicle{
    // private for security, just could be called inside the class
    private driveCar():void{
        console.log('ka ka');
    }

    public startDrivingPricess():void{
        this.dirveCar();
        // protected, could be called in the child class
        this.honk();
    }
}

const vehicle = new Vehicle();
vehicle.drive();

const car = new Car();
car.drive();
```

- fields in classes

```js
class Vehicle{
    color:string

    constructor(color:string){
        this.color = color;
    }

    //shortcut
    constructor(public color:string){}

    protected honk():void{
        console.log('world')
    }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);
```

- fields with inheritance
```js
class Vehicle{
    //shortcut
    constructor(public color:string){}

    protected honk():void{
        console.log('world')
    }
}

const vehicle = new Vehicle('orange');
console.log(vehicle.color);

class Car extends Vehicle{
    constructor(public wheels:number, color:string){
        super(color);
    }

    private drive():void{
        console.log('vroom');
    }
    public startDrivingPricess():void{
        this.honk();
    }
}

const car = new Car(4,'red');
```

9. application

```bash
$ npm install -g parcel-bundler
$ mkdir maps
$ cd maps
$ 
```

- index.html
```html
<html>
    <body>
        <script src='./src/index.ts'></script>
    </body>
</html>
```

- src folder/index.ts
```js
console.log('hello world');
```

- build command
```bash
$ parcel index.html
```

- open localhost:1234

- project structure
```diff
+ src/index.ts
+ index.html
+ src/User.ts
+ src/Company.ts
+ src/CustomMap.ts
```

- install faker
```bash
$ npm i faker @types/faker
```

- src/User.ts
```js
//Type definition file
import faker from 'faker';

// never use default export
export class User{
    name:string;
    location:{
        lat:number;
        lng:number;
    }

    constructor(){
        this.name = faker.name.firstName();
        this.location = {
            lat:parseFloat(faker.address.latitude()),
            lng:parseFloat(faker.address.longitude())
        };
    }
}
```

- src/Company.ts
```js
import faker from 'faker';

export class Company{
    companyName:string;
    catchPhrase:string;
    location:{
        lat:number;
        lng:number;
    }

    constructor(){
        this.companyName = faker.company.companyName();
        this.catchPhrase = faker.company.catchPhrase();

        this.location = {
            lat:parseFloat(faker.address.latitude()),
            lng:parseFloat(faker.address.longitude())
        };
    }
}
```

- src/index.ts
```js
import { User } from './User';
import {COmpany} from './Company';

const user = new User();
console.log(user);

const company = new Company();
console.log(company);
```


- src/Map.js
1. generate a google dev project
2. enable google Maps support(`Maps JS API`)
3. Generate an API key(credentials => API keys)
4. Add the google maps script to HTML file

- index.html
```html
<html>
    <body>
        <script src="https:maps.googlapis.com/maps/api/js?key=adadfhaldkadsfj"></script>
        <script src='./src/index.ts'></script>
    </body>
</html>
```

- google maps integration with typeScript

```bash
$ npm i @types/googlemaps
```

- src/index.ts
```js
import { User } from './User';
import {Company} from './Company';

const user = new User();
console.log(user);

const company = new Company();
console.log(company);

google
```

6/6:

1. type defination files

- index.html
```html
<html>
    <body>
        <div id='map' style='height:100%;'></div>
        <script src="https:maps.googlapis.com/maps/api/js?key=adadfhaldkadsfj"></script>
        <script src='./src/index.ts'></script>
    </body>
</html>
```

- src/index.ts
```js
new google.maps.Map(document.getElementById('map'),{
    zoom:1,
    center:{
        lat:0,
        lng:0
    }
});
```

2. hide functionality

- src/CustomMap.ts
```js
export class CustomMap{
    private googleMap:google.maps.Map;

    constructor(idvId:string){
        this.googleMap = new google.maps.Map(document.getElementById(divId),{
            zoom:1,
            center:{
                lat:0,
                lng:0
            }
        });
    }
}
```

- src/index.ts
```js
import { User } from './User';
import {Company} from './Company';
import {customMap} from './CustomMap.ts';

new CustomMap('map');
```

3. adding markers

```js
import { User } from './User';
import {Company} from './Company';

export class CustomMap{
    private googleMap:google.maps.Map;

    constructor(divId:string){
        this.googleMap = new google.maps.Map(document.getElementById(divId),{
            zoom:1,
            center:{
                lat:0,
                lng:0
            }
        });
    }

    addUserMarker(user: User): void{
        new google.maps.Marker({
            map:this.googleMap,
            position:{
                lat:user.location.lat,
                lng:user.location.lng
            }
        })
    };

    addCompanyMarker(company: Company): void{
        new google.maps.Marker({
            map:this.googleMap,
            position:{
                lat:company.location.lat,
                lng:company.location.lng
            }
        })
    };
}
```

- src/index.ts
```js
import { User } from './User';
import {Company} from './Company';
import {customMap} from './CustomMap.ts';

const user = new User();
const company = new Company();
const customMap = new CustomMap('map');

customMap.addUserMarker(user);
customMap.addUserMarker(company);
```

4. duplicate code.`iginore`

```js
import { User } from './User';
import {Company} from './Company';

export class CustomMap{
    private googleMap:google.maps.Map;

    constructor(divId:string){
        this.googleMap = new google.maps.Map(document.getElementById(divId),{
            zoom:1,
            center:{
                lat:0,
                lng:0
            }
        });
    }

    addUserMarker(mappable: User | Company): void{
        new google.maps.Marker({
            map:this.googleMap,
            position:{
                lat:mappable.location.lat,
                lng:mappable.location.lng
            }
        })
    };
}
```

5. restricting access with interfaces
```js
// Instructions to every other class
// on how they can be an argument to 'addMarker'
interface Mappable{
    location:{
        lat:number;
        lng:number;
    };
}

export class CustomMap{
    private googleMap:google.maps.Map;

    constructor(divId:string){
        this.googleMap = new google.maps.Map(document.getElementById(divId),{
            zoom:1,
            center:{
                lat:0,
                lng:0
            }
        });
    }

    addMarker(mappable: Mappable): void{
        new google.maps.Marker({
            map:this.googleMap,
            position:{
                lat:mappable.location.lat,
                lng:mappable.location.lng
            }
        })
    };
}
```
- new terms: `satisfy the interface.`
- implicit type checks

- src/index.ts

```js
import { User } from './User';
import {Company} from './Company';
import {customMap} from './CustomMap.ts';

const user = new User();
const company = new Company();
const customMap = new CustomMap('map');

customMap.addMarker(user);
customMap.addMarker(company);
```

6. showing popup windows

```js
interface Mappable{
    location:{
        lat:number;
        lng:number;
    };
}

export class CustomMap{
    private googleMap:google.maps.Map;

    constructor(divId:string){
        this.googleMap = new google.maps.Map(document.getElementById(divId),{
            zoom:1,
            center:{
                lat:0,
                lng:0
            }
        });
    }

    addMarker(mappable: Mappable): void{
        const marker = new google.maps.Marker({
            map:this.googleMap,
            position:{
                lat:mappable.location.lat,
                lng:mappable.location.lng
            }
        })

        marker.addListener('click',()=>{
            const infoWindow = new google.maps.InfoWindow({
                content:'Hi there!'
            });

            infoWindow.open(this.googleMap, marker);
        })
    };
}
```

7. updating interface definitions

- CustomMap.js
```js
interface Mappable{
    location:{
        lat:number;
        lng:number;
    };
    markerContent():string;
}

export class CustomMap{
    private googleMap:google.maps.Map;

    constructor(divId:string){
        this.googleMap = new google.maps.Map(document.getElementById(divId),{
            zoom:1,
            center:{
                lat:0,
                lng:0
            }
        });
    }

    addMarker(mappable: Mappable): void{
        const marker = new google.maps.Marker({
            map:this.googleMap,
            position:{
                lat:mappable.location.lat,
                lng:mappable.location.lng
            }
        })

        marker.addListener('click',()=>{
            const infoWindow = new google.maps.InfoWindow({
                content:mappable.markerContent()
            });

            infoWindow.open(this.googleMap, marker);
        })
    };
}
```

- User.ts
```js
//Type definition file
import faker from 'faker';

// never use default export
export class User{
    name:string;
    location:{
        lat:number;
        lng:number;
    }

    constructor(){
        this.name = faker.name.firstName();
        this.location = {
            lat:parseFloat(faker.address.latitude()),
            lng:parseFloat(faker.address.longitude())
        };
    }

    markerContent():string{
        return `User name: ${this.name}`;
    }
}
```

- Company.ts
```js
import faker from 'faker';

export class Company{
    companyName:string;
    catchPhrase:string;
    location:{
        lat:number;
        lng:number;
    }

    constructor(){
        this.companyName = faker.company.companyName();
        this.catchPhrase = faker.company.catchPhrase();

        this.location = {
            lat:parseFloat(faker.address.latitude()),
            lng:parseFloat(faker.address.longitude())
        };
    }

    markerContent():string{
        return `
        <div>
            <h1>Company name: ${this.companyName}</h1>
        </div>
        `;
    };
}
```

8. Optional inplements clauses
```js
export interface Mappable{
    location:{
        lat:number;
        lng:number;
    };
    markerContent():string;
}
```

```js
import {Mappable} from './CustomMap';

export class User implements Mappable{
    name:string;
    location:{
        lat:number;
        lng:number;
    }
}
```

9. app wrapup

```js
import { User } from './User';
import {Company} from './Company';
import {customMap} from './CustomMap.ts';

const user = new User();
const company = new Company();
const customMap = new CustomMap('map');

customMap.addMarker(user);
customMap.addMarker(company);
```


