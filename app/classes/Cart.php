<?php

namespace app\classes;


class Cart{

    public function getCart(): array{
        // Passo 1: Ler o conteúdo do arquivo JSON
        $file = __DIR__ .'/dados.json';
        $jsonData = file_get_contents($file);

        if ($jsonData === false) {
            // Tratar o erro ao ler o arquivo
            echo "Erro ao ler o arquivo JSON.";
            exit;
        }

        // Passo 2: Decodificar o JSON em um array associativo
        $data = json_decode($jsonData, true);

        if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
            // Tratar o erro de decodificação
            echo "Erro ao decodificar o JSON: " . json_last_error_msg();
            exit;
        }

        // Exibir os dados lidos
        return $data;
    }
    public function setCart($data){

        // Passo 2: Converter os dados para JSON
        $jsonData = json_encode($data, JSON_PRETTY_PRINT);

        // Verificar se a conversão foi bem-sucedida
        if ($jsonData === false) {
            // Tratar o erro de conversão
            echo "Erro ao converter os dados para JSON: " . json_last_error_msg();
            exit;
        }

        // Passo 3: Escrever os dados JSON no arquivo
        $file = __DIR__ .'/dados.json';

        // Abre o arquivo para escrita (cria o arquivo se ele não existir)
        $fileHandle = fopen($file, 'w');

        if ($fileHandle === false) {
            // Tratar o erro ao abrir o arquivo
            echo "Erro ao abrir o arquivo para escrita.";
            exit;
        }

        // Escrever os dados no arquivo
        $bytesWritten = fwrite($fileHandle, $jsonData);

        if ($bytesWritten === false) {
            // Tratar o erro ao escrever no arquivo
            echo "Erro ao escrever os dados no arquivo.";
            fclose($fileHandle);
            exit;
        }

        // Fechar o arquivo
        fclose($fileHandle);

    }
}

