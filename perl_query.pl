($% / 2) - ($% < 0) / 2
---
floor divide $% by 2 (must use $%)
***
$A >> $n 
---
floor divide positive number $A by 2 ** $n
iii
ooo
$A = 5;
print $A >> 1
ccc
2
iii
ooo
$A = 20;
$A >>= 2;
print $A
ccc
5
***
sprintf "%0${L}d", $B
---
left pad $B string with $L length minimum
***
@A
---
length of @A in scalar context
iii
ccc
@A = qw(a b c);
$l = @A;
print $l
ooo
3
iii
ccc
@A = qw(a b c);
print @A + 5
ooo
8
iii
ccc
@A = qw(a b c);
print ~~@A
ooo
3
***
and
---
low precendence logical and
iii
1
2
5
6
ccc
$_ % 2 and $x += $_, $- += $x for <>;
print $-
ooo
7
***
or
---
low precedence logical or
iii
1
2
5
6
ccc
$_ % 2 or $x += $_, $- += $x for <>;
print $-
ooo
10
***
$A =~ s/ *$//
---
trim trailing space from $A
***
v98.114.117.104
---
v string
iii
50
ccc
print 1e9.<>^v1
ooo
000000000050
iii
ccc
print s00bruh0r x10for v10
ooo
bruh
bruh
bruh
bruh
bruh
bruh
bruh
bruh
bruh
bruh
***
sub add {
  my ($a, $b) = @_
  $a + $b
}

$c = add 5, 3
---
function / subroutine
***
$a ? $b : $c
---
ternary operator
iii
1
2
0
4
0
21
0
4
ccc
$_ ? $a : $b += ($z += $_) for <>; # lvalue ($_ ? $a : $b) += ($z += $_)
print $a * $b
ooo
148
***
$_ = eval s!\B!*!gr while /../
---
product of digits of $_ until it's less than 10
***
$A =~ s/(.)(.)/$2$1/g
---
swap every 2 chars of $Z
iii
badcfe
ccc
print <> =~ s/(.)(.)/$2$1/gr
ooo
abcdef
***
s///egirl
---
execute global insenstive-case return locale (joke entry)
iii
hcciekn
ccc
print s/(.)(.)/"$2$1"/egirl
ooo
chicken
***
use POSIX;
print ~~ strtol "abc", 36
---
base conversion from a base containing `0-9a-z` (2-36) to decimal
***
for $i (0..5) {
  for $j (0..5) {
    print $i + $j, $/
  }
}
---
nested for loop with custom variable
***
%A
---
hash variable %A
iii
ccc
%A = qw(a b);
$A{"e"} = 5;
print keys %A # random order
ooo
ea
iii
abcdefabvcbaddfba
ccc
$- += $H{$_}++ == 1 for <> =~ /./g;
print $-
ooo
5
***
@A
---
list variable @A
iii
ccc
@A = qw(a b c);
print @A
ooo
abc
iii
ccc
@A = qw(a b c);
print ~~@A # cast to scalar
ooo
3
***
$#A
---
print the length of the @A - 1 (last index of @A)
iii
a b c d
ccc
#!perl -a
print $#F
ooo
3
***
<@A>
---
first item of list @A (need to cast to scalar)
iii
ccc
@A = qw(a b c);
print <@A> . $/
ooo
a
***
A .. "`"
---
char range list
iii
ccc
print "@{['A' .. 'Z']}" 
ooo
A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
***
${\map $A += $_, @A}
---
get the last element of a list expression
iii
1
2
3
ccc
print 2 * ${\map $A += $_, 1..$_}, $A = $/ for <>
ooo
2
6
12
***
"@{[$A + 3]}"
---
string interpolate an expression as a list
iii
1 2 3
ccc
@A = glob <>;
print "@{[map $_ + 1, @A]}"
ooo
2 3 4
***
$A . $B
---
string concatenate $A and $B
***
eval "\$A =~ y/$a/$b/"
---
transliterate $A with variable input chars $a and output $b
iii
w
d
ccc
$_ = "wow";
$a = <>;
$b = <>;
eval "y/$a/$b/";
print
ooo
dod
***
-($A < 0) + int $A
---
floor a positive / negative number
***
$A | 0
---
floor a positive number $A
***
$A + .5 | 0
---
round a positive number $A
***
sprintf "%.f", $_
---
round a positive / negative number
***
$_=$_%2?3*$_+1:$_/2|<>,$z++while$_-1
---
store number of values of the collatz sequence of <> into $z
***
$\ += $_ + shift@A for@B
---
zip sum of two lists @A and @B and store result in $\
***
@_
---
subroutine argument list
***
print
---
print
***
substr
---
substr
***
1 .. $n
---
range from 1 to $n inclusive
***
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
print+(<i like chicken>)[$a <=> $b];
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
print "[$A]"
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