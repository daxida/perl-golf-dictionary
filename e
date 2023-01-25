use integer;map{($Y,$M,$D)=/\d+/g;$Y-=$M<3;$M+=12*($M<3);say qw(Satur Sun Mon Tues Wednes Thurs Fri)[($D+((26*($M+1))/10)+$Y+($Y/4)+(6*($Y/100))+($Y/400)) % 7],day}@ARGV
