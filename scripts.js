/* 
Lógica de Programacao
    - Falar a lingua do computador
Algoritmo
    - Receita de bolo. Os passos na sequencia certa

JavaScript
    - Variáveis - pedacinho na memória do computador
        que voce pode guardar o que voce quiser

    - Funcoes
        pedacinho de código que, só executa quando
        eu chamo
        
    - Como se comunicar com o HTML
        Manipular a DOM

    console.log() mostra o que eu quiser na tela

    [x] Saber quando o botão foi clicado
    [ ] Pegar o texto que o usário digitou
    [ ] Mando para o servidor traduzir
    [ ] Receber a resposta do servidor (traducao)  
    [ ] Colocar o texto na tela   

    // JavaScript - scripts
    // HTML - document
    querySelector - procurar alguem no HTML
    value = valor - o texto que tem nele

   padrao =  https://api.mymemory.translated.net/get?q=
   traduzir =  Hello World!
   idioma = &langpair=pt-BR|en

   fetch / ferramenta do javascript para entrar em contato com um servidor
   await (Espere) - async (async & await)
   json (formato mais amigavel)
*/

// ELEMENTOS
// ELEMENTOS
// =======================
// ELEMENTOS
// =======================
const inputTexto = document.querySelector(".input-texto")
const textoTraduzido = document.querySelector(".traducao")
const seletorIdioma = document.querySelector(".idioma")
const botaoMic = document.querySelector(".btn-mic-gravando")
const botaoTraduzir = document.querySelector(".btn-traduzir")

// =======================
// TRADUÇÃO
// =======================
async function traduzir(origem = "pt-BR", destino = seletorIdioma.value) {

    if (inputTexto.value.trim() === "") {
        textoTraduzido.innerText = "Digite ou fale algo 🙂"
        return
    }

    textoTraduzido.innerText = "Traduzindo..."

    const endereco =
        "https://api.mymemory.translated.net/get?q="
        + encodeURIComponent(inputTexto.value)
        + "&langpair=" + origem + "|" + destino

    try {
        const resposta = await fetch(endereco)
        const dados = await resposta.json()
        textoTraduzido.innerText = dados.responseData.translatedText
    } catch {
        textoTraduzido.innerText = "Erro ao traduzir ❌"
    }
}

// =======================
// TRADUÇÃO AUTOMÁTICA AO DIGITAR
// =======================
inputTexto.addEventListener("input", () => {
    traduzir("pt-BR", seletorIdioma.value)
})

// =======================
// BOTÃO TRADUZIR
// =======================
botaoTraduzir.addEventListener("click", () => {
    traduzir("pt-BR", seletorIdioma.value)
})

// =======================
// MICROFONE
// =======================
function gravarVoz() {

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
        textoTraduzido.innerText = "🎤 Navegador não suporta microfone 😢"
        return
    }

    const reconhecimento = new SpeechRecognition()
    reconhecimento.lang = "pt-BR"
    reconhecimento.continuous = false
    reconhecimento.interimResults = false

    reconhecimento.onstart = () => {
        botaoMic.classList.add("gravando")
        textoTraduzido.classList.add("ouvindo")
        textoTraduzido.innerText = "🎤 Ouvindo..."
    }

    reconhecimento.onresult = (evento) => {
        const textoFalado = evento.results[0][0].transcript
        inputTexto.value = textoFalado

        // se parecer inglês → traduz pra PT
        if (/^[a-zA-Z\s.,!?]+$/.test(textoFalado)) {
            traduzir("en", "pt-BR")
        } else {
            traduzir("pt-BR", seletorIdioma.value)
        }
    }

    reconhecimento.onerror = () => {
        textoTraduzido.innerText = "Erro ao usar o microfone ❌"
    }

    reconhecimento.onend = () => {
        botaoMic.classList.remove("gravando")
        textoTraduzido.classList.remove("ouvindo")
    }

    reconhecimento.start()
}

// =======================
// EVENTO DO MICROFONE
// =======================
botaoMic.addEventListener("click", gravarVoz)




// clicou no botao -> chama a funcao -> monto o enderco ->
// chamo o servidor -> peco esperar -> responde 