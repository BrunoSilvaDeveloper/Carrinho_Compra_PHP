<?php

require "../../vendor/autoload.php";
use app\classes\AdicionarProduct;
use app\classes\DeletarProduct;
use app\classes\ListarProduct;
use app\classes\Products;


// Verifica se a solicitação contém as informações necessárias
if (isset($_POST['produto']) && isset($_POST['acao'])) {
    $produto = $_POST['produto'];
    $acao = $_POST['acao'];

    if ($acao == 'adicionar'){
        (new AdicionarProduct($produto))->adicionarProduct();
        $quantidadeAtualizada = (new ListarProduct($produto))-> listarProduct();
        echo $quantidadeAtualizada;
    }
    if ($acao == 'remover'){
        (new DeletarProduct($produto))->deletarProduct();
        $quantidadeAtualizada = (new ListarProduct($produto))-> listarProduct();
        echo $quantidadeAtualizada;
    }
    if ($acao == 'zerar'){
        (new DeletarProduct($produto))->zerarProduct();
        $quantidadeAtualizada = (new ListarProduct($produto))-> listarProduct();
        echo $quantidadeAtualizada;
    }
    if ($acao == 'loadCart'){
        $loadCart = (new ListarProduct($produto))-> listarCart();
        echo json_encode($loadCart);
    }
    if ($acao == 'loadPage'){
        $loadPage = (new Products)-> getProducts();
        echo json_encode($loadPage);
    }
    if ($acao == 'loadCheckout'){
        $priceCheckout = 0;
        $Cart = (new ListarProduct($produto))-> listarCart();
        foreach( $Cart as $product){
            $priceCheckout += ($product["Quantidade"] * $product["Price"]);
        }
        echo $priceCheckout;
    } 

    
}

//adicionar

//verificar o produto   
//verificar se tem estoque do produto
//adicionar produto no carrinho

//visualizar

//verificar se existem produtos no carrinho
//listar produtos do carrinho


//excluir 

//verificar produto
//verificar se este produto existe no carrinho
//excluir produto

// $adicionarProduct = (new AdicionarProduct('Arroz'))->adicionarProduct();
// $adicionarProduct = (new AdicionarProduct('Arroz'))->adicionarProduct();
// $adicionarProduct = (new AdicionarProduct('Feijão'))->adicionarProduct();
// $adicionarProduct = (new AdicionarProduct('Macarrão'))->adicionarProduct();
// $adicionarProduct = (new AdicionarProduct('Macarrão'))->adicionarProduct();
// $adicionarProduct = (new AdicionarProduct('Arroz'))->adicionarProduct();
// $adicionarProduct = (new AdicionarProduct('Feijão'))->adicionarProduct();
// $adicionarProduct = (new AdicionarProduct('Arroz'))->adicionarProduct();

//echo (new ListarProduct('Arroz'))-> listarProduct();

// $deletarProduct = (new DeletarProduct('Macarrão'))->deletarProduct();
// echo (new ListarProduct('Macarrão'))-> listarProduct();

?>