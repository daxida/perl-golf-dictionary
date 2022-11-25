until
---
while loop until condition is false
iii
ccc
$n = 32;
# $- += $n * 3, $n /= 2 while $n >= 5;
$- += $n * 3, $n /= 2 until $n < 5; 
print $-
ooo
168
***
while
---
while loop
iii
ccc
$n = 32;
while ($n > 5) {
  $- += $n * 3;
  $n /= 2 
}
print $-
ooo
168
iii
ccc
$n = 32;
$- += $n * 3, $n /= 2 while $n > 5; # one line while
print $-
ooo
168
***
sprintf "%.2f", $N + .0049
---
ceil $N to 2 decimal places
***
sprintf "%.2f", $N - .0049
---
floor $N to 2 decimal places
***
sprintf "%.2f", $N
---
round $N to 2 decimal places
***
--$|
---
flip flop expression
iii
1
2
3
ccc
--$| ? $- += $_ : print $-, $/ for <>
ooo
2
***
${+uc}
---
evaulate inner function on $_ rather than bareword
iii
ccc
$_ = "neat";
${+uc} = $_;
print $NEAT
ooo
neat
***
use Data::Dumper;
print Dumper
---
debug print
iii
ccc
use Data::Dumper;

@A = qw(a b c);
print Dumper @A
ooo
$VAR1 = 'a';
$VAR2 = 'b';
$VAR3 = 'c';
iii
ccc
use Data::Dumper;

@A = qw(a b c);
print Dumper \@A # array ref
ooo
$VAR1 = [
          'a',
          'b',
          'c'
        ];
