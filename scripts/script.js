window.onload = function() {
    iniciar();
    setInterval(principal, 1000 / 30)
};

function iniciar() {
    folhaDesenho = document.getElementById("folha");
    areaDesenho = folhaDesenho.getContext("2d");

    larguraCampo = 600;
    alturaCampo = 500;
    espessuraRede = 5;

    diametroBola = 10;

    espessuraRaquete = 11;
    alturaRaquete = 100;

    efeitoRaquete = 0.3
    velocidadeJogador2 = 5;

    posicaoJogador1 = posicaoJogador2 = 40;
    posicaoBolaX = posicaoBolaY = 10;
    velocidadeBolaPosicaoX = velocidadeBolaPosicaoY = 5;
    pontuacaodeJogador1 = pontuacaodeJogador2 = 0;

    folhaDesenho.addEventListener("mousemove", function(e) {
        posicaoJogador1 = e.clientY - alturaRaquete / 2;
    });
}

function principal() {
    desenhar();
    calcular();
}

function desenhar() {
    
    areaDesenho.fillStyle = "#286047"; // cor verde

    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

    areaDesenho.fillStyle = "#FFFFFF";

    areaDesenho.fillRect(larguraCampo / 2 - espessuraRede / 2, 0, espessuraRede, alturaCampo);
    // Desenha a bola
    areaDesenho.fillRect(posicaoBolaX - diametroBola / 2, posicaoBolaY - diametroBola / 2, diametroBola, diametroBola);

    // Rauquetes
    areaDesenho.fillRect(0, posicaoJogador1, espessuraRaquete, alturaRaquete);
    areaDesenho.fillRect(larguraCampo - espessuraRaquete, posicaoJogador2, espessuraRaquete, alturaRaquete);
    
    // Escrevera a pontuacao dos jogadores 
    areaDesenho.fillText("Humano - " + pontuacaodeJogador1 + " pontos", 100, 100);
    areaDesenho.fillText("Computador - " + pontuacaodeJogador2 + " pontos", larguraCampo - 200, 100);
}

function calcular() {
    
    posicaoBolaX = posicaoBolaX + velocidadeBolaPosicaoX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaPosicaoY;

    // verifica lateral superior
    if(posicaoBolaY < 0 && velocidadeBolaPosicaoY < 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    };

    // verifica lateral inferior
    if(posicaoBolaY > alturaCampo && velocidadeBolaPosicaoY > 0) {
        velocidadeBolaPosicaoY = -velocidadeBolaPosicaoY;
    };

    // verifica se o jogador 2 fez um ponto
    if (posicaoBolaX < 0) {
        if (posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete) {
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
        } else {
            pontuacaodeJogador2 = pontuacaodeJogador2 + 1;

            //bola centro
            continuar();
        }
    };

    // verifica se o jogador 1 fez um ponto
    if (posicaoBolaX > larguraCampo) {
        if (posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete) {
            velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;

            var diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
            velocidadeBolaPosicaoY = diferencaY * efeitoRaquete;
        } else {
            pontuacaodeJogador1 = pontuacaodeJogador1 + 1;
            
            // bola centro
            continuar();        
        }
    }

    // atualiza a posicaoJogador2
    if (posicaoJogador2 + alturaRaquete / 2 < posicaoBolaY) {
        posicaoJogador2 = posicaoJogador2 + velocidadeJogador2;
    } else {
        posicaoJogador2 = posicaoJogador2 - velocidadeJogador2;
    }
}

function continuar(){
    posicaoBolaX = larguraCampo / 2;
    posicaoBolaY = alturaCampo / 2;
    velocidadeBolaPosicaoX = -velocidadeBolaPosicaoX;
    velocidadeBolaPosicaoY = 3
}
