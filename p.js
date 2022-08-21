let data = require('./src/models/User')

let a = data.findByPk(20);
let b = data.findByField('user','ElChileno')
let c = (a || b);

console.log('usuario a:' )
console.log(a)
console.log('usuario b:' )
console.log(b)
console.log('usuario c:' )
console.log(c.id)
