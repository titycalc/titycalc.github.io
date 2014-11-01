```
1 : 'this |- number
"" : 'this |- string
{x:1} : 'this |- {x:number}
[1] : 'this |- number array
```

```
function f() {} : 'this#{} |- unit -> undefined
function f(x){return x;} : 'this#{} |- 'a -> 'a


function f(x){this.x = x} : 'this#{x:'a ref} |- 'a -> 'a


f : 'this |- 'a -> 'b        x : 'this |- 'a
-----------------------------------
f(x) : 'this |- 'b


for example,

f : 'this#{x:'a ref} |- number -> number
1 : 'this#{x:'a ref} |- number
--------------------------------------------
f(1) : 'this#{x:'a ref} |- number
```


```
x : 'this |- 'a -> 'b      args  : 'this1 |- 'a
----------------------------
new x(args) : 'this1 |- 'this
```
