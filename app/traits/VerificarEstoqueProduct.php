<?php

namespace app\traits;

trait VerificarEstoqueProduct{
    public function productIsExistInEstoque(): bool{
        if (in_array($this->product, array_keys($this->listaProducts))){
            return true;
        }
        else{
            return false;
        }
    }
}