fun fromId (s:string) : foreignptr =
    prim("execStmtJS",
         ("return document.getElementById(s);",
         "s",s))

fun appendChild {elem : foreignptr, child : foreignptr} : unit =
    prim("execStmtJS",
         ("elem.appendChild(child)",
         "elem,child",elem,child))

fun getAttribute (elem:foreignptr) (attr:string) : string =
    prim("execStmtJS",
         ("return elem.getAttribute(attr);",
         "elem,attr",elem,attr))

fun setAttribute (elem:foreignptr) (attr:string) (value:string) : unit =
    prim("execStmtJS",
         ("return elem.setAttribute(attr, value);",
         "elem,attr,value",elem,attr,value))

datatype status = LIVE | DEAD
type cell = { pos : int * int
            , status : status ref
            , livingNeighborsCount : int ref
            , dom : foreignptr
            }
type cells = cell array array
fun app (f,a) = Array.app (fn b => Array.app f b) a
fun appi (f,a) = Array.appi (fn (i,b) => Array.appi(fn (j,x) => f(i,j,x)) b) a
fun tabulate (width, height, f) = Array.tabulate(width, fn x => Array.tabulate(height, fn y => f(x, y)))
fun sub (cells, x, y) = Array.sub(Array.sub(cells, x), y)
fun uniq xs =
    let
        fun compare ((x0,y0),(x1,y1)) =
            if x0 = x1 then Int.compare(y0,y1) else Int.compare(x0,x1)
        val rest = ref (Listsort.sort compare xs)
        val ret = ref []
    in
      while not(null(!rest)) do (
        let val elem = List.hd(!rest)
        in
          ret := elem :: !ret;
          while not(null(!rest)) andalso elem = List.hd(!rest) do (
            rest := List.tl(!rest))
        end);
      List.rev(!ret)
    end

val WIDTH = 100
val HEIGHT = 100
val CELLS = tabulate(WIDTH, HEIGHT, fn (x, y) => { pos = (x, y), status = ref DEAD, livingNeighborsCount = ref 0, dom = fromId ("game-of-life-" ^ Int.toString x ^ "-" ^ Int.toString y)})

fun ++ i = i := !i + 1
fun -- i = i := !i - 1
fun append l x = l := x :: !l
fun up (x,y) = if y-1 < 0 then (x,HEIGHT-1) else (x,y-1)
fun down (x,y) = if y+1 < HEIGHT then (x,y+1) else (x,0)
fun right (x,y) = if x+1 < WIDTH then (x+1,y) else (0,y)
fun left (x,y) = if x-1 < 0 then (WIDTH-1,y) else (x-1,y)
val up_right = up o right
val up_left = up o left
val down_right = down o right
val down_left = down o left
fun moore xy = [ up xy, down xy, right xy, left xy,
                 up_right xy, up_left xy, down_right xy, down_left xy ]

datatype instr = REGENERATE of cell | KILL of cell
fun regenerate (cell : cell) = (
    List.app
        (fn (x,y) =>
            ++(#livingNeighborsCount (sub(CELLS, x, y))))
        (moore (#pos cell));
    (#status cell) := LIVE;
    setAttribute (#dom cell) "fill" "#0F0";
    setAttribute (#dom cell) "stroke" "#0F0")
fun kill (cell : cell) = (
    List.app
        (fn (x,y) =>
            --(#livingNeighborsCount (sub(CELLS, x, y))))
        (moore (#pos cell));
    (#status cell) := DEAD;
    setAttribute (#dom cell) "fill" "#000";
    setAttribute (#dom cell) "stroke" "#000")
val NEXT_INSTRS = ref [ REGENERATE (sub(CELLS,49,50))
                      , REGENERATE (sub(CELLS,50,49))
                      , REGENERATE (sub(CELLS,50,50))
                      , REGENERATE (sub(CELLS,50,51))
                      , REGENERATE (sub(CELLS,51,49)) ]
fun makeInstr (x, y) =
        let val cell = sub(CELLS, x, y)
            val countLivingNeighbors = !(#livingNeighborsCount cell)
        in
            case (!(#status cell), countLivingNeighbors) of
                (DEAD, 3) => append NEXT_INSTRS (REGENERATE cell)
              | (DEAD, _) => ()
              | (LIVE, 0) => append NEXT_INSTRS (KILL cell)
              | (LIVE, 1) => append NEXT_INSTRS (KILL cell)
              | (LIVE, 2) => ()
              | (LIVE, 3) => ()
              | (LIVE, _) => append NEXT_INSTRS (KILL cell)
        end

fun execInstrs () =
    let val modified_poses = ref []
        val instrs = !NEXT_INSTRS
        val cells = List.map (fn REGENERATE cell => cell
                            | KILL cell => cell) instrs;

    in
        NEXT_INSTRS := [];
        List.app (fn REGENERATE cell => regenerate cell
                 | KILL cell => kill cell) instrs;
        List.app (fn cell => modified_poses := (moore (#pos cell))
                                               :: !modified_poses) cells;
        List.app(makeInstr)(uniq(List.concat(!modified_poses)))
    end

fun update () = execInstrs()

val id = Js.setInterval 100 update
