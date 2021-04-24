# Cheat!

### That's a simple cheat that is made from reverse engineering of my game!

To use open the console (F12), paste it and execute the code.

```js
setInterval(() => {
    if(line.style.bottom == "100%" || line.style.bottom == "99%" || line.style.bottom == "98%"){
        simulateKey(32);
    }
}, 10)
```
