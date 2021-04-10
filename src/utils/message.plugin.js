export default {
  install(Vue, options) {
    Vue.prototype.$message = function(html) {
      M.toast(text);
    };

    Vue.prototype.$error = function(html) {
      M.toast({ html: "[Error]: ${html}" });
    };
  }
};
