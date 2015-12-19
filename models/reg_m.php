<?php

class Reg_m extends Model {
    
    
    public function form_valid($name, $login, $password, $email) {
        $errors=array();
        if (empty($login)){
            $errors['login']="Вы не заполнили поле логин";
        }
        elseif (mb_strlen($login)<2){
            $errors['login']="Логин слишком короткий";
        }
        elseif (mb_strlen($login)>16){
            $errors['login']="Логин слишком длинный";
        }

        if (mb_strlen($password)<5){
            $errors['password']="Пароль должен быть длинней 4 символов";
        }
        if (empty($email)||!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)){
            $errors['email']="Вы не заполнили поле e-mail или заполнили неправильно";
        }
    
        return $errors;
    }

  
    public function user_to($login){
        $login = $this->db->escape($login);
        
        $sql = " SELECT `id` FROM `users` WHERE `login` = '{$login}' " ;
        
        if($this->db->query($sql)) {
            return 'Login: ' . $login . ' Занят - выберете другой "login" '; 
        }else{
            return false;
        } 
      
    }
    
    
    
    
    public function reg($name, $login, $password, $email) {
        $name = $this->db->escape($name);
        $login = $this->db->escape($login);
        $password = $this->db->escape($password);
        $email = $this->db->escape($email);
        $hash = libs::my_hash($login . $email);
        
        $sql = "INSERT INTO `users` SET
             `name` = '{$name}',
             `login` = '{$login}',
             `password` = '{$password}',
             `email` = '{$email}',
             `hash` = '{$hash}' " ; 

             
         if($this->db->query($sql)){
            $data['id'] = $this->db->last_id(); 
            $data['hash'] = $hash;   
            $data['email'] = $email;
            return $data;
         } else{
             return false;
             
         }
                
    }
    
     public function send_link($id, $hash ,$email) {
          Mail::$to = $email;
          Mail::$subject = 'registr';
          Mail::$text = '
                link: <br>'
                . Config::get('site_name') . 'reg/activate/' .$id .'/' .$hash ;
         
         
          if(Mail::Send()) {
              echo 'send true';
              exit;
          }else{
              echo 'send false';
              exit;
          }
          
     }
    
    
    public function act($id, $hash){
        
        if(is_numeric($id)){
            $id = (int)$id;
        }else{
             $info = 'Вы прошли по неверной ссылке';
             return $info;
        }
        
    
        $sql = "UPDATE `users` SET 
            `active` = 1
             WHERE hash = '{$hash}'
             AND id = '{$id}' ";    
        
        $res = $this->db->query($sql);
        
         if($res){
            return $info='Вы активированны';
                
         } else {
            return $info='Вы прошли по неверной ссылке';
         }
           
        
    }
        
    
}

