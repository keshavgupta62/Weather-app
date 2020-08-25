var inputValue = document.querySelector('.inputValue');
var cityName = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var minMax = document.querySelector('.minMax');
var wind = document.querySelector('.wind');
var iconId = document.querySelector('.iconId');

function getData() {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=056da36d1478645a30abbc1ce79254c0'
    fetch(url).then((response) => {
        return response.json();
    })
    .then((data) => {
        cityName.innerHTML = `${data.name}`+', '+`${data.sys.country}`;
        iconId.innerHTML  = `<img src="icons/${data.weather[0].icon}.png" />`;
        desc.innerHTML = 'Weather : '+`${data.weather[0].description}`;
        var temperature = `${data.main.temp}`-273;
        var min = `${data.main.temp_min}`-273;
        var max = `${data.main.temp_max}`-273;
        temp.innerHTML = 'Temperature : '+Math.floor(temperature)+' °C';
        minMax.innerHTML = 'Min/Max Temp : '+Math.floor(min)+' °C'+' / '+Math.floor(max)+'°C';
        wind.innerHTML = 'Wind speed : '+`${data.wind.speed}`+' knot';

    })
    .catch((error) => {
        temp.innerHTML = 'Error: City not found';
        cityName.innerHTML = '';
        iconId.innerHTML  = `<img src="icons/unknown.png" />`;
        desc.innerHTML = '';
        minMax.innerHTML = '';
        wind.innerHTML = '';
    })
}

function doSomeMagic(fn, d) {
    let timer;
    return function() {
        let context = this;
        clearTimeout(timer);
        timer = setTimeout(()=> {
            fn.apply(context, arguments)
        }, d);
    }
}

const betterFunction = doSomeMagic(getData, 300);
