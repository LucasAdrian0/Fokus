const html = document.querySelector('html')
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const banner = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const statPauseBt = document.querySelector('#start-pause')

const musicaFocoInput = document.querySelector('#alternar-musica')//se ID utiliza #
const musica = new Audio('sons/luna-rise-part-one.mp3') //source da musica
const AudioTempoFinalizado = new Audio('/sons/beep.mp3')
const Audioplay = new Audio('/sons/play.wav')
const Audiopause = new Audio('/sons/pause.mp3')

musica.loop = true

let tempoDecorridoEmSegundo = 5 //variavel para o temporizador
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
    alterarContexto('foco')
    focoBt.classList.add('active')//add css de seleção de botão
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')//add css de seleção de botão
})
longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')//add css de seleção de botão


})
function alterarContexto(contexto) {
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
        zerar()
        alert('Tempo Finalizado!')
        return
    }
    tempoDecorridoEmSegundo -= 1
    console.log('Temporizador' + tempoDecorridoEmSegundo)   
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
}
function zerar () {//zerar temporizador ao chegar em tempo zero
    clearInterval(intervaloId)
    intervaloId = null
}
