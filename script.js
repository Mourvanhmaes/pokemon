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
                <div class="card">
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
        <div class="card">
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
buscarPokemon();