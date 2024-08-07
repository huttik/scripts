// ==UserScript==
// @name        Token Onewin
// @namespace   Token Onewin
// @match       https://web.telegram.org/k/*
// @match       https://web.telegram.org/a/*
// @grant       none
// @downloadURL https://github.com/huttik/scripts/raw/main/Onewin.js
// @updateURL   https://github.com/huttik/scripts/raw/main/Onewin.js
// @homepage    https://github.com/huttik/scripts/raw
// ==/UserScript==
(function() {
  'use strict';

const createModal = (iframeLinks) => {
    // Создание элементов модального окна
    const modal = document.createElement('div');
    const modalContent = document.createElement('div');
    const copyButton = document.createElement('button'); // Создание кнопки "Скопировать"

    // Стилизация модального окна
    modal.style.position = 'fixed'; // Фиксированное позиционирование, чтобы модальное окно оставалось на месте при прокрутке
    modal.style.top = '0'; // Расположение модального окна от верхнего края
    modal.style.left = '0'; // Расположение модального окна от левого края
    modal.style.width = '100%'; // Ширина модального окна на весь экран
    modal.style.height = '100%'; // Высота модального окна на весь экран
    modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Полупрозрачный черный фон для затемнения заднего плана
    modal.style.display = 'flex'; // Использование Flexbox для центрирования содержимого
    modal.style.alignItems = 'center'; // Вертикальное центрирование содержимого
    modal.style.justifyContent = 'center'; // Горизонтальное центрирование содержимого
    modal.style.zIndex = '10000'; // Высокий z-index для отображения модального окна поверх других элементов

    // Стилизация содержимого модального окна
    modalContent.style.backgroundColor = 'white';
    modalContent.style.padding = '0px';
    modalContent.style.boxShadow = '0 0 10px rgba(0, 0, 0, 1)';
    modalContent.style.borderRadius = '30px';
    modalContent.style.width = '300px';
    modalContent.style.position = 'relative';

    // Стилизация кнопки "Скопировать"
    copyButton.textContent = 'Скопировать';
    copyButton.style.display = 'block';
    copyButton.style.margin = '0px auto 0';
    copyButton.style.padding = '15px 15px';
    copyButton.style.color = 'blue'; // Сделать текст синим
    copyButton.style.backgroundColor = 'transparent'; // Убрать серый фон
      copyButton.style.border = 'none'; // Убрать рамку
    copyButton.style.boxShadow = 'none';


    // Добавление элементов в модальное окно
    modalContent.appendChild(copyButton); // Добавление кнопки "Скопировать"
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Обработчик события для кнопки "Скопировать"
    copyButton.addEventListener('click', () => {
      const textarea = document.createElement('textarea');
      textarea.value = iframeLinks;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      document.body.removeChild(modal);
      window.location.href = 'https://t.me/imhuttik'; // Открытие ссылки в той же вкладке
    });

    // Обработчик события для закрытия модального окна при клике на задний фон
    modal.addEventListener('click', (event) => {
      if (event.target === modal) {
        document.body.removeChild(modal);
      }
    });
};

  // Функция для проверки наличия iframes на странице и вывода их ссылок
// Функция для проверки наличия iframes с определенным src
  const checkIframe = (iframe) => {
    const src = iframe.getAttribute('src');
    console.log(`Проверка iframe: ${src}`); // Логируем каждый найденный iframe
    if (src && src.includes('cryptocklicker')) {
      console.log(`Iframe найден: ${src}`);
      createModal(`Iframe найден:\n${src}`);
    }
  };

  // Функция для наблюдения за изменениями в DOM
  const observeDOM = () => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.tagName === 'IFRAME') {
            checkIframe(node); // Проверка непосредственно добавленного iframe
          } else if (node.nodeType === 1) {
            const iframes = node.querySelectorAll('iframe');
            iframes.forEach(checkIframe); // Проверка iframes внутри добавленного узла
          }
        });
      });
    });

    // Начинаем наблюдение за изменениями в body
    observer.observe(document.body, { childList: true, subtree: true });
    console.log('Наблюдение за DOM запущено');
  };

  // Запуск наблюдателя
  observeDOM();
})();
