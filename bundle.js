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

Object.keys(bundle).forEach(lang => {
  fs.ensureFileSync(`build/${lang}.json`)
  fs.writeJsonSync(`build/${lang}.json`, bundle[lang])
})

