import utils from './utils.js';
import workerJS from './sandbox.spec.js';
export default function () {
  return {
    _idCounter: 0,
    _callbacks: {},
    _worker: null,
    getWorker() {
      if (this._worker) return this._worker;
      const blobURL = utils.fn2workerURL(workerJS.toString());
      this._worker = new Worker(blobURL);
      this._worker.onmessage = event => {
        const { id, err, value } = event.data;
        const cb = this._callbacks[id];
        if (cb) {
          delete this._callbacks[id];
          cb.callback(err, value);
        }
      };
      return this._worker;
    },
    evaluate(expression, scope) {
      return new Promise((resolve, reject) => {
        // id
        const id = ++this._idCounter;
        // callback
        this._callbacks[id] = {
          callback: (err, value) => {
            if (err) return reject(new Error(err.message));
            resolve(value);
          },
        };
        // worker
        const worker = this.getWorker();
        // postMessage
        worker.postMessage({ id, expression, scope });
      });
    },
  };
}
