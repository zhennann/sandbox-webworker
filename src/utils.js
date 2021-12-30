export default {
  fn2workerURL: function (fn) {
    const blob = new window.Blob(['(' + fn + ')()'], { type: 'text/javascript' });
    return window.URL.createObjectURL(blob);
  },
};
