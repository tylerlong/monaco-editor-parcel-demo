import { editor as monaco } from 'monaco-editor';

self.MonacoEnvironment = {
  getWorkerUrl: function () {
    return './ts.worker.js';
  },
};

monaco.create(document.getElementById('container')!, {
  value: ['function x() {', '\tconsole.log("Hello world!");', '}'].join('\n'),
  language: 'typescript',
});
