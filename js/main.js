

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
  
  //[ 'brightness', 'fontsize', 'lineheight' ]
  //.forEach( str => {
  //  if( cookie(str) ){  x('html').cssvar( str, cookie(str) ) }
  //});
  
  //if( cookie('brightness') ){ x('html').cssvar( 'brightness', cookie('brightness')        ) }
  //if( cookie('fontsize'  ) ){ x('html').cssvar(   'fontsize', cookie('fontsize'  ) + 'px' ) }
  //if( cookie('lineheight') ){ x('html').cssvar( 'lineheight', cookie('lineheight') + 'em' ) }
  
  //
  let brightness = cookie('brightness') || '1.00';
  let fontsize   = cookie('fontsize')   || '15';
  let lineheight = cookie('lineheight') || '1.25';
  
  // Apply CSS Variables
  x('html').cssvar( 'brightness', brightness        );
  x('html').cssvar(   'fontsize', fontsize   + 'px' );
  x('html').cssvar( 'lineheight', lineheight + 'em' );
  
  //
  renderHeader();
  buildTableOfContents();
  //toc({ container: '#toc', selectors: 'h2, h3, h4, h5, h6' });
  
}



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

  



const x = selector => {
  
  let el = document.querySelector( selector );
  let obj = { el };
  
  // CSS Variable
  obj.cssvar = function( property, value ){
    this.el.style.setProperty( '--' + property, value );
    return this;
  }

  // Class
  obj.addClass    = function(name) { this.el.classList.add(name);    return this; };
  obj.removeClass = function(name) { this.el.classList.remove(name); return this; };
  obj.toggleClass = function(name) { this.el.classList.toggle(name); return this; };

  // Data
  obj.data = function( property, value ) { 
    if( typeof value !== 'undefined' ){
      this.el.dataset[property] = value;
      return this;
    } else {
      return this.el.dataset[property];
    }
  };
  
    // Value
  obj.value = function( value ) { 
    if( typeof value !== 'undefined' ){
      this.el.value = value;
      return this;
    } else {
      return this.el.value;
    }
  };

  // Log
  obj.log = function() { console.log(this.el); return this; };

  return obj;
};


let renderHeader = () => {
  
  //let brightness = cookie('brightness') || '1.00';
  //let fontsize   = cookie('fontsize')   || '15';
  //let lineheight = cookie('lineheight') || '1.25';
  
  let html = `
    <div class="left">
      <i class="fa-solid fa-bars" onclick="x('#toc').toggleClass('hidden')"></i>
      <menu id="toc" class="hidden"></menu>
    </div>
    <div class="right">
      <div>
        <i class="fa-solid fa-font" onclick="x('#fontsettings').toggleClass('hidden')"></i>
        <div class="subtab hidden" id="fontsettings">
          <div>
            <label for="fontsize">Schriftgröße</label>
            <input 
              type="range" id="fontsize" name="fontsize" 
              min="10" max="20" step="1" value="${fontsize}" 
              oninput="cookie('fontsize',this.value); x('html').cssvar('fontsize',this.value+'px')"
              >
          </div>
          <div>
            <label for="lineheight">Zeilenabstand</label>
            <input 
              type="range" id="lineheight" name="lineheight" 
              min="1" max="2" step="0.05" value="${lineheight}" 
              oninput="cookie('lineheight',this.value); x('html').cssvar('lineheight',this.value+'em')"
              >
          </div>
        </div>
      </div>
       <div>
        <i class="fa-solid fa-palette" onclick="x('#colorsettings').toggleClass('hidden')"></i>
        <div class="subtab hidden" id="colorsettings">
           <div>
            <label for="stylemode">Theme</label>
            <select id="stylemode" name="stylemode" onchange="x('html').data('stylemode',this.value)">
              <option>dark</option>
              <option>light</option>
              <option>oled</option>
              <option>white</option>
            </select>
          </div>
          <div>
            <label for="brightness">Helligkeit</label>
            <input 
              type="range" id="brightness" name="brightness"
              min="0.25" max="1.00" step="0.05" value="${brightness}" 
              oninput="cookie('brightness',this.value); x('html').cssvar('brightness',this.value)"
              >
          </div>
        </div>
      </div>
    </div>
  `
  
  document.querySelector('header').innerHTML = html;
  
}