<?php

class SendPostController extends Controller {
    
    public function __construct($data = array()) {
        parent::__construct($data);
        $this->model = new SendPost_m();
    }
    
 
    public function index(){
        
    }
}