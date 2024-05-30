<?php 

require "vendor/autoload.php";
use app\classes\ListarProduct;

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Carrinho de Compras</title>
</head>
<body>
    <h1>Carrinho de Compras</h1>

    <aside id="container-asside"></aside>
    <section id="section"></section>

    <script>
        function adicionarProduto(produto) {
            enviarRequisicao(produto, 'adicionar');
        }

        function removerProduto(produto) {
            enviarRequisicao(produto, 'remover');
        }

        function enviarRequisicao(produto, acao) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "requisicao.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var quantidadeAtualizada = xhr.responseText;
                    document.getElementById("quantidade" + produto.replace(" ", "")).innerHTML = "Quantidade: " + quantidadeAtualizada;
                    if (quantidadeAtualizada == 0) {
                        document.getElementById(produto).remove();
                    }
                    
                }
            };
            xhr.send("produto=" + produto + "&acao=" + acao);
        }

        function adicionar(produto) {
            var acao = 'criar';
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "requisicao.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var resposta = xhr.responseText;

                    if (document.getElementById(produto)){
                        adicionarProduto(produto);
                    }
                    else{
                        var html = '<div id="' + produto + '"><h2>' + produto + '</h2><p id="quantidade' + produto + '" >Quantidade: 0</p><button onclick="adicionarProduto(\'' + produto + '\')" >Adicionar</button><button onclick="removerProduto(\'' + produto + '\')" >Remover</button></div>';
                    
                        document.getElementById("container-asside").innerHTML += html;
                        adicionarProduto(produto);    
                    }
                }
            };
            xhr.send("produto=" + produto + "&acao=" + acao);
        }

        function loadCart(acao) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "requisicao.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        var cart = JSON.parse(xhr.responseText); // Converte a resposta para um objeto JSON
                        for (var produto in cart) {
                            if (cart.hasOwnProperty(produto)) {
                                var html = '<div id="' + produto + '"><h2>' + produto + '</h2><p id="quantidade' + produto + '" >Quantidade: '+cart[produto]+'</p><button onclick="adicionarProduto(\'' + produto + '\')" >Adicionar</button><button onclick="removerProduto(\'' + produto + '\')" >Remover</button></div>';
                    
                                document.getElementById("container-asside").innerHTML += html;
                            }
                        }
                    } catch (e) {
                        console.error("Erro ao analisar JSON:", e);
                    }
                    
                }
            };
            xhr.send("produto=Feijão&acao=" + acao);
        }

        function loadPage(acao) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "requisicao.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    try {
                        var page = JSON.parse(xhr.responseText); // Converte a resposta para um objeto JSON
                        for (var produto in page) {
                            if (page.hasOwnProperty(produto)) {
                                var html = '<div id="Product'+produto+'"><h2>'+produto+'</h2><button onclick="adicionar(\''+produto+'\')">Adicionar</button></div>';
                                document.getElementById("section").innerHTML += html;
                            }
                        }
                    } catch (e) {
                        console.error("Erro ao analisar JSON:", e);
                    }
                    
                }
            };
            xhr.send("produto=Macarrão&acao=" + acao);
        }

        loadCart('loadCart');
        loadPage('loadPage');


    </script>
</body>
</html>