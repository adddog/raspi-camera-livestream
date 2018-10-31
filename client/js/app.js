import 'whatwg-fetch'
import Model from './model'

const isProd = process.env.NODE_ENV === "production"
require('fastclick')(document.body);

var html = require('choo/html')
var log = require('choo-log')
var choo = require('choo')

var app = choo()
if (!isProd) {
  function logger(state, emitter) {
    emitter.on('*', function(messageName, data) {
      console.log('event', messageName, data)
    })
  }
  app.use(log());
  app.use(logger);
}

app.use(Model)

const onload = (el) => {}

//VIEWS
const menu = require('./views/menu')
const videoForm = require('./views/videoForm')
const controls = require('./views/controls')

function mainView(state, prev, send) {
  return html `
    <div
    class="app w-100 sans-serif bg-white"
    onload=${onload}
    >
    ${videoForm(state.sites, prev, send)}
    ${controls(state.sites, prev, send)}
    </div>
  `
}
app.route(`*`, mainView)

var tree = app.start()
document.body.appendChild(tree)
