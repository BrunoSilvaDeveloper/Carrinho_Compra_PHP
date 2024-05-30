<?php

namespace app\classes;

class Action{
    protected string $product;
    private $Product;
    protected $Cart;
    protected array $listaProducts;
    protected array $cart;

    public function __construct(string $product){
        $this->product = $product;
        $this->Product = new Products;
        $this->Cart = new Cart;
        $this->listaProducts = $this->Product->getProducts();
        $this->cart = $this->Cart->getCart();
    }

}