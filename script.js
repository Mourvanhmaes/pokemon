let n = 1;
let n_pag = 1;
let elemento = null;
let ultimo_id = 0;
const pokemon = document.getElementById("pokemon");

async function buscarPokemon(){
    limpar();
    let pokemonPrintados = 0;
    n = ((n_pag - 1) * 20) + 1;
    while(pokemonPrintados < 20){
        let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
        let dados = await resposta.json();
        let nome = dados.name;
        let id = dados.id;
        let tipos = dados.types.map(t => t.type.name);
        let imagem = dados.sprites.front_default;
        if(tipos.includes(elemento) || elemento == "nada" || elemento == null){
            pokemon.innerHTML += `
                <div class="card" onclick="abrir_pokemon(${id})">
                    <img src="${imagem}" alt="${nome}">
                    <h6>#${id}</h6>
                    <h3>${nome.charAt(0).toUpperCase() + nome.slice(1)}</h3>
                    <div class="tipo">
                        ${tipos.map(t => `<h5>${t}</h5>`).join('')}
                    </div>
                </div>
            `;
            pokemonPrintados++;
        }
        n++;
    }
    ultimo_id = n;
}
function seta_menos(){
    if(n_pag <= 1){
        alert("Já esta na primeira pagina");
        return;
    }
    else{
        n -= 42;
        if(n < 1){
            n = 1;
        }
        n_pag -= 1;
        limpar();
        up_pag();
        buscarPokemon();
    }
}
function seta_mais(){
    n_pag += 1;
    limpar();
    up_pag();
    buscarPokemon();
}
function up_pag(){
    let id_pag = document.getElementById("pagina");
    id_pag.innerHTML = `${n_pag} de 52`;
}
function filtrar(){
    elemento = document.getElementById("tipos").value;
    n_pag = 1;
    n = 1;
    let pokemon = document.getElementById("pokemon");
    pokemon.innerHTML = "";
    up_pag();
    buscarPokemon();
}
async function buscar(){
    limpar();
    let id_pag = document.getElementById("pagina");
    let digitado = document.getElementById("pesquisa").value;
    if(digitado == ""){
        buscarPokemon();
    }
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${digitado}`);
    if(!resposta.ok){
        pokemon.innerHTML += "Erro, Pokemon não encontrado";
    }
    id_pag.innerHTML = `${n_pag} de 1`;
    let dados = await resposta.json();
    let nome = dados.name;
    let id = dados.id;
    let tipos = dados.types.map(t => t.type.name);
    let imagem = dados.sprites.front_default;
    pokemon.innerHTML += `
        <div class="card" onclick="abrir_pokemon(${id})">
            <img src="${imagem}" alt="${nome}">
            <h6>#${id}</h6>
            <h3>${nome.charAt(0).toUpperCase() + nome.slice(1)}</h3>
            <div class="tipo">
                ${tipos.map(t => `<h5>${t}</h5>`).join('')}
            </div>
        </div>
    `;
}
function limpar(){
    pokemon.innerHTML = "";
}
document.getElementById("pesquisa").addEventListener("keydown", function(m_enter) {
    if (m_enter.key === "Enter") {
      buscar();
}
});

async function abrir_pokemon(id){
    let resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let dados = await resposta.json();
    let nome = dados.name;
    let tipos = dados.types.map(t => t.type.name);
    let imagem = dados.sprites.front_default;
    let resposta2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    let altura = dados.height / 10;
    let peso = dados.weight / 10;
    let habilidades = dados.abilities.map(h => h.ability.name);
    let dados2 = await resposta2.json();
    let movimentos = dados.moves.map(m => m.move.name);

    let descricao = dados2.flavor_text_entries.find(
        entry => entry.language.name === "en"
    ).flavor_text;
    
    let poke = {
        id,
        nome,
        tipos,
        imagem,
        altura,
        peso,
        habilidades,
        movimentos,
        descricao
    };
    localStorage.setItem("pokemon", JSON.stringify(poke));

    // Redireciona
     window.location.href = "pokemon.html";
    // let poke = document.getElementById("pag_poke");
    // poke.innerHTML += `
    //     <div class="texto">
    //         <div class="poke_nome">
    //             <h1>${nome}<span>(#${id})</span></h1>
    //             ${tipos.map(t => `<h3>${t}</h3>`).join('')}
    //         </div>
    //         <div class="poke_img">
    //             <img src="${imagem}" alt="${nome}">
    //             <div class="dados">
    //                 <p class="descricao">${descricao}</p>
    //                 <div class="info">
    //                     <h3>Altura: <span>${altura} m</span></h3>
    //                     <h3>Peso: <span>${peso} kg</span></h3>
    //                     <h3>Habilidade: <span>${habilidades}</span></h3>    
    //                 </div>
    //                 <div class="moves">
    //                     <h3>Movimentos:${movimentos.map(m => `<span>${m}</span>`).join('')}</h3>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // `;
}

buscarPokemon();
