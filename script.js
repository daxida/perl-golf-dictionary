const QUERY = (() => {/*
# ($`, $') = split $", <>;
<> =~ $"
---
split $" seperated line once into 2 variables $` and $' respectively
***
# $` = <>; $' = `dd`;
`dd` =~ $/
---
split $/ seperated all of input into $` and $'
***
vec
---
vec
***
$A x $B
---
string multiplication of $A by $B
***
sqrt
---
sqrt
***
oct
---
oct
***
hex
---
hex
***
printf
---
print values after applying format
iii
ccc
printf "%02d:02d", 5, 32;
ooo
05:32
iii
5
ccc
printf "%b", <>
ooo
101
iii
8
ccc
printf "%o", <>
ooo
10
iii
15
ccc
printf "%x", <>
ooo
f
***
sprintf
---
return value of printf
iii
5
ccc
print sprintf("%b", <>) =~ y/0//
ooo
1
***
$_ = "we
go";
$T.=join("",/^./mg).$/while s///g
---
transpose $_ with \n seperated values and store in $T
***
$a = 3;
$b = 5;
print+(<@ like chicken>)[$a <=> $b];
---
3 way comparison with $ and $b
less last, equal earliest, greater goldilocks (give me a better last one lol)
***
@A = qw(i like chicken);
print $A[rand @A]
---
print a random value from a list
***
$_ = "12 43 5 -32 43 1";
s!\S+ !print $& - $', $/!ge
---
apply a function on each consecutive pair of space seperated pairs of values
***
$n = 10000;
$b = 10;
@D=(0)x!$n;
$D[@D]=$n%$b,$n=$n/$b|0while$n
---
store digits of $n in base $b into @D
***
use Math'BigInt bgcd;
$a = bgcd->from_base("chicken", 36);
$b = $a->to_base(36);
---
base conversion from a base containing `0-9a-z` (2-36)
***
use Math'BigInt bgcd;
$a = bgcd->from_base("chikenchikenchikenchiken", 6, "chiken");
$b = $a->to_base(6, "chiken");
---
base conversion from arbitrary base with specified base values
***
grep
---
filter a list by predicate
iii
1 2 3 4 5
ccc
print join $/, grep {$_ % 2} glob <>
ooo
1
3
5
iii
1
2
3
4
5
ccc
print join $/, grep $_ % 2, <> # comma variation (only use with single statement)
ooo
1
3
5
***
sort
---
sort a list by string comparison by default or custom sort
iii
ccc
print sort "hello" =~ /./g
ooo
ehllo
iii
ccc
@A = (1, 4, 3, 12);
print join $/, sort {$a - $b} @A
ooo
1
3
4
12
***
$A
---
scalar variable $A
iii
ccc
$A = 3;
print $A
ooo
3
iii
ccc
$A = "hi"; 
print $A .= "bruh"
ooo
hibruh
***
print"Hello, World!
"
---
Hello World program
***
/1/
---
check if there is a `1` in the string
iii
123
ccc
print <> =~ /1/ ? "one" : "no one"
ooo
one
iii
123
23
ccc
print /1/ ? "one" : "no one", $/ for <>
ooo
one
no one
***
`dd`
---
calls dd command from bash and returns scalar / list delimited by $/
iii
i like chicken
and chicken likes me
ccc
$A = `dd`;
print "["$A]"
ooo
[i like chicken
and chicken likes me]
iii
i like chicken
and chicken likes me
ccc
$/ = "l";
@A = `dd`;
print map {"[$_]"} @A
ooo
[i l][ike chicken
and chicken l][ikes me]
***
glob <>
---
split line of input on \S+ and remove empty values (won't work if any `}{*` present)
***
use Math'BigInt bgcd;
$n = <>;
print bgcd($n)->bfac
---
print the factorial of $n as a bigint
***
$L = @A = qw(a b c);
sub c{c($_,@_)for"@_"+1..$L;push@C,"@{[map$A[$_-1],@_]}"x(@_<=$L)}c
---
get combinations of @A from length 1 to length arr and store into @C
***
$L = @A = qw(a b c);
@P = map"@{[map$A[$_],/./g]}"x/^[0-$#A]{0,$L}$/,0..$$
---
get all permutations of @A from len 0 to len arr and store into @P
***
/./g
---
list of chars
iii
bruh
ccc
print join $", <> =~ /./g
ooo
b r u h
iii
ccc
$_ = lc "BrUh";
print join $/, map ord, /./g
ooo
98
114
117
104
***
$a + $b
---
add $a to $b
iii
ccc
$a = 3;
$b = 5;
print $a + $b
ooo
8
iii
ccc
$a = 3;
$b = 5;
$c = $a + $b;
print $c
ooo
8
iii
ccc
$c = 3;
print $c + "5"
ooo
8
iii
ccc
$c = 3;
print $c + "5aaaa3"
ooo
8
iii
43aw
23
ccc
$c = 3;
print $c + <>
ooo
46
***
chr
---
character of the ascii value
iii
97
ccc
$_ = <>;
print chr
ooo
a
iii
ccc
$a = chr "97az32";
print $a
ooo
a
iii
100
98
97
ccc
print "a" . chr for <>
ooo
acabaa
***
ord
---
ascii value of character
iii
abc
ccc
$_ = <>;
print ord
ooo
97
iii
abc
ccc
print ord, $/ for <> =~ /./g
ooo
97
98
99
***
<>
---
stdin (list / scalar)
iii
1
2
3
ccc
print for <> # list context and preserves delimeter`,
ooo
1
2
3
iii
bruh
ccc
print $_, $/ for <> =~ /./g # scalar contex
ooo
b
r
u
h
iii
3
7
ccc
print <> * <>
ooo
21
iii
3 7
ccc
$/ = $";
print <> * <>
ooo
21
iii
bruh+bruh-cool
ccc
$/ = "+";
print $_, "
" for <> =~ /./g
ooo
b
r
u
h
+
***
y///c
---
length of $_
iii
nice plate
ccc
$_ = <>;
print y///c
ooo
9
iii
nice plate
ccc
$a = <>;
print $a =~ y///c
ooo
9
***
y/1//
---
count amount of `1` in string
iii
ccc
$_ = "chicken 1 chicken 2 123";
print y/1//
ooo
2
iii
ccc
$a = "chicken 1 chicken 2 123";
print $a =~ y/1//
ooo
2
*/}).toString().slice(10, -4);
// console.log(QUERY);

