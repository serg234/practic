<?php

class Libs {
   public static function my_hash($var) {
	$salt = 'ABC';
	$salt2 = 'CBA';
	$var = crypt(md5($var.$salt),$salt2);
	return $var;
}
}
