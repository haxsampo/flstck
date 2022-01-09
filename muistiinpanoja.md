## JSX

Reactia kirjoitetaan JSX:nä. JSX on melkein HTML:ää erotuksella, että mukaan voi kirjoittaa dynaamista sisältöä kirjoittamalla JavaScriptiä aaltosulkeiden sisälle. JSXssä jokainen tagi tulee sulkea eli vaikka HTMLssä rivinvaihto voidaan kirjoittaa ´´´<br>´´´, niin JSXää kirjoittaessa tagi on pakko sulkea ´´´</br>´´´

React-komponenttien nimien tulee alkaa isolla kirjaimella


## JavaScript

### Listojen elementtejä
const t = [1, 2, 3, 4, 5]
const [first, second, ...rest] = t
console.log(first, second)  // tulostuu 1, 2
console.log(rest)          // tulostuu [3, 4 ,5]

### Oliot 

const object1 = {
  name: 'Arto Hellas',
  age: 35,
  education: 'Filosofian tohtori',
}

Voidaan lisätä kenttiä pistenotaatiolla tai hakasulkeilla
```
object1.address = 'Tapiola'
object1['secret number'] = 12341
```