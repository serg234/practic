<?php
class Mail {
	static $subject = 'Вы зарегистрировались на нашем сайте';
	static $from = 'mars251@mail.ru';
	static $to = 'icolorwave@gmail.com';
	static $text = 'Шаблонное письмо';
	static $headers = '';
	
	static function send() {
		self::$subject = '=?utf-8?b?'. base64_encode(self::$subject) .'?=';
		self::$headers = "Content-type: text/html; charset=\"utf-8\"\r\n";
		self::$headers .= "From: ".self::$from."\r\n";
		self::$headers .= "MIME-Version: 1.0\r\n";
		self::$headers .= "Date: ". date('D, d M Y h:i:s O') ."\r\n";
		self::$headers .= "Precedence: bulk\r\n";

		return mail(self::$to,self::$subject,self::$text,self::$headers);
	}



	static function testSend() {
		if(mail(self::$to,'English words','English words')) {
			echo 'Письмо отправилось';
		} else {
			echo 'Письмо не отправилось';
		}
		exit();
	}
}
