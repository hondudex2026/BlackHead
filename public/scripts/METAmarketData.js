async function getData() {
    try {
        const stock = `META`; 
        const url = `https://data.alpaca.markets/v2/stocks/snapshots?symbols=${stock}&feed=iex`;
        
        const response = await fetch(url, {
            headers: {
                'APCA-API-KEY-ID': 'PKXF3GR4W3HEPEKZNOLIRBQFLQ',     
                'APCA-API-SECRET-KEY': 'EVEbT3Tw3xDzhVzFT2mUD2vN67rkPJU8NiN9hza2xFvo'  
            }
        });
        
        const data = await response.json();
        
        const stockData = data[stock];
 
        const precioActual = stockData.latestTrade.p;      // Market price
        const cierreAnterior = stockData.prevDailyBar.c;   // Cierre

        const cambio24hRaw = ((precioActual - cierreAnterior) / cierreAnterior) * 100;
        const cambio24h = parseFloat(cambio24hRaw.toFixed(2));


        const texto = document.getElementById("METAChange");
        texto.textContent = `${cambio24h >= 0 ? '+' : ''}${cambio24h}%`;

        const div = document.getElementById("div9");

        if (cambio24h >= 3) {
            div.style.backgroundColor = "#2AF527"; // Verde 
        } else if (cambio24h >= 2) {
            div.style.backgroundColor = "#029400"; // Verde oscuro
        } else if (cambio24h >= 1) {
            div.style.backgroundColor = "#2A4729"; // Verde moco
        } else if (cambio24h > -1) {
            div.style.backgroundColor = "#232b23"; // Gris 
        } else if (cambio24h > -2) {
            div.style.backgroundColor = "#391212"; // Vino
        } else if (cambio24h > -3) {
            div.style.backgroundColor = "#800d0d"; // Rojo oscuro
        } else {
            div.style.backgroundColor = "#ff0000"; // Rojo
        }

    } catch (err) {
        console.log(err);
    }
}

getData();
setInterval(getData, 5000);