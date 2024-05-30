<?php

namespace app\traits;

trait VerificarProductInCart{
    public function productIsExistInCart($cart, $product): bool{
        $retorno = in_array($product, array_keys($cart));
        if ($retorno){
            return true;
        }
        else{
            return false;
        }
    }
}