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

      const totalPrice = cart.reduce((sum, item) => {
        const priceAsNumber = parseFloat(item.price) || 0;
        return sum + priceAsNumber;
      }, 0);

      alert(`Ваше замовлення:\n\n${cartList}\n\nЗагальна сума: ${totalPrice} грн`);
    }
  }

  if (mainPromt === "5") {
    const promoSearch = prompt("Введіть промокод: (Наприклад: QWERTY або CATOWL)")

    const promocodeSearch = function (promocode, promoSearch) {
      return promocode.filter(
        item => item.name.toLowerCase().includes(promoSearch.toLowerCase())
      );
    };

    const promoResult = promocodeSearch(promocode, promoSearch);

    const formattedpromoSearch = promoResult
      .map(item => item.name)
      .join("\n");

    if (promoResult.length > 0) {
      alert(`Промокод ${formattedpromoSearch} успішно активовано`);
    } else {
      alert("На жаль проомокод не дійсний");
    }

    var promoTotalprice = totalPrice * (promoResult.discount)
    console.log(promoTotalprice)
  }


  if (mainPromt === "0") {
    break;
  }
}

// Пошук товарів за частковим збігом у назві (без урахування регістру).



// Сортування каталогу за ціною та рейтингом.
