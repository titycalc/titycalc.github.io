fun fromId s =
    let open JsCore
    in exec1 { stmt = "return document.getElementById(s);"
             , arg1 = ("s", string)
             , res = fptr
             } s
    end

fun appendChild {elem, child} =
    let open JsCore
    in exec2 { stmt = "elem.appendChild(child)"
             , arg1 = ("elem", fptr)
             , arg2 = ("child", fptr)
             , res = unit } (elem, child)
    end

fun createRect () =
    let open JsCore
    in exec0 { stmt = "return document.createElementNS('http://www.w3.org/2000/svg', 'rect')"
             , res = fptr } ()
    end

fun getAttribute elem attr =
    let open JsCore
    in exec2 { stmt = "return elem.getAttribute(attr);"
             , arg1 = ("elem", fptr)
             , arg2 = ("attr", string)
             , res = string
             } (elem, attr)
    end

fun setAttribute elem attr value =
    let open JsCore
    in exec3 { stmt = "return elem.setAttribute(attr, value);"
             , arg1 = ("elem", fptr)
             , arg2 = ("attr", string)
             , arg3 = ("value", string)
             , res = unit
             } (elem, attr, value)
    end

datatype direction = up | down | right | left
datatype color = white | black
type ant = { pos : (int * int) ref
           , direction : direction ref
           }
type ants = ant array
type cell = { color : color ref
            , dom : foreignptr
            }
type cells = cell array array

fun turn_right up = right
  | turn_right right = down
  | turn_right down = left
  | turn_right left = up

fun turn_left up = left
  | turn_left left = down
  | turn_left down = right
  | turn_left right = up

fun inverse white = black
  | inverse black = white

fun turn_by_color white = turn_left
  | turn_by_color black = turn_right

fun app (f,a) = Array.app (fn b => Array.app f b) a
fun appi (f,a) = Array.appi (fn (i,b) => Array.appi(fn (j,x) => f(i,j,x)) b) a
fun tabulate (width, height, f) = Array.tabulate(width, fn x => Array.tabulate(height, fn y => f(x, y)))
fun sub (cells, x, y) = Array.sub(Array.sub(cells, x), y)

val WIDTH = 100
val HEIGHT = 100
val ANTS = [{ pos = ref(50,50), direction = ref right }]
val CELLS = tabulate(WIDTH, HEIGHT, fn (x, y) => { color = ref black, dom = fromId ("ant-" ^ Int.toString x ^ "-" ^ Int.toString y)})

fun next_point {pos = ref(x,y), direction = ref d} =
    case d of
        right =>
        if x + 1 >= WIDTH
        then (0,y)
        else (x+1,y)
      | left =>
        if x - 1 < 0
        then (WIDTH-1,y)
        else (x-1,y)
      | up =>
        if y - 1 < 0
        then (x,HEIGHT-1)
        else (x,y-1)
      | down =>
        if y + 1 >= WIDTH
        then (x,0)
        else (x,y+1)

fun drop_ant (cell : cell) =
    (setAttribute (#dom cell) "fill" "#F00";
     setAttribute (#dom cell) "stroke" "#F00")

fun update_cell (cell : cell) =
    case !(#color cell) of
        white => (setAttribute (#dom cell) "fill" "#FFF";
                  setAttribute (#dom cell) "stroke" "#FFF")
      | black => (setAttribute (#dom cell) "fill" "#000";
                  setAttribute (#dom cell) "stroke" "#000")

fun update () =
    let fun eff (ant as {pos = ref(x,y), direction = ref(d)}) =
            let val cell = sub(CELLS, x, y)
            in
                (#direction ant) := turn_by_color (!(#color cell)) d;
                (#pos ant) := next_point ant;
                (#color cell) := inverse (!(#color cell));
                update_cell cell;
                drop_ant(sub(CELLS, (#1 (!(#pos ant))), (#2 (!(#pos ant)))))
            end
    in
        List.app eff ANTS
    end

val id = Js.setInterval 50 update
