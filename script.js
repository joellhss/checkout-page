let countriesHTML = document.getElementById("countries")
let input = document.getElementById("country")
let expand = document.getElementsByClassName("expand")[0]

let countries = ["Brazil", "United States", "Switzerland", "United Arab Emirates", "Argentina", "Bolivia", "Denmark"]

let verificador = false
let total = 0

function fechaLista() {
    countriesHTML.innerHTML = ""
    countriesHTML.style.display = "none"
    verificador = false
}

function exibeLista(e) {
    clearTimeout(fechaLista, 200)
    input.focus()
    countriesHTML.style.display = "block"
    let names = ""
    let lista = countries.sort()
    lista.forEach(element => {
       names += `<p>${element}</p>`
    });
    countriesHTML.innerHTML = names

    function selecionaNome(e) {
        fechaLista()
        input.value = e.target.innerText
        countriesHTML.removeEventListener("click", selecionaNome)
    }

    countriesHTML.addEventListener("click", selecionaNome)
    verificador = true
}

input.addEventListener("focus", e => {
    exibeLista(e)
})

input.addEventListener("blur", e => {
    if (verificador === true) {
        setTimeout(fechaLista, 200)
    }
})

clearTimeout(fechaLista, 200)

input.addEventListener("keypress", e => {
    let name = e.target.value
    let lista = ""

    countries.forEach(element => {
        if(element.toUpperCase().startsWith(name.toUpperCase())) {
            lista += `<p>${element}</p>`
        }
    })
        countriesHTML.style.display = "block"
        countriesHTML.innerHTML = lista
})



let items = document.getElementById("items")
let prices = [
    {   
        name: "backbag",
        price: 94.99,
        promo: 54.99
    },
    {
        name: "levishoes",
        price: 124.99,
        promo: 74.99
    }
]

function alteraQuantidade(e) {
    let button = e.path[0].id
    let number = parseInt(e.path[1].children[1].innerText)
    let valuePrice = e.path[2].children[1].children[1].children[0]
    let valuePromo = e.path[2].children[1].children[0].children[0]
    let newPrice = 0
    let newPromo = 0
    let item = e.path[3].id

    if (button === "more") {
        number++
        e.path[1].children[1].innerHTML = number
        prices.forEach(price => {
            if (price.name === item) {
                newPrice = parseFloat(valuePrice.innerText) + price.price
                newPromo = parseFloat(valuePromo.innerText) + price.promo

                valuePrice.innerText = newPrice.toFixed(2)
                valuePromo.innerText = newPromo.toFixed(2)

                calculaTotal(price.promo, "mais")
            }
        })

    } else if (button === "less" && number >= 1) {
        number--
        e.path[1].children[1].innerHTML = number

        prices.forEach(price => {
            if (price.name === item) {
                newPrice = parseFloat(valuePrice.innerText) - price.price
                newPromo = parseFloat(valuePromo.innerText) - price.promo

                valuePrice.innerText = newPrice.toFixed(2)
                valuePromo.innerText = newPromo.toFixed(2)

                calculaTotal(price.promo, "menos")
            }
        })
    }

    
}

items.addEventListener("click", alteraQuantidade)


function calculaTotal(valor, operacao) {
    let totalHTML = document.getElementById("totalValue")
    total = parseFloat(totalHTML.innerText)

    if (operacao === "menos") {
        total -= valor
    } else if (operacao === "mais") {
        total += valor
    }

    totalHTML.innerText=total.toFixed(2)

}

