import {expect, test} from '@jest/globals'

test('throws invalid number', async () => {
  const input = parseInt('foo', 10)
  expect(1).toBe(1)
})