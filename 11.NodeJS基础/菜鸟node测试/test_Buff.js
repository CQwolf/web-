const buf = Buffer.from('university', 'ascii');

// 输出 72756e6f6f62
console.log(buf.toString('hex'));

// 输出 cnVub29i
console.log(buf.toString('base64'));

console.log(buf.toString("ucs2"));

console.log(buf.toString("UTF-8"));

console.log(buf.toString("utf16le"));

console.log(buf.toString("latin1"));