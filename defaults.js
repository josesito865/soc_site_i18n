const defaults = require('./defaults.json')
const fs = require('fs-extra')

Object.keys(defaults).forEach(fileName => {
  const data = {}

  defaults[fileName].forEach(k => {
    data[k] = k
  })

  const langFilePath = `en/${fileName}.json`
  fs.ensureFileSync(langFilePath)
  fs.writeJsonSync(langFilePath, data, { spaces: 2 })
})
