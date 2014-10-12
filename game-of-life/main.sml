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

val DOM : foreignptr = fromId "game-of-life"
val WIDTH = 100
val HEIGHT = 100

datatype status = LIVE | DEAD
type cell = { pos : int * int
            , status : status ref
            , dom : foreignptr }
type cells = cell array array
fun isLive {status=ref(LIVE),pos,dom} = true
  | isLive {status=ref(DEAD),pos,dom} = false
fun isDead cell = not (isLive cell)
fun regenerate (cell : cell) = (
    (#status cell) := LIVE;
    setAttribute (#dom cell) "fill" "#0F0";
    setAttribute (#dom cell) "stroke" "#0F0")
fun kill (cell : cell) = (
    (#status cell) := DEAD;
    setAttribute (#dom cell) "fill" "#000";
    setAttribute (#dom cell) "stroke" "#000")
fun app (f,a) = Array.app (fn b => Array.app f b) a
fun appi (f,a) = Array.appi (fn (i,b) => Array.appi(fn (j,x) => f(i,j,x)) b) a
fun tabulate (width, height, f) = Array.tabulate(width, fn x => Array.tabulate(height, fn y => f(x, y)))
fun sub (cells, x, y) = Array.sub(Array.sub(cells, x), y)

datatype instr = REGENERATE of cell | KILL of cell
val execInstrs = List.app (fn REGENERATE cell => regenerate cell
                          | KILL cell => kill cell)
fun isLiveAt (cells : cells, x, y) =
    if x < 0 orelse x >= WIDTH orelse y < 0 orelse y >= HEIGHT then
        false
    else
        isLive(sub(cells, x, y))
fun isDeadAt (cells : cells, x, y) = not (isLiveAt(cells, x, y))
fun ++ i = i := !i + 1
fun makeInstr (cells : cells, x, y) =
    if x < 0 orelse x >= WIDTH orelse y < 0 orelse y >= HEIGHT then
        NONE
    else
        let val cell = sub(cells, x, y)
            val countLivingNeghbors = ref 0
        in
            if isLiveAt(cells,x,y+1) then ++countLivingNeghbors else ();
            if isLiveAt(cells,x,y-1) then ++countLivingNeghbors else ();
            if isLiveAt(cells,x+1,y+1) then ++countLivingNeghbors else ();
            if isLiveAt(cells,x+1,y) then ++countLivingNeghbors else ();
            if isLiveAt(cells,x+1,y-1) then ++countLivingNeghbors else ();
            if isLiveAt(cells,x-1,y+1) then ++countLivingNeghbors else ();
            if isLiveAt(cells,x-1,y) then ++countLivingNeghbors else ();
            if isLiveAt(cells,x-1,y-1) then ++countLivingNeghbors else ();
            case (!(#status cell), !countLivingNeghbors) of
                (DEAD, 3) => SOME (REGENERATE cell)
              | (DEAD, _) => NONE
              | (LIVE, 0) => SOME (KILL cell)
              | (LIVE, 1) => SOME (KILL cell)
              | (LIVE, 2) => NONE
              | (LIVE, 3) => NONE
              | (LIVE, _) => SOME (KILL cell)
        end
fun update (cells : cells) =
    let val instrs = ref []
    in
        appi(fn (i,j,cell) =>
                case makeInstr(cells,i,j) of
                    SOME instr => instrs := instr :: !instrs
                  | NONE => (),
             cells);
        execInstrs (!instrs)
    end
fun make () =
    let val i = ref 0
        val cells = tabulate(WIDTH, HEIGHT, fn (x,y) => { pos = (x, y), status = ref DEAD, dom = ref NONE })
    in
      while !i < WIDTH do
        let val x = !i
            val j = ref 0
        in
          while !j < HEIGHT do
            let val y = !j
                val rect = createRect ()
                val cell = sub(cells, x, y)
            in
              setAttribute rect "x" (Int.toString (x*5));
              setAttribute rect "y" (Int.toString (y*5));
              setAttribute rect "fill" "#000";
              setAttribute rect "stroke" "#000";
              setAttribute rect "width" "5";
              setAttribute rect "height" "5";
              appendChild {elem=DOM, child=rect};
              (#dom cell) := SOME rect;
              ++j
            end;
          ++i
        end;
      tabulate(WIDTH, HEIGHT, fn (x, y) =>
              let val {pos, status, dom=ref(SOME dom)} = sub(cells, x, y)
              in
                  {pos=pos, status=status, dom=dom}
              end)
    end

val cells = make()

val () = ( regenerate (sub(cells,49,50))
         ; regenerate (sub(cells,50,49))
         ; regenerate (sub(cells,50,50))
         ; regenerate (sub(cells,50,51))
         ; regenerate (sub(cells,51,49))
         )

val intervalId = Js.setInterval 100 (fn () => update cells)
