'use strict';

const account1 = {
  owner: 'Rocky Karmakar',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1815,
};

const account2 = {
  owner: 'pabitra kumar ghosh',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const account5 = {
  owner: '',
  movements: [],
  interestRate: 1.2,
  pin: 1112,
  userName: '',
};
const accounts = [account1, account2, account3, account4];

// Elements
const openOwner = document.querySelector('.form__input--fullname');
const openMovements = document.querySelector('.form__input--depositammount');
const openUsername = document.querySelector('.open__input--user');
const openPin = document.querySelector('.open__input--pin');
const btnOpen = document.querySelector('.open__btn--opening');
const openUi = document.querySelector('.operation--opening');
const getUi = document.querySelector('.operation--get');

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//111111
btnOpen.addEventListener('click', function (e) {
  e.preventDefault();
  account5.owner = openOwner.value;
  account5.userName = openUsername.value;
  account5.pin = Number(openPin.value);
  account5.movements.push(Number(openMovements.value));
  accounts.push(account5);
  console.log(account5);
  openUi.style.display = 'none';
  getUi.style.display = 'none';
});

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    console.log(type);

    const html = `<div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}₹</div>
      </div>`;
    containerMovements.insertAdjacentHTML(`afterbegin`, html);
  });
};

// displayMovements(account1.movements);

//222222

const calDispalyBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, val) => acc + val, 0);
  labelBalance.textContent = `${acc.balance}₹`;
  openUi.style.opacity = 0;
};
// calDispalyBalance(account1.movements);

//33333

const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);

  labelSumIn.textContent = `${income}₹`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}₹`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter(int => int > 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest}₹`;
};

// calcDisplaySummary(account1.movements);

const creatUsername = function (acc) {
  acc.forEach(mov => {
    mov.userName = mov.owner
      .toLowerCase()
      .split(' ')
      .map(mov => mov[0])
      .join('');
  });
};
creatUsername(accounts);

const updateUI = function (acc) {
  openUi.style.display = 'none';
  getUi.style.display = 'none';
  displayMovements(acc.movements);

  calDispalyBalance(acc);

  calcDisplaySummary(acc);
};

let currentAccount;

//Display UI
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;

    containerApp.style.opacity = 100;

    inputCloseUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

//TRANSFER

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );

  if (
    amount > 0 &&
    reciverAcc &&
    amount <= currentAccount.balance &&
    reciverAcc.userName !== currentAccount.userName
  ) {
    currentAccount.movements.push(-amount);
    reciverAcc.movements.push(amount);

    updateUI(currentAccount);
  }
});

//loan

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputLoanAmount.value);
  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    currentAccount.movements.push(amount);
  }
  updateUI(currentAccount);
  inputLoanAmount.value = '';
});

//closing

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.userName === currentAccount.userName
    );

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputLoginPin.value = '';
});

//sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// for (const movement of movements) {
//   if (movement > 0) {
//     console.log(`you deposited ${movement}`);
//   } else {
//     console.log(`you withdrw ${Math.abs(movement)}`);
//   }
// }
// console.log('___________');

// movements.forEach(function (ele, index, arrr) {
//   if (ele > 0) {
//     console.log(`${index + 1}: you deposited ${ele}`);
//   } else {
//     console.log(`${index + 1}: you withdrw ${Math.abs(ele)}`);
//   }
// });

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
// currencies.forEach(function (val, i, map) {
//   console.log(`${i}: ${val}`);
// });
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// movements.forEach((val, index) => {
//   if (val > 0) {
//     console.log(`${index + 1}) Amount credited: ${val}`);
//   } else {
//     console.log(`${index + 1}) Amount debited: ${Math.abs(val)}`);
//   }
// });

//MAP
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// // const toInr = 1.1;

// // const movementsInr = movements.map(mov => mov * toInr);
// // console.log(movementsInr);

// const toInr = 1.1;
// const totalDepositINR = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * toInr)
//   .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositINR);
