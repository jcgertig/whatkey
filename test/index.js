import whatkey from '../src';
window.whatkey = whatkey;

document.addEventListener('keydown', (event) => {
  console.log(whatkey(event)); // eslint-disable-line
});
