function price(products){
    var aux = JSON.parse(products);
    var price = 0.0;
    var subtotal = 0.0;

    for(i in aux){
        price += parseFloat(aux[i].price);
    }

    subtotal = parseFloat(price) + (parseFloat(price) * 0.7);
    document.write(subtotal);
}

function info(){
    var total = 0;

    total += document.getElementsByTagName("p").length;
    total += document.getElementsByTagName("ul").length;
    total += document.getElementsByTagName("a").length;
    total += document.getElementsByTagName("link").length;

    document.write(total);
}