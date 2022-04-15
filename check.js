const fs = require('fs-extra')
const glob = require('glob')
// const path = require('path')

const langs = require('./langs.json')

const baseList = glob.sync('en/**.json')
baseList.forEach(space => {
  langs.forEach(lang => {
    const base = require(`./${space}`)
    const fileName = space.replace('en/', '')

    const langFilePath = `${lang}/${fileName}`
    const newFile = !fs.existsSync(langFilePath)
    const langFile = !newFile ? require(`./${langFilePath}`) : {}

    const add = Object.keys(base).filter(k => !langFile[k])
    const remove = Object.keys(langFile).filter(k => !base[k])

    add.forEach(k => {
      langFile[k] = base[k]
    })

    remove.forEach(k => {
      delete langFile[k]
    })

    if (add.length > 0 || remove.length > 0) {
      if (newFile) fs.ensureFileSync(langFilePath)
      fs.writeJsonSync(langFilePath, langFile, { spaces: 2 })
    }
  })
})
