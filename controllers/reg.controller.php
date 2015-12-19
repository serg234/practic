<?php

class RegController extends Controller {
    
    public function __construct($data = array()) {
        parent::__construct($data);
        $this->model = new Reg_m();
    }

    public function index(){

        if( $_POST ) {
            
            
            $this->data['errors_valid'] = $this->model->form_valid($_POST['name'], $_POST['login'], $_POST['password'], $_POST['email']) ;

            if(!count($this->data['errors_valid'])){
        
                $this->data['errors_login'] = $this->model->user_to($_POST['login']);
        
                if(!$this->data['errors_login'] == true){
                     
                    $data_reg = $this->model-> reg($_POST['name'], $_POST['login'], $_POST['password'] ,$_POST['email']);
        
                    $this->model->send_link($data_reg['id'], $data_reg['hash'], $data_reg['email'] );
            
                    $_SESSION['regok']="OK"; // Для завершение регистрации, перейдите по вашей ссылке для активации которая на вашей почте!
                   
                
                }    
       
        
            }
        }  
    
    }

    

    public function activate(){
        if(isset($this->params[0], $this->params[1])){
           $this->data['activate'] = $this->model->act();
        }
       
    
    }

}

?>