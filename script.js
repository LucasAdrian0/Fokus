const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const statPauseBt = document.querySelector('#start-pause')
const musicaFocoInput = document.querySelector('#alternar-musica')//se ID utiliza #
const iniciarOuPausarBt = document.querySelector('#start-pause span')
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon')

const tempoNaTela = document.querySelector('#timer')

const musica = new Audio('sons/luna-rise-part-one.mp3') //source da musica
const AudioTempoFinalizado = new Audio('/sons/beep.mp3')
const Audioplay = new Audio('/sons/play.wav')
const Audiopause = new Audio('/sons/pause.mp3')

const imagemPausa = new Image()
imagemPausa.src = 'imagens/pause.png'
const imagemPlay = new Image()
imagemPlay.src = 'imagens/play_arrow.png'

musica.loop = true

let tempoDecorridoEmSegundo = 1500 //variavel para o temporizador
let intervaloId = null

musicaFocoInput.addEventListener('change', () => {//evento para tocar a musica
    if (musica.paused) {
        musica.play()
        console.log('musica iniciada')
        
    } else {
        musica.pause()
        console.log('musica pausada')
         
    }
})
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 1500
    alterarContexto('foco')
    focoBt.classList.add('active')//add css de seleção de botão
})
curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')//add css de seleção de botão
})
longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundo = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')//add css de seleção de botão


})

function alterarContexto(contexto) {
    mostrartempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active')//removendo css de seleção do botão 
    })
    html.setAttribute('data-contexto', contexto)// altera a cor de fundo css
    banner.setAttribute('src', `/imagens/${contexto}.png`)//alteração da imagem
    switch (contexto) {//alterações de textos conforme os casos abaixo
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;

        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundo <=0) {
        AudioTempoFinalizado.play()
        alert('Tempo Finalizado!')
        zerar()
        return
    }
    tempoDecorridoEmSegundo -= 1
    mostrartempo()   
}

statPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar() {//iniciar temporizador contagem regressiva a cada segundo
    if (intervaloId) {
        Audiopause.play()
        console.log('audio play')

        zerar()
        return
    }
    Audioplay.play()
    intervaloId = setInterval(contagemRegressiva,1000) 
    iniciarOuPausarBt.textContent = 'Pausar'
    iniciarOuPausarBtIcone.setAttribute('src', 'imagens/pause.png')
}

function zerar () {//zerar temporizador ao chegar em tempo zero
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = 'Iniciar'
iniciarOuPausarBtIcone.setAttribute('src', 'imagens/play_arrow.png')
    intervaloId = null    
}

function mostrartempo(){
    const tempo = new Date(tempoDecorridoEmSegundo * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'})    
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostrartempo()


//Lembrar de fazer o contador apareceder na tela
