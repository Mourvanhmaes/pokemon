let m_poke_id = 25;

async function m_busca_pokemon(n){
    let antes = n - 1;
    let prox = n + 1;
    if(antes < 1){
        antes = 1025;
    }
    if(prox > 1024){
        prox = 1;
    }
    let pokemon = document.querySelector(".m_pag_poke");;
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
    let dados = await resposta.json();
    let img = dados.sprites.other['official-artwork'].front_default;
    let tipos = dados.types.map(t => t.type.name);
    let resp_ante = await fetch(`https://pokeapi.co/api/v2/pokemon/${antes}`);
    let resp_prox = await fetch(`https://pokeapi.co/api/v2/pokemon/${prox}`);
    let dados_ante = await resp_ante.json();
    let dados_prox = await resp_prox.json();
    let img_ante = dados_ante.sprites.other['official-artwork'].front_default;
    let tipos_ante = dados_ante.types.map(t => t.type.name);
    let img_prox = dados_prox.sprites.other['official-artwork'].front_default
    let tipos_prox = dados_prox.types.map(t => t.type.name);
    pokemon.innerHTML = `
        <div class="m_poke_titulo">
            <h2>Pokémon</h2>
        </div>
        <div class="m_poke_pricipal">
            <img src="img/caret-left.svg" alt="seta esquerda" class="m_poke_setas" onclick="m_poke_antes()">
            <div class="m_poke_pokemon">
                <img src="img/master_ball.svg" alt="master_ball" class="m_poke_master">
                <div class="m_poke_pokemon_img">
                    <span></span>
                    <img src="${img}" alt="${dados.name}">
                </div>
                <div class="m_poke_dados">
                    <div class="m_poke_nome">
                        <h1>${dados.name}</h1>
                        <h2>#${dados.id}</h2>
                    </div>
                    <div class="m_poke_tipo">
                        ${tipos.map(t => `<h4 class="m_${t}">${t}</h4>`).join('')}
                    </div>
                    <p>Charizard, o Pokémon Chama, cospe fogo tão quente que pode derreter rochas.</p>
                    <div class="m_poke_medidas">
                        <h4 class="m_poke_medidas_wt"><span>WT   </span>${dados.weight / 10}KG</h4>
                        <h4 class="m_poke_medidas_ht"><span>HT</span>${dados.height / 10}m</h4>
                    </div>
                    <div class="m_poke_fraq">
                        <h3>Franquezas</h3>
                        <div class="m_poke_tipo">
                            <h4>fire</h4>
                            <h4>flying</h4>
                            <h4>flying</h4>
                        </div>
                    </div>
                </div>
                <div class="m_poke_habilit">
                    <h3>Habilidades</h3>
                    <p>Blaze</p>
                    <p>Solar-Power</p>
                </div>
                <div class="m_poke_estrelas">
                    <img src="img/estrela_apagada.svg" alt="estrela_apagada">
                </div>
            </div>
            <img src="img/caret-right.svg" alt="seta direita" class="m_poke_setas" onclick="m_poke_prox()">
        </div>
        <div class="m_poke_extras">
            <div class="m_poke_sequencia">
                <div class="m_poke_seq_titulo">
                    <h1>Sequencia</h1>
                    <div class="m_poke_extras_setas">
                        <img src="img/caret-left.svg" alt="esquerda">
                        <img src="img/caret-right.svg" alt="direita">
                    </div>
                </div>
                <div class="m_poke_cards">
                    <div class="m_poke_card m_${tipos_ante[0]}">
                        <img src="${img_ante}" alt="${dados_ante.name}">
                        <div class="m_poke_card_des">
                            <h3>${dados_ante.name}</h3>
                            <h4>#${dados_ante.id}</h4>
                        </div>
                    </div>
                    <div class="m_poke_card m_${tipos[0]}">
                        <img src="${img}" alt="${dados.name}">
                        <div class="m_poke_card_des">
                            <h3>${dados.name}</h3>
                            <h4>#${dados.id}</h4>
                        </div>
                    </div>
                    <div class="m_poke_card m_${tipos_prox[0]}">
                        <img src="${img_prox}" alt="${dados_prox.name}">
                        <div class="m_poke_card_des">
                            <h3>${dados_prox.name}</h3>
                            <h4>#${dados_prox.id}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="m_poke_evo">
                <div class="m_poke_evo_titulo">
                    <h1>Evoluções Registradas</h1>
                    <br>
                    <p>Da sua forma inicial até seu auge, cada evolução conta uma nova história</p>
                </div>
                <div class="m_poke_evo_quadrado">
                    <div class="m_poke_evo_card">
                        <img src="img/charizard.svg" alt="charizard">
                        <div class="m_poke_evo_card_nome">
                            <h5>charizard #006</h5>
                             <div class="m_poke_tipo">
                                <h4>fire</h4>
                            </div>
                        </div>
                    </div>
                    <img src="img/evolu.svg" alt="evolucao">
                    <div class="m_poke_evo_card">
                        <img src="img/charizard.svg" alt="charizard">
                        <div class="m_poke_evo_card_nome">
                            <h5>charizard #006</h5>
                            <div class="m_poke_tipo">
                                <h4>fire</h4>
                            </div>
                        </div>
                    </div>
                    <img src="img/evolu.svg" alt="evolucao">
                    <div class="m_poke_evo_card">
                        <img src="img/charizard.svg" alt="charizard">
                        <div class="m_poke_evo_card_nome">
                            <h5>charizard #006</h5>
                             <div class="m_poke_tipo">
                                <h4>fire</h4>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    `;
    let poke_cor = document.querySelector(".m_poke_pokemon_img span");
    poke_cor.style.backgroundColor = `var(--${tipos[0]})`;
}
function m_poke_antes(){
    if(m_poke_id < 1){
        m_poke_id = 1025;
    }
    else{
        m_poke_id -= 1;
    }
    m_busca_pokemon(m_poke_id);
}
function m_poke_prox(){
    if(m_poke_id > 1024){
        m_poke_id = 1;
    }
    else{
        m_poke_id += 1;
    }
    m_busca_pokemon(m_poke_id);
}
m_busca_pokemon(m_poke_id);