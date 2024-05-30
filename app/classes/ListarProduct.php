<?php

namespace app\classes;
use app\traits\VerificarProductInCart;

class ListarProduct extends Action{
    use VerificarProductInCart;
    
    
    public function listarProduct(){
        if($this->productIsExistInCart($this->cart, $this->product) == true){
            return $this->cart[$this->product]["Quantidade"];
        }else{
            return 0;
        }  
    }

    public function listarCart(){
        return $this->cart;
    }


}