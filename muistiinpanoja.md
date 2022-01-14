## JSX

Reactia kirjoitetaan JSX:nä. JSX on melkein HTML:ää erotuksella, että mukaan voi kirjoittaa dynaamista sisältöä kirjoittamalla JavaScriptiä aaltosulkeiden sisälle. JSXssä jokainen tagi tulee sulkea eli vaikka HTMLssä rivinvaihto voidaan kirjoittaa ```<br>```, niin JSXää kirjoittaessa tagi on pakko sulkea ```</br>```

React-komponenttien nimien tulee alkaa isolla kirjaimella


## JavaScript

### Lukumateriaalia

https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript

https://github.com/getify/You-Dont-Know-JS

https://javascript.info/

https://egghead.io/

### Listojen elementtejä
const t = [1, 2, 3, 4, 5]
const [first, second, ...rest] = t
console.log(first, second)  // tulostuu 1, 2
console.log(rest)          // tulostuu [3, 4 ,5]

### Oliot 
```
const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'Filosofian tohtori',
}
```

Voidaan lisätä kenttiä pistenotaatiolla tai hakasulkeilla
```
object1.address = 'Tapiola'
object1['secret number'] = 12341
```

### Nuolifunktiota

Täydellinen tapa nuolifunktion määrittelyyn on 

```
const sum = (p1, p2) => {
  console.log(p1)
  console.log(p2)
  return p1 + p2
}

Jos parametreja on yksi, sulut voidaan jättää pois:
```
const square = p => {
  console.log(p)
  return p * p
}
```

Jos funktio sisältää yhden lausekkeen, voidaan aaltosulkeet jättää pois.
```
const square = p => p * p
```
tai
```
const t = [1, 2, 3]
const tSquared = t.map(p => p * p)
```

### Eksplisiittinen funktiomäärittely

```
function product(a, b) {
  return a * b
}
```
tai
```
const average = function(a, b) {
  return (a + b) / 2
}
```

### Nuolifunktion console.log

Pro tip 3: Mikäli console.login haluaa vain pikaisesti ujuttaa koodiin nuolifunktiota muuttamatta, voi sen tehdä näppärästi myös tällä tapaa:

const total = 
  parts.reduce( (s, p) => console.log('what is happening', s, p) || someMagicHere )