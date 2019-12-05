import Vue from 'vue'
import Pdf from './Main'
const PdfConstructor = Vue.extend(Pdf)

let instance = null

function install() {
  Vue.prototype.$readPdf = function(url) {
    if (!instance) {
      instance = new PdfConstructor({
        data: { src: 'http://res.zphtown.com/report.pdf' }
      })
      instance.$mount()
      document.body.appendChild(instance.$el)
    }
    if (instance.src !== url) {
      instance.src = 'http://res.zphtown.com/report.pdf'
    }
    instance.visible = true
  }
}
export default {
  install
}
