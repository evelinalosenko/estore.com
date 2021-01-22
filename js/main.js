var cart = {}; // корзина


var type;


 
function init(d) {
    
    //вычитуем файл goods.json
    //$.getJSON("goods.json", goodsOut);
    
    type = d.getAttribute("data-id");
    if(type == 0){
        type = '';
    }
    $.post(
        "admin/core.php",
        {
             "action" : "loadGoods",
             "type" : type
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
         out += '<a class="productView" href="productView.html#'+[key]+'"><img src="images/'+data[key].img+'" alt=""></a>';
         out +='<p class="name">'+data[key].name+'</p>';
         out +='<div class="cost">'+data[key].cost+' EUR</div>'; 
         out +='<button class="add-to-cart" data-id="'+[key]+'">ADD to basket</button>';
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

    /*var out = "";
    for (var key in cart) {
        
        out +=  key + '==' + cart[key] + '<br>'; // pokazivaet summu kashdevo tovara odelno
    }
    $('.mini-cart').html(out);*/
    var sum = 0;
    for(var key of Object.values(cart)) { // summiruet vse dobavlenie tovari
        sum += key;
    }
     $('.mini-cart').html('CART' + ' (' + sum + ')');

    
}

function loadCart() {
    //проверяю есть ли в localStorage запись cart
    if (localStorage.getItem('cart')) {
        // если есть - расширфровываю и записываю в переменную cart
        cart = JSON.parse(localStorage.getItem('cart'));
        showMiniCart();
    }
}

/*window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;

  // 20 is an arbitrary number here, just to make you think if you need the prevScrollpos variable:
  if (currentScrollPos > 20) {
    // I am using 'display' instead of 'top':
    document.getElementById("cursor").style.display = "none";
  } else {
    document.getElementById("cursor").style.display = "initial";
  }
}*/

$(document).ready(function () {
    init();
    loadCart();
    
    
});



