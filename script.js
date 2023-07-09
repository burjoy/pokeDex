
const image = document.getElementById("poke_image");
const search_button = document.getElementById("search_button");
const search_bar = document.getElementById("search_box");
let url = '';
let json_old = {};
let skill_bar = document.querySelector("#sidebar_2");
let item_bar = document.querySelector("#sidebar_1");
search_button.addEventListener("click", () => {
    url = search_bar.value;
    console.log(url);
    let randos = Math.floor(Math.random()*10);
    console.log(randos);

    if(randos < 2){
        callPokemon().reject;
        alert("Gagal Loading");
    } 
    else{
        callPokemon()
        .then((json) => {
            json_old = json;
            console.log(json_old);
            image.setAttribute("src", json_old.sprites.front_default);
            skill_bar.innerHTML = "";
            item_bar.innerHTML = "";
            createSkill();
            createItem();})
            
        .catch(() => {
            alert("Terjadi kesalahan");
        });
    }
});

async function callPokemon(){
    const pokemon = `https://pokeapi.co/api/v2/pokemon/${url}`;
    const name = await fetch(pokemon);
    const json = await name.json();
    return json;
}

function createSkill(){
    let abilities =  json_old.abilities;
    const title = document.createElement('p');
    title.innerText = "Skills";
    title.classList.add("text-center");
    skill_bar.append(title);
    for(let i = 0;i < abilities.length;i++){
        const p = document.createElement('p');
        p.innerText = abilities[i].ability.name;
        skill_bar.append(p);
        console.log(abilities[i].ability.name);
    }
}

function createItem(){
    let items = json_old.held_items;
    const title = document.createElement('p');
    title.innerText = "Dropped Items";
    title.classList.add("text-center");
    item_bar.append(title)
    for(let j = 0;j < items.length;j++){
        const p = document.createElement('p');
        p.innerText = items[j].item.name;
        item_bar.append(p);
        console.log(items[j].item.name);
    }
}