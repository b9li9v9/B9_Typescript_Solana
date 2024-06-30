`learn`

```
https://solanacookbook.com/zh/getting-started/installation.html#%E5%AE%89%E8%A3%85web3-js

https://github.com/solana-labs/solana-web3.js?tab=readme-ov-file

https://solana-labs.github.io/solana-web3.js/

https://www.ghotis.xyz/SolanaDocumention/clients/javascript.html

https://solana-labs.github.io/solana-web3.js/classes/Keypair.html#fromSecretKey

course
https://www.soldev.app/course

rpc
https://solana.com/docs/rpc/websocket/accountsubscribe

spl-token
https://solanacookbook.com/zh/references/token.html#%E6%88%91%E9%9C%80%E8%A6%81%E4%BB%80%E4%B9%88%E6%89%8D%E8%83%BD%E5%BC%80%E5%A7%8B%E4%BD%BF%E7%94%A8spl%E4%BB%A3%E5%B8%81
```

`CLI`

```
dev https://api.devnet.solana.com
test https://api.testnet.solana.com
main https://api.mainnet-beta.solana.com/
local http://127.0.0.1:8899

Node Endpoints
solana config set --url https://api.devnet.solana.com
local servers
solana-test-validator
```

`包`

```
npm install @solana/web3.js --save-dev
npm install @solana-developers/helpers --save-dev

npm install @solana/spl-token --save-dev

npm install esrun --save-dev
npm install typescript --save-dev
```

`js vs ts`

```
let message = "Hello, World!";

function greet(person) {
  return "Hello " + person.name;
}

class Animal {
  constructor(name) {
    this.name = name;
  }

  move(distance) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

const dog = new Animal("Dog");

dog.move(10);

const Direction = {
  Up: 0,
  Down: 1,
  Left: 2,
  Right: 3
};

const direction = Direction.Up;

function add(a, b) {
  return a + b;
}

function identity(arg) {
  return arg;
}

let count = 10;

------

let message: string = "Hello, World!";

interface Person {
  name: string;
}


function greet(person: Person) {
  return "Hello " + person.name;
}

class Animal {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`);
  }
}

const dog = new Animal("Dog");

dog.move(10);

enum Direction {
  Up,
  Down,
  Left,
  Right
}

const direction: Direction = Direction.Up;

function add(a: number, b: number): number {
  return a + b;
}

function identity<T>(arg: T): T {
  return arg;
}

let count: number = 10;  // TypeScript 会自动推断类型

```

Aleo
https://github.com/AleoNet/snarkOS
