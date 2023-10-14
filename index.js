

// Variáveis e seleção de elementos // Variables and element selection //
const apiKey = "2a9c8d67d9f2e5c376c2e58562654d30";
const apiCountryUrl = "https:www.countryflagicons.com/FLAT/32/.png";
const datas = document.querySelector('.datas')

const cityInput = document.getElementById('city-input')
const searchInput = document.getElementById('search')


async function getCityData() {

    const result = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityInput.value}&limit=5&appid=${apiKey}`)

    console.log("CIDADE")
    console.log(result);

    let lat = result.data[0].lat
    let lon = result.data[0].lon
    let city = result.data[0].name
    let country = result.data[0].country

    await getAirData(lat,lon,country)

}

async function getAirData(lat,long,country){
    console.log("AR")
    const result = await axios.get(`http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${long}&appid=${apiKey}`)

    console.log(result)
    let date = new Date(result.data.list[result.data.list.length - 1].dt*1000)
    console.log(date.toLocaleDateString("pt-BR"));

    
    
    
    await createDatas(result.data.list[result.data.list.length - 1].components,country,result.data.list[result.data.list.length - 1].main)
    datas.classList.remove("hide")
}

function createDatas(components,country,aqi){
    const cityB = document.querySelector('.cityB')
    const item1 = document.getElementById('item1')
    const item2 = document.getElementById('item2')
    const item3 = document.getElementById('item3')
    const item4 = document.getElementById('item4')
    const item5 = document.getElementById('item5')
    const item6 = document.getElementById('item6')
    const item7 = document.getElementById('item7')
    const item8 = document.getElementById('item8')
    const item9 = document.getElementById('item9')
    const indice = document.getElementById('indice')
    const square = document.querySelector('.square')
    const descriIndice = document.getElementById('descriIndice')
    const pais = document.getElementById('pais')

    
    item1.innerHTML = `Co  = ${components.co}`
    item2.innerHTML = `No  = ${components.no}`
    item3.innerHTML = `No₂ = ${components.no2}`
    item4.innerHTML = `O₃  = ${components.o3}`
    item5.innerHTML = `Co  = ${components.so2}`
    item6.innerHTML = `So₂  = ${components.so2}`
    item7.innerHTML = `Pm₂_₅  = ${components.pm2_5}`
    item8.innerHTML = `Pm₁₀  = ${components.pm10}`
    item9.innerHTML = `Nh₃  = ${components.nh3}`
    cityB.innerHTML = cityInput.value

    pais.src = `http://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`

    indice.innerHTML = "Índice - "+aqi.aqi

    if(aqi.aqi == 1){
        descriIndice.innerHTML = "Poluição Muito Baixa - O ar está ótimo, não a nado com o que se preocupar!"
        square.classList.add("greenyellow")
    }
    if(aqi.aqi == 2){
        descriIndice.innerHTML = "Poluição Baixa - O ar está bom, mas ainda da pra melhorar!"
        square.classList.add("green")
    }
    if(aqi.aqi == 3){
        descriIndice.innerHTML = "Poluição Baixa - O ar está mediano, podemos melhorar mais devemos começar a nos preocupar"
        square.classList.add("yellow")
    }
    if(aqi.aqi == 4){
        descriIndice.innerHTML = "Poluição Alto - O ar está ruim, está na hora de mudarmos!"
        square.classList.add("lightcoral")
    }
    if(aqi.aqi == 5){
        descriIndice.innerHTML = "Poluição Muito Alto - O ar está péssimo, já passou da hora de mudanças drasticas"
        square.classList.add("red")
    }
    
    
}

searchInput.addEventListener('click', async() => {

    const loader = document.getElementById('loader')

    loader.style.display = 'block';
    await getCityData()
    loader.style.display = 'none';
    cityInput.value = ''
})

