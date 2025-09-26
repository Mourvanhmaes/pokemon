async function m_busca_pokemon(n){
    let pokemon = document.querySelector(".m_pag_poke");;
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
    let dados = await resposta.json();
    let img = dados.sprites.other['official-artwork'].front_default;
    let tipos = dados.types.map(t => t.type.name);
    pokemon.innerHTML = `
        <div class="m_poke_titulo">
            <h2>Pokémon</h2>
        </div>
        <div class="m_poke_pricipal">
            <img src="img/esquerda.svg" alt="seta esquerda" class="m_poke_setas">
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
            <img src="img/direita.svg" alt="seta direita" class="m_poke_setas">
        </div>
    `;
    let poke_cor = document.querySelector(".m_poke_pokemon_img span");
    poke_cor.style.backgroundColor = `var(--${tipos[0]})`;
}
m_busca_pokemon(1);