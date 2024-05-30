<?php

namespace app\classes;
use app\traits\VerificarProductInCart;
use app\traits\VerificarEstoqueProduct;


class AdicionarProduct extends Action{
    use verificarEstoqueProduct;
    use VerificarProductInCart;
     
    public function adicionarProduct(){
        if (!$this->productIsExistInEstoque()){
            throw new \Exception('Nao possuimos mais estoque deste produto');
        }else{
            if($this->productIsExistInCart($this->cart, $this->product)){
                $this->cart[$this->product] += 1;
                $this->Cart->setCart($this->cart);
            }else{
                $this->cart[$this->product] = 1;
                $this->Cart->setCart($this->cart);
            }
        }
        
    }

    
}