const fs = require('fs-extra')
const glob = require('glob')

const langs = require('./langs.json')

const baseList = glob.sync('langs/en/**.json')
baseList.forEach(space => {
  langs.forEach(lang => {
    const base = require(`./${space}`)
    const fileName = space.replace('langs/en/', '')

    const langFilePath = `langs/${lang}/${fileName}`
    const newFile = !fs.existsSync(langFilePath)
    const langFile = newFile ? {} : require(`./${langFilePath}`)

    let add = false
    let remove = false

    Object.keys(base).forEach(k => {
      if (!langFile[k]) {
        add = true
        langFile[k] = base[k]
      }
    })

    Object.keys(langFile).forEach(k => {
      if (!base[k]) {
        remove = true
        delete langFile[k]
      }
    })

    if (add || remove) {
      if (newFile) fs.ensureFileSync(langFilePath)
      fs.writeJsonSync(langFilePath, langFile, { spaces: 2 })
    }
  })
})
