const glob = require('glob')
const fs = require('fs-extra')

const baseList = glob.sync('langs/**/**.json')
const bundle = {}
console.log(baseList)
baseList.forEach(space => {
  const [, lang, filename] = space.split('/')
  const name = filename.split('.json')[0]

  if (!bundle[lang]) bundle[lang] = {}
  bundle[lang][name] = require(`./${space}`)
})

fs.ensureFileSync('build/index.json')
fs.writeJsonSync('build/index.json', bundle)
