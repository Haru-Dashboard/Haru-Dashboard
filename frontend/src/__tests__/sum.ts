function sum(x: number, y: number) {
  return x + y;
}

test('1 + 1 = 2', () => {
  expect(sum(1, 1)).toBe(2);
});

test('1 + 2 != 2', () => {
  expect(sum(1, 2)).not.toBe(2);
});
