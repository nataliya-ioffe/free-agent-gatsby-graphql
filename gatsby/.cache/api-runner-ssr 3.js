var plugins = [{
      plugin: require('/Users/nataliyaioffe/Documents/code/Free-Agency/gatsby-slick-slices/gatsby/node_modules/gatsby-plugin-styled-components/gatsby-ssr'),
      options: {"plugins":[]},
    },{
      plugin: require('/Users/nataliyaioffe/Documents/code/Free-Agency/gatsby-slick-slices/gatsby/node_modules/gatsby-source-sanity/gatsby-ssr'),
      options: {"plugins":[],"projectId":"9x47ybt0","dataset":"production","watchMode":true,"token":"skGcgjDn5bq8P7f30lKGzncLBvwgmOHj7Gth9RBFIxMgqaw19TFxweSBJJkqsR2TH9KAZqQTfhVOTKDZFjBKNKHvknwLhiJsshwTLQvSXA0CrcYI7QwHM43EHmqKxIpOZF6VeHs26qX9clfsirLNAn2IHiElDsm0KSO6AuIWmDZiKTFWlhXq"},
    },{
      plugin: require('/Users/nataliyaioffe/Documents/code/Free-Agency/gatsby-slick-slices/gatsby/gatsby-ssr'),
      options: {"plugins":[]},
    }]
// During bootstrap, we write requires at top of this file which looks like:
// var plugins = [
//   {
//     plugin: require("/path/to/plugin1/gatsby-ssr.js"),
//     options: { ... },
//   },
//   {
//     plugin: require("/path/to/plugin2/gatsby-ssr.js"),
//     options: { ... },
//   },
// ]

const apis = require(`./api-ssr-docs`)

// Run the specified API in any plugins that have implemented it
module.exports = (api, args, defaultReturn, argTransform) => {
  if (!apis[api]) {
    console.log(`This API doesn't exist`, api)
  }

  // Run each plugin in series.
  // eslint-disable-next-line no-undef
  let results = plugins.map(plugin => {
    if (!plugin.plugin[api]) {
      return undefined
    }
    const result = plugin.plugin[api](args, plugin.options)
    if (result && argTransform) {
      args = argTransform({ args, result })
    }
    return result
  })

  // Filter out undefined results.
  results = results.filter(result => typeof result !== `undefined`)

  if (results.length > 0) {
    return results
  } else {
    return [defaultReturn]
  }
}
