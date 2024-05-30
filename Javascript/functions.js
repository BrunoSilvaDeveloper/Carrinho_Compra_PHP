function adicionarProduto(produto) {
    enviarRequisicao(produto, 'adicionar');
}

function removerProduto(produto) {
    enviarRequisicao(produto, 'remover');
}

function zerarProduto(produto){
    enviarRequisicao(produto, 'zerar');
}

function enviarRequisicao(produto, acao) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../app/requisicao/requisicao.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var quantidadeAtualizada = xhr.responseText;
            document.getElementById("quantidade" + produto.replace(" ", "")).innerHTML = quantidadeAtualizada;
            loadCheckout('loadCheckout'); 
            if (quantidadeAtualizada == 0) {
                document.getElementById(produto).remove();
            }

            
        }
    };
    xhr.send("produto=" + produto + "&acao=" + acao);
}

function adicionar(produto, price, quantidade) {
    if (document.getElementById(produto)){
        adicionarProduto(produto);
    }
    else{
        var html = '<div class="card-cart" id="'+produto+'"><div class="img-cart"></div><div class="info-cart"><div class="container-cart"><div class="title-product-cart"><p>' + produto + '</p></div><div class="price-quant"><div class="price-cart"><p>$ '+price.toString().replace('.', ',')+'</p></div><div class="quant-cart"><button class="subtrair-cart" onclick="removerProduto(\'' + produto + '\')">-</button><div class="quantidade-cart"><p id="quantidade'+produto+'">'+quantidade+'</p></div><button class="adicionar-cart" onclick="adicionarProduto(\'' + produto + '\') ">+</button></div></div></div><div class="action-cart"><button onclick="zerarProduto(\'' + produto + '\')">x</button></div></div></div>';
    
        document.getElementById("container-card-cart").innerHTML += html;
        adicionarProduto(produto);
        loadCheckout('loadCheckout'); 
    }
}

function loadCheckout(acao){
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../app/requisicao/requisicao.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var price = xhr.responseText;
            document.getElementById("price-total-cart").innerHTML = '$ '+price;
        }
    };
    xhr.send("produto=Macarrão&acao=" + acao);

    
}

function loadCart(acao) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../app/requisicao/requisicao.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var cart = JSON.parse(xhr.responseText); // Converte a resposta para um objeto JSON
                var priceCheckout = 0;
                for (var produto in cart) {
                    if (cart.hasOwnProperty(produto)) {
                        // var html = '<div id="' + produto + '"><h2>' + produto + '</h2><p id="quantidade' + produto + '" >Quantidade: '+cart[produto]["Quantidade"]+'</p><button onclick="adicionarProduto(\'' + produto + '\')" >Adicionar</button><button onclick="removerProduto(\'' + produto + '\')" >Remover</button></div>';

                        var html = '<div class="card-cart" id="'+produto+'"><div class="img-cart"></div><div class="info-cart"><div class="container-cart"><div class="title-product-cart"><p>' + produto + '</p></div><div class="price-quant"><div class="price-cart"><p>$ '+cart[produto]["Price"].toString().replace('.', ',')+'</p></div><div class="quant-cart"><button class="subtrair-cart" onclick="removerProduto(\'' + produto + '\') ">-</button><div class="quantidade-cart"><p id="quantidade'+produto+'">'+cart[produto]["Quantidade"]+'</p></div><button class="adicionar-cart" onclick="adicionarProduto(\'' + produto + '\') ">+</button></div></div></div><div class="action-cart"><button onclick="zerarProduto(\'' + produto + '\')">x</button></div></div></div>';
            
                        document.getElementById("container-card-cart").innerHTML += html;
                        
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
    xhr.open("POST", "../app/requisicao/requisicao.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var page = JSON.parse(xhr.responseText); // Converte a resposta para um objeto JSON
                for (var produto in page) {
                    if (page.hasOwnProperty(produto)) {
                        //var html = '<div id="Product'+produto+'"><h2>'+produto+'</h2><button onclick="adicionar(\''+produto+'\', ' + page[produto]["Price"] + ', ' + page[produto]["Quantidade"] + ')">Adicionar</button></div>';

                        var html = '<div class="card" id="Product'+produto+'"><div class="img"></div><div class="info"><div class="title"><p>'+produto+'</p></div><div class="description"><p>' + page[produto]["Description"] + '</p></div><div class="container"><div class="price"><p>$' + page[produto]["Price"] + '</p></div><div class="action"><button onclick="adicionar(\''+produto+'\', ' + page[produto]["Price"] + ', ' + page[produto]["Quantidade"] + ')">Add to Cart</button></div></div></div></div>'

                        document.getElementById("section").innerHTML += html.replace('.', ',');   
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
loadCheckout('loadCheckout');