<?php

namespace app\classes;
use app\traits\VerificarProductInCart;

class DeletarProduct extends Action{
    use VerificarProductInCart;
    public function deletarProduct(){
        $carrinho = $this->Cart->getCart();
        $produto = $this->product;
        if ($this->productIsExistInCart($carrinho, $produto) == true){
            $this->cart[$this->product] -= 1;
            if ($this->cart[$this->product] == 0){
                unset($this->cart[$this->product]);
            }
            $this->Cart->setCart($this->cart);
        }
    }
        
}