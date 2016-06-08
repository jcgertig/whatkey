const keycodeShiftedKeys = {
  '/': '?',
  '.': '>',
  ',': '<',
  '\'': '\"',
  ';': ':',
  '[': '{',
  ']': '}',
  '\\': '|',
  '`': '~',
  '=': '+',
  '-': '_',
  '1': '!',
  '2': '@',
  '3': '#',
  '4': '$',
  '5': '%',
  '6': '^',
  '7': '&',
  '8': '*',
  '9': '(',
  '0': ')',
  'a': 'A',
  'b': 'B',
  'c': 'C',
  'd': 'D',
  'e': 'E',
  'f': 'F',
  'g': 'G',
  'h': 'H',
  'i': 'I',
  'j': 'J',
  'k': 'K',
  'l': 'L',
  'm': 'M',
  'n': 'N',
  'o': 'P',
  'q': 'q',
  'r': 'R',
  's': 'S',
  't': 'T',
  'u': 'U',
  'v': 'V',
  'w': 'W',
  'x': 'X',
  'y': 'Y',
  'z': 'Z'
};

const keyCodeUnshiftedKeys = {};
for (const x in keycodeShiftedKeys) {
  const shiftedKey = keycodeShiftedKeys[x];
  keyCodeUnshiftedKeys[shiftedKey] = x;
}

const keydownKeycodeDictionary = {
  0: '\\',

  8: '\b',
  9: '\t',

  12: 'num',
  13: '\n',

  16: 'shift',
  17: 'meta',  // 'ctrl' on windows, 'cmd' on mac
  18: 'alt',   // aka 'option'
  19: 'pause', // or sometimes 'break'?
  20: 'caps',

  27: 'esc',

  32: ' ',
  33: 'pageup',
  34: 'pagedown',
  35: 'end',
  36: 'home',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',

  44: 'print',
  45: 'insert',
  46: 'delete',

  48: '0',
  49: '1',
  50: '2',
  51: '3',
  52: '4',
  53: '5',
  54: '6',
  55: '7',
  56: '8',
  57: '9',

  59: ';',

  61: '=',

  65: 'a',
  66: 'b',
  67: 'c',
  68: 'd',
  69: 'e',
  70: 'f',
  71: 'g',
  72: 'h',
  73: 'i',
  74: 'j',
  75: 'k',
  76: 'l',
  77: 'm',
  78: 'n',
  79: 'o',
  80: 'p',
  81: 'q',
  82: 'r',
  83: 's',
  84: 't',
  85: 'u',
  86: 'v',
  87: 'w',
  88: 'x',
  89: 'y',
  90: 'z',
  91: 'cmd',   // 'left window key'
  92: 'cmd',   // 'right window key'
  93: 'cmd',   // 'select key'

  96: 'num0',
  97: 'num1',
  98: 'num2',
  99: 'num3',
  100: 'num4',
  101: 'num5',
  102: 'num6',
  103: 'num7',
  104: 'num8',
  105: 'num9',
  106: '*',
  107: '+',
  108: 'num_enter',
  109: 'num_subtract',
  110: 'num_decimal',
  111: 'num_divide',
  112: 'f1',
  113: 'f2',
  114: 'f3',
  115: 'f4',
  116: 'f5',
  117: 'f6',
  118: 'f7',
  119: 'f8',
  120: 'f9',
  121: 'f10',
  122: 'f11',
  123: 'f12',
  124: 'print',

  144: 'num',    // num lock
  145: 'scroll', // scroll lock

  173: '-',

  186: ';',
  187: '=',
  188: ',',
  189: '-',
  190: '.',
  191: '/',
  192: '`',
  219: '[',
  220: '\\',
  221: ']',
  222: '\'',
  223: '`',
  224: 'cmd',
  225: 'alt',

  57392: 'ctrl',
  63289: 'num'
};

const keypressCharacterMap = {
  '\r': '\n'
};

const keydownCharacterMap = {
  'num_subtract': '-',
  'num_enter': '\n',
  'num_decimal': '.',
  'num_divide': '/'
};

export const unprintableKeys = [
  '\b','num','shift','meta','alt','pause','caps','esc',
  'pageup','pagedown','end','home',
  'left','up','right','down',
  'print','insert','delete','cmd',
  'f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12',
  'scroll','ctrl'
];

function getKeypressKeycodeValue(charcode) {
  const character = String.fromCharCode(charcode);
  if (character in keyCodeUnshiftedKeys) {
    return keyCodeUnshiftedKeys[character];
  } else if (character in keypressCharacterMap) {
    return keypressCharacterMap[character];
  }
  return character;
}

const validEvents = ['keydown', 'keyup'];

export default function(event) {
  let key;
  if (event.type === 'keypress') {
    key = getKeypressKeycodeValue(event.charCode);
  } else if (validEvents.indexOf(event.type) > -1) {
    if (event.which !== undefined) {
      key = keydownKeycodeDictionary[event.which];
    } else if (event.keyCode !== undefined) {
      key = keydownKeycodeDictionary[event.keyCode];
    } else {
      key = '\n';
    }
  } else {
    return false;
  }

  let char = key;
  if (event.shiftKey && key in keycodeShiftedKeys) {
    char = keycodeShiftedKeys[key];
  } else if (key in keydownCharacterMap) {
    char = keydownCharacterMap[key];
  }

  return {
    char,
    key
  };
}
