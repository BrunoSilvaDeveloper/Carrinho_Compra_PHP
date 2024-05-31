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
                document.getElementById(produto.replace(" ", "")).remove();
            }

            
        }
    };
    xhr.send("produto=" + produto.replace(" ", "%20") + "&acao=" + acao);
}

function adicionar(produto, price, quantidade) {
    var idProduto = produto.replace(/\s+/g, '');
    if (document.getElementById(idProduto)){
        adicionarProduto(produto);
    }
    else{
        
        var html = '<div class="card-cart" id="'+idProduto+'"><div class="img-cart"><img src="../assets/'+idProduto+'.jpg" alt="'+produto+'"></div><div class="info-cart"><div class="container-cart"><div class="title-product-cart"><p>' + produto + '</p></div><div class="price-quant"><div class="price-cart"><p>$ '+price.toString().replace('.', ',')+'</p></div><div class="quant-cart"><button class="subtrair-cart" onclick="removerProduto(\'' + produto + '\')">-</button><div class="quantidade-cart"><p id="quantidade'+idProduto+'">'+quantidade+'</p></div><button class="adicionar-cart" onclick="adicionarProduto(\'' + produto + '\') ">+</button></div></div></div><div class="action-cart"><button onclick="zerarProduto(\'' + produto + '\')">x</button></div></div></div>';
    
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
                for (var produto in cart) {
                    if (cart.hasOwnProperty(produto)) {
                        // var html = '<div id="' + produto + '"><h2>' + produto + '</h2><p id="quantidade' + produto + '" >Quantidade: '+cart[produto]["Quantidade"]+'</p><button onclick="adicionarProduto(\'' + produto + '\')" >Adicionar</button><button onclick="removerProduto(\'' + produto + '\')" >Remover</button></div>';

                        var idProduto = produto.replace(/\s+/g, '');
                        var html = '<div class="card-cart" id="'+idProduto+'"><div class="img-cart"><img src="../assets/'+idProduto+'.jpg" alt="'+produto+'"></div><div class="info-cart"><div class="container-cart"><div class="title-product-cart"><p>' + produto + '</p></div><div class="price-quant"><div class="price-cart"><p>$ '+cart[produto]["Price"].toString().replace('.', ',')+'</p></div><div class="quant-cart"><button class="subtrair-cart" onclick="removerProduto(\'' + produto + '\') ">-</button><div class="quantidade-cart"><p id="quantidade'+idProduto+'">'+cart[produto]["Quantidade"]+'</p></div><button class="adicionar-cart" onclick="adicionarProduto(\'' + produto + '\') ">+</button></div></div></div><div class="action-cart"><button onclick="zerarProduto(\'' + produto + '\')">x</button></div></div></div>';
            
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
                createpage(page, acao);
                
            } catch (e) {
                console.error("Erro ao analisar JSON:", e);
            }
            
        }
    };
    xhr.send("produto=Macarrão&acao=" + acao);
}

function getText() {
    const inputElement = document.getElementById('myInput');
    const inputValue = inputElement.value;
    if(inputValue === ''){
        loadPage('loadPage');
    }else{
        pesquisar('pesquisar', inputValue);
    }
    
}

function clearInput() {
    const inputElement = document.getElementById('myInput');
    inputElement.value = '';
    loadPage('loadPage');
}

function pesquisar(acao, product) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../app/requisicao/requisicao.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            try {
                var page = JSON.parse(xhr.responseText); // Converte a resposta para um objeto JSON
                createpage(page, acao, product);
                
            } catch (e) {
                console.error("Erro ao analisar JSON:", e);
            }
            
        }
    };
    xhr.send("produto=Macarrão&acao=" + acao);
}

function createpage(page, action, product = ''){

    if (action == 'loadPage'){
        document.getElementById("section").innerHTML = ''; 
        for (var produto in page) {
            if (page.hasOwnProperty(produto)) {
                var idProduto = produto.replace(/\s+/g, '');
                var html = '<div class="card" id="Product'+idProduto+'"><div class="img"> imagem </div><div class="info"><div class="title"><p>'+produto+'</p></div><div class="description"><p>' + page[produto]["Description"] + '</p></div><div class="container"><div class="price"><p>$' + page[produto]["Price"] + '</p></div><div class="action"><button onclick="adicionar(\''+produto+'\', ' + page[produto]["Price"] + ', ' + page[produto]["Quantidade"] + ')">Add to Cart</button></div></div></div></div>'
                
                html = html.replace('.', ',');
                html = html.replace('imagem', '<img src="../assets/'+idProduto+'.jpg" alt="'+produto+'"></img>');
        
                document.getElementById("section").innerHTML += html;
            }
        }
        
    }
    else if(action == 'pesquisar') {
        document.getElementById("section").innerHTML = ''; 
        for (var produto in page) {
            if (page.hasOwnProperty(produto)) {

                var produtoVerificar = produto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                var productVerificar = product.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                if (produtoVerificar.includes(productVerificar)){
                    var idProduto = produto.replace(/\s+/g, '');
                    var html = '<div class="card" id="Product'+idProduto+'"><div class="img"> imagem </div><div class="info"><div class="title"><p>'+produto+'</p></div><div class="description"><p>' + page[produto]["Description"] + '</p></div><div class="container"><div class="price"><p>$' + page[produto]["Price"] + '</p></div><div class="action"><button onclick="adicionar(\''+produto+'\', ' + page[produto]["Price"] + ', ' + page[produto]["Quantidade"] + ')">Add to Cart</button></div></div></div></div>'
                    
                    html = html.replace('.', ',');
                    html = html.replace('imagem', '<img src="../assets/'+idProduto+'.jpg" alt="'+produto+'"></img>');
        
                    document.getElementById("section").innerHTML += html;   
                }
            } 
        }
    }
    
}

loadCart('loadCart');
loadPage('loadPage');
//pesquisar('pesquisar', 'Feijão')
loadCheckout('loadCheckout');

document.querySelector('.pesquisar-container input').addEventListener('input', function() {
    const button = document.querySelector('.pesquisar-container button');
    const border = document.querySelector('.efect-pesquisar');
    if (this.value.length > 0) {
        button.style.display = 'flex';
        border.style.padding = '0 5px 0 4px';
    } else {
        button.style.display = 'none';
        border.style.padding = '0 2px';
    }
});

document.querySelector('#button-pesquisar').addEventListener('click', function() {
    getText();
});

document.querySelector('#myInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        getText();
    }
});
