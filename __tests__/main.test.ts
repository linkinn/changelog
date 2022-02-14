import path from 'path'

import {expect} from '@jest/globals'
import {getOldlogs, mountLog} from '../src/changelog'

const getOldLogs = async (filePath: string) => {
  const changelogFileName = path.resolve(filePath)
  const encoding = 'utf-8'
  const oldLogs = await getOldlogs({changelogFileName, encoding})
  return oldLogs
}

describe('Cangelog Action', () => {
  it('should read file', async () => {
    const oldLogs = await getOldLogs('__tests__/test.md')
  
    expect('file read test').toBe(oldLogs)
  })

  it('should mount final log one line', async () => {
    const newLog = 'add log'
    const oldLogs = await getOldLogs('__tests__/test.md')
    const wordFind = 'file read test'

    const finalLog = mountLog({newLog, oldLogs, wordFind})
    expect(`${oldLogs}\n\n- ${newLog}`).toBe(finalLog)
  })

  it('should mount final log multi line', async () => {
    const newLog = 'add log'
    const oldLogs = await getOldLogs('__tests__/test2.md')
    const wordFind = '## Alterações'

    const log = `# v1.0.0

## Alterações

- ${newLog}
---
`

    const finalLog = mountLog({newLog, oldLogs, wordFind})
    expect(log).toBe(finalLog)
  })
})
