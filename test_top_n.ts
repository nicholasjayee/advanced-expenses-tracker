const incomes = [
  { amount: 10 },
  { amount: 50 },
  { amount: 20 },
  { amount: 5 },
  { amount: 100 },
  { amount: 30 },
  { amount: 80 }
];

const top = [];
for (const item of incomes) {
  if (top.length < 5) {
    top.push(item);
    top.sort((a, b) => b.amount - a.amount);
  } else if (item.amount > top[4].amount) {
    top[4] = item;
    top.sort((a, b) => b.amount - a.amount);
  }
}
console.log(top);