***
print STDERR
---
print text to stderr
iii
ccc
@A = qw(1 2 3);
print STDERR "hi", @A
***
print + nice, 3
---
use + to print bareword instead of trying to print at filehandle (must have something after)
***
reverse @A 
---
reverse @A as a list
***
~~ reverse $S
---
reverse $S as a scalar
iii
ccc
$S = "fall";
print ~~ reverse $S
ooo
llaf
iii
ccc
$S = "fall";
print $S . reverse $S # dont need inchworm if you cast to scalar in other ways
ooo
fallllaf
***
-+- $S
---
convert $S to a number (high precedence)
iii
ccc
print -+- "5bruh" x 5
ooo
55555
***
print + (1 + 2), 3
---
decrease function precedence with +
iii
ccc
$a = "cool";
$b = "beans";
print substr + ($a .= "a$b"), 3
ooo
labeans
***
$S + 0
---
convert $S to a number
iii
ccc
print "34" + 0
ooo
34
iii
ccc
print "   34bruh" + 0
ooo
34
iii
ccc
print " -34.5bruh" + 0
ooo
-34.5
iii
ccc
print " -.5bruh" + 0
ooo
-0.5
iii
ccc
print "bruh" + 0
ooo
0
iii
ccc
print "-    5bruh" + 0
ooo
0
***
(1 x $N) !~ /^1?$|^(11+?)\1+$/
---
abigails regex: check if $N is prime
***
2 == grep $' % $_ < 1, $N =~ // .. $N
---
check if $N is prime
iii
ccc
print join $/, grep {2 == grep $' % $_ < 1, // .. $_} 1..10
ooo
2
3
5
7
***
#!perl -p
---
printing loop flag (shebang must be on first line)
iii
ccc
# equivalent code
while ($_ = <>) {
CODE
; # semicolon significant
print 
}
iii
ccHhiICckKEeNn
wwwwow
ccc
#!perl -p
s/(.)\1+/length($&) . $1/eg
ooo
2cHhiICckKEeNn
4wow
iii
ccc
#!perl -p
@; = qw(1 2 3);
# remember that semicolon?
$_ = @
ooo
3
iii
aa bruh
bruhz
ccc
#!perl -p
# includes newline and no re flags so very niche
s;bruh;wow
ooo
aa wow

wow 
z
iii
chicken
finger
ccc
#!perl -p
# ignores extra sub so bit more useful
y;chi;ihc
ooo
ihciken
fcnger
---
3
***
split
---
split string on a delimiter (usually if glob doesn't work)
iii
a b c
ooo
print join $/, split $", <>
ccc
a
b
c
iii
a b c
ccc
$_ = <>;
print join $/, split # default " " and $_
ooo
a
b
c
***
$C ^ $"
---
swap case of character $C (char must be alphabetic)
iii
abVcDS
ccc
print $_ ^ $" for <> =~ /./g
ooo
ABvCds
***
pack "H*", $A
---
convert a hex string $A into regular string
iii
ccc
print pack "H*", "616263"
ooo
abc
***
unpack "%C*", $A
---
sum of ord of each char in $A
***
unpack "%B*", $A
---
number of 1 in binary representation of string $A
***
unpack "(A$N)*", $A
---
split string $A into chunks of $N
iii
ccc
$_ = "bruh";
print join $/, unpack "(A2)*" # default last arg is $_
ooo
br
uh
***
for
---
for loop
iii
ccc
for ($i = 0; i < 5; i++) {
  print $i, $/
}
ooo
0
1
2
3
4
iii
ccc
for (0..4) {
  print $_, $/ # $_ is default for loop var
}
ooo
0
1
2
3
4
iii
ccc
print $_, $/ for 0..4 # one line for
ooo
0
1
2
3
4
***
grep {
  //;
  grep ($' % $_ < 1, 50..$') % 2
} @A
---
short nested grep
***
//, map print $' * $_, @A for 1..5
---
short nested for loop
***
map {
  //; # save outer $_ to $' (post match)
  print $' + $_, $/ for 1..5
} @A
---
short nested map
***
map
---
apply function to each value of a list
iii
ccc
@A = (1, 2, 3);
@A = map {$_ * 2 + 1} @A # $_ is default map var
print join $/, @A
ooo
3
5
7
iii
ccc
@A = (1, 2, 3);
@A = map $_ * 2 + 1, @A # comma variation (only use with one statement)
print join $/, @A
ooo
3
5
7
***
eval $N =~ s/\B/+/gr
---
digit sum of $N
iii
ccc
$_ = 123;
print eval s/\B/+/gr
ooo
6
***
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
~~@A
---
length of @A
iii
ccc
@A = qw(a b c);
print ~~@A
ooo
3
iii
ccc
@A = qw(a b c);
$l = @A; # dont need inchworm if you cast to scalar in other ways
print $l
ooo
3
iii
ccc
@A = qw(a b c);
print @A + 5
ooo
8
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
iii
ccc
sub F {
  my ($a, $b) = @_; # "my" keyword denotes local var
  $a < 1 and return $b;

  F int $a / 2, $b * 2
}

print F 5, 2;
ooo
16
***
print
---
print something with arguments delimited by $, and ending with $\
iii
ccc
@A = qw(1 2 3);
$, = "+";
print @A
ooo
1+2+3
iii
ccc
print "bruh", "nice"
ooo
bruhnice
iii
ccc
$\ = "wow";
$, = "chicken";
print 3, 5
ooo
3chicken5wow
ccc
***
substr $s, $a, $b
---
substring of length $b of string $s starting from index $a
iii
ccc
print substr "abcdefgasdfsdf", 6, 2
ooo
iii
ccc
print substr "abcdefgasdfsdf", 6, -2 # up to the -2 index
ooo
gasdfs
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
treat string as bitstring
iii
ccc
$a = "abc";
print vec $a, 0, 8; # 8 bits offset of 0 chunks of 8 bits kinda like ord(($a =~ /./g)[0]) in this case
ooo
97
***
$A x $B
---
string multiplication of $A by $B
***
sqrt
---
low precedence square root
iii
ccc
$x = 256;
print sqrt $x ** .5
ooo
***
oct
---
convert binary (base 2) or octal (base 8) string to decimal
iii
ccc
$B = "1010";
print oct "b$B"
ooo
10
iii
ccc
$B = "10";
print oct $B
ooo
8
***
hex
---
convert hexadecimal (base 16) string to decimal
iii
ccc
$B = "10";
print oct "b$B"
ooo
16
ccc
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
print join $/, grep {$_ % 2} glob <> # $_ is default grep var
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
get combinations of @A from length 1 to length $L of arr and store into @C
***
$L = @A = qw(a b c);
@P = map"@{[map$A[$_],/./g]}"x/^[0-$#A]{0,$L}$/,0..$$
---
get all permutations of @A from len 0 to length $L of arr and store into @P
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