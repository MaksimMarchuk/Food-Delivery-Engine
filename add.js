var product = [
  {
    id: "001",
    name: "Лимонад класичний",
    category: "Напої",
    price: "65",
    accessibility: "Немає",
    rating: "4.5",
  },
  {
    id: "002",
    name: "Еспресо",
    category: "Напої",
    price: "45",
    accessibility: "В наявності",
    rating: " 4.8",
  },
  {
    id: "003",
    name: "Піца Маргарита",
    category: "Основні страви",
    price: "180",
    accessibility: "В наявності",
    rating: "4.9",
  },
  {
    id: "004",
    name: "Бургер з яловичиною",
    category: "Основні страви",
    price: "220",
    accessibility: "В наявності",
    rating: "4.7",
  },
  {
    id: "005",
    name: "Паста Карбонара",
    category: "Основні страви",
    price: "195",
    accessibility: "Немає",
    rating: " 4.6",
  },
  {
    id: "006",
    name: "Салат Цезар",
    category: "Закуски",
    price: "160",
    accessibility: "В наявності",
    rating: "4.8",
  },
  {
    id: "007",
    name: "Картопля фрі",
    category: "Закуски",
    price: "75",
    accessibility: "В наявності",
    rating: "4.3",
  },
];
var cart = []
let totalPrice = 0;
let promoResult = [];
let promoTotalprice = 0;

var promocode = [
  {
    name: "QWERTY",
    discount: 20 / 100,
  },
  {
    name: "CATOWL",
    discount: 50 / 100,
  },
  {
    name: "ADOLF",
    discount: 88 / 100,
  }
]



while (true) {
  var mainPromt = prompt(
    "1 - Переглянути меню \n 2 - Пошук страви за назвою \n 3 - Додати страву в кошик \n 4 - Переглянути кошик та чек \n 5 - Застосувати промокод \n 6 - Оформити замовлення \n 0 - Вийти",
  );

  if (mainPromt === "1") {
    const menu = product.map(({ name, price, rating }) => ({
      name,
      price,
      rating,
    }));

    const formattedText = menu
      .sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating))
      .map(
        (item) => `${item.name} — ${item.price} грн (Оцінка: ${item.rating})`,
      )
      .join("\n");

    alert(formattedText);
  }

  if (mainPromt === "2") {
    const searchprod = prompt("Яку страву бажаєте?");

    const productSearch = function (products, searchprod) {
      return products.filter(
        item => item.name.toLowerCase().includes(searchprod.toLowerCase())
      );
    };

    const searchResult = productSearch(product, searchprod);

    const formattedTextSearch = searchResult
      .map(
        (item) => `${item.name} — ${item.price} грн (Оцінка: ${item.rating})`,
      )
      .join("\n");

    if (searchResult.length > 0) {
      alert(formattedTextSearch);
    } else {
      alert("На жаль, такої страви немає");
    }
  }

  if (mainPromt === "3") {
    while (true) {
      var addElementToCart = prompt("Ведіть назву страви яку бажаєте додати до кошику:")

      if (addElementToCart === null) {
        break;
      }

      const cleanedInput = addElementToCart.trim();

      const foundProduct = product.find(({ name }) =>
        name.toLowerCase() === cleanedInput.toLowerCase()
      );

      if (foundProduct) {
        cart.push({
          name: foundProduct.name,
          price: foundProduct.price
        });

        alert(`Страва "${foundProduct.name}" за ціною ${foundProduct.price} грн додана до кошика!`);
      } else {
        alert("Помилка, такої страви не існує. Спробуйте ще раз.");
      }
    }
  }

  if (mainPromt === "4") {
    if (cart.length === 0) {
      alert("Ваш кошик порожній.");
    } else {
      const cartList = cart.map((item, index) => `${index + 1}. ${item.name} — ${item.price} грн`).join("\n");

      totalPrice = cart.reduce((sum, item) => {
        const priceAsNumber = parseFloat(item.price) || 0;
        return sum + priceAsNumber;
      }, 0);

      alert(`Ваше замовлення:\n\n${cartList}\n\nЗагальна сума: ${totalPrice} грн`);

    }
  }



  if (mainPromt === "5") {
    totalPrice = cart.reduce((sum, item) => {
      return sum + parseFloat(item.price);
    }, 0)

    var promoSearch = prompt("Введіть промокод: (Наприклад: QWERTY або CATOWL)")

    var promocodeSearch = function (promocode, promoSearch) {
      return promocode.filter(
        item =>
          item.name.toLowerCase() === promoSearch.toLowerCase()
      )
    };

    promoResult = promocodeSearch(promocode, promoSearch);

    if (promoResult.length > 0) {
      promoTotalprice =
      totalPrice * (1 - promoResult[0].discount)
      promoTotalprice = totalPrice * (1 - promoResult[0].discount);

      alert(`Промокод ${promoResult[0].name} успішно активовано`);
    } else {
      alert("На жаль, промокод недійсний");
    }

  }



  if (mainPromt === "6") {
    var customerName = prompt("Введіть ваше ім'я:");

    var customerNumber = prompt("Введіть ваш номер телефону:");
    while (isNaN(customerNumber)) {
      customerNumber = prompt("Використовуйте лише цифри");
    }

    if (promoResult.length > 0) {
      alert(`Дякуємо ${customerName}, ваше замовлення успішно оформлено!\n Сума до сплати: ${promoTotalprice} грн\n\n Статус: замовлення прийнято та чекає підвердження`)
    } else {
      alert(`Дякуємо ${customerName}, ваше замовлення успішно оформлено!\n Сума до сплати: ${totalPrice} грн\n\n Статус: замовлення прийнято та чекає підвердження`)
    }

    alert("Очікуйте ваше замовлення")
  }


  if (mainPromt === "0") {
    alert("Дякуємо що користуєтесь нашим сервісом")
    break;
  }
}