const QUERY_ARR = QUERY.split("\n***\n");
// console.log(QUERY_ARR);
const CODE_ARR = QUERY_ARR.map(query => {
  console.log(query);
  var [code, desc_pre] = query.split("\n---\n");
  var [desc, ...example_str_arr] = desc_pre.split("\niii\n");
  example_arr = example_str_arr.map(example_str => {var [stdin, code, stdout] = example_str.split(/\n?(?:ccc|ooo)\n/g); 
    if (stdin === "") {
      return [code, stdout];
    } else {
      return [stdin, code, stdout];
    }
  });
  return example_arr.length == 0 ? [code, desc] :[code, desc, example_arr];
});

console.log(CODE_ARR);


async function code_arr_text(code_arr) {
  var ind = 0;
  return code_arr.map((x, i) => {
    const [code, description, example_arr] = x;
    var z = `
    <table border="5">
    <tr>
  <td style="width:60vh" class="code-x" id = "code-${ind}">${code}</td>
  <textarea class="code" id = "code-${ind}">${code}</textarea>
  <td style="width:35vh">${description}</td>
  <td style="width:5vh">
    <button onclick="[...document.getElementsByClassName('${i}')].map(d=>d.classList.toggle('show'));">Examples</button>
  </td>
</tr>
</table>
`;
    ind += 1;
    var example_dropdown = ""
    if (typeof example_arr === "undefined") {
      z = z.replace(`    <button onclick="[...document.getElementsByClassName('${i}')].map(d=>d.classList.toggle('show'));">Examples</button>`, "")
    } else {
      example_dropdown = example_arr.map(e => {
        var stdin = "";
        // console.log(e);
        if (e.length == 3) {
          [stdin, c, stdout] = e;
          stdin = `<td class="snippet">${stdin}</td>`;
        } else {
          stdin = "";
          [c, stdout] = e;
        }
        n = `<tr class="tr-example">
    <textarea class="code" id = "code-${ind}">${c}</textarea>${stdin}<td class="snippet code-x" id = "code-${ind}">${c}</td><td class="snippet">${stdout}</td>
  </tr>`;
        ind += 1;
        return n;
      }).join("\n");
    }

    z += `<table class="table-example dropdown ${i}">${example_dropdown}</table>`;

    return z;

  }).join("\n")
}

async function code_mirror_rep() {
  // console.log([...document.getElementsByClassName("code")]);
  [...document.getElementsByClassName("code")].sort((a, b) => a.id.split("-")[1] - b.id.split("-")[1]).map(elem => {
    console.log("eleme there", elem);
    var editor = CodeMirror.fromTextArea(elem, {}, elem.id);
    console.log(editor.chicken);
  })
}

async function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

async function syntax_rep() {
  SYNTAX_LOOP = setInterval(function() {
    if (!document.getElementsByClassName("code")) {
      return;
    }


    var code_x_elem_arr = [...document.getElementsByClassName("code-x")];
    var code_ind = 0;
    console.log("builder big is what", BUILDER_BIG);
    // var span_string = BUILDER_BIG.map((builder_line) => {
    Object.keys(BUILDER_BIG).forEach(function (builder_id) { 
      var code_elem_arr = [...BUILDER_BIG[builder_id].children];
      var code_text = code_elem_arr.map(ce => [...ce.childNodes][0].innerHTML).join("\n");
      code_x_elem_arr.find(cx => cx.id == builder_id).innerHTML = code_text;
    })
    var a = [...document.getElementsByClassName("CodeMirror")]
    a.map(x => x.remove());

    clearInterval(SYNTAX_LOOP);
    BUILDER_BIG = {};
  }, 10);
}

async function main(code_arr) {
  IND = 0;
  a = await code_arr_text(code_arr);
  // console.log(a);
  await $("#TABLE").html(a);
  await code_mirror_rep();
  await syntax_rep();
}

$(document).ready(() => {
  main(CODE_ARR);
  $("#QUERY").on("keyup", (e) => {
    console.log("huh");
    if (e.keyCode != 13) {
      return;
    }
    // console.log("HI");
    var query = $("#QUERY").val();
    console.log("HI");


    main(CODE_ARR.filter(x => {
      [code, description, example_arr] = x;

      var raw_re = new RegExp(String.raw`${query}`);
      var re = new RegExp(query);
      return re.test(code) || raw_re.test(code)
        || re.test(description) || raw_re.test(description)
    }));
  });
});