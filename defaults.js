const defaults = require('./defaults.json')
const fs = require('fs-extra')

Object.keys(defaults).forEach(fileName => {
  const langFilePath = `langs/en/${fileName}.json`
  const currentFile = require(`./${langFilePath}`)

  defaults[fileName].forEach(k => {
    if(!currentFile[k]) currentFile[k] = k
  })

  fs.ensureFileSync(langFilePath)
  fs.writeJsonSync(langFilePath, currentFile, { spaces: 2 })
})
