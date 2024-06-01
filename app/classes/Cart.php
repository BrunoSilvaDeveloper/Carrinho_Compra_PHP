<?php

namespace app\classes;

class Cart{

    private $cart;

    public function __construct() {
        // Inicializa a sessão, se não estiver iniciada
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        // Inicializa a sessão 'cart' se não estiver definida
        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = [];
        }

        $this->cart = $_SESSION['cart'];
    }

    public function getCart(): array{
        return $this->cart;
    }
    public function setCart($data){
        $this->cart = $data;
        $_SESSION['cart'] = $this->cart;
    }
}