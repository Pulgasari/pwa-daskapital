window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
}


document.addEventListener("DOMContentLoaded", () => {
  function buildTableOfContents() {
    const menu = document.getElementById('toc');
    if (!menu) return;

    const headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const toc = document.createElement('ul');

    headlines.forEach(headline => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      const id = headline.innerText.replace(/\s+/g, '-').toLowerCase();
      const tagName = headline.tagName;
      
      headline.id = id;
      link.href = `#${id}`;
      link.innerText = headline.innerText;

      listItem.classList.add(tagName);
      listItem.appendChild(link);
      toc.appendChild(listItem);
    });

    menu.appendChild(toc);
  }

  buildTableOfContents();
});