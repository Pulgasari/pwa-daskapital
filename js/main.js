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

    const headlines = document.querySelectorAll('h2, h3, h4, h5, h6');
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



const x = selector => {
  
  let el = document.querySelector( selector );
  let obj = { el };

  // Class
  obj.addClass    = function(name) { this.el.classList.add(name);    return this; };
  obj.removeClass = function(name) { this.el.classList.remove(name); return this; };
  obj.toggleClass = function(name) { this.el.classList.toggle(name); return this; };

  // Data
  obj.data = function( property, value ) { 
    this.el.dataset[property] = value;
    return this;
  };

  // Log
  obj.log = function() { console.log(this.el); return this; };

  return obj;
};