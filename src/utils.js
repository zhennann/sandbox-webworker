export function fn2workerURL(fn) {
      const blob = new Blob(['(' + fn + ')()'], { type: 'text/javascript' });
      return URL.createObjectURL(blob);
    }
