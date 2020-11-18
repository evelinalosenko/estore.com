 var cart = {}; // корзина

function init() {
    //вычитуем файл goods.json
    //$.getJSON("goods.json", goodsOut);
    $.post(
        "admin/core.php",
        {
             "action" : "loadGoods"
        },
        goodsOut
    );
}

function goodsOut(data) {
    // вывод на страницу
    data = JSON.parse(data);
    console.log(data);
    var out='';
    for (var key in data) {
         out +='<div class="cart">';
         out +='<p class="name">'+data[key].name+'</p>';
         out += '<a class="productView" href="productView.html#'+[key]+'"><img src="images/'+data[key].img+'" alt=""></a>';
         out +='<div class="cost">'+data[key].cost+'</div>';
         out +='<a href="productView.html#'+[key]+'">View</a>';
         out +='<br>'; 
         out +='<button class="add-to-cart" data-id="'+[key]+'">Купить</button>';
         out +='</div>';
        
        
    }
    $('.goods-out').html(out);
    $('.add-to-cart').on('click', addToCart);
}

function addToCart() {
    //добавляем товар в корзину
    var id = $(this).attr('data-id');

    if (cart[id] == undefined) {
        cart[id] = 1; //если в корзине нет товара - делаем равным 1
    }
    else {
        cart[id]++; //если такой товар есть - увеличиваю на единицу
    }
    
    showMiniCart();
    saveCart();
}

function saveCart() {
    //сохраняю корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart)); //корзину в строку
}

function showMiniCart() {
    //показываю мини корзину
    /*var sum  = 0;
    for (var key of Object.values(cart)) {
        alert(key);
        sum +=  key + cart[key] + '<br>';
    }*/
    var out = "";
    for (var key in cart) {
        
        out +=  key + '==' + cart[key] + '<br>';
        //console.log(key.name);
    }
    $('.mini-cart').html(out);
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

$(document).ready(function () {
    init();
    loadCart();
});