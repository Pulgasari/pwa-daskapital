const ls = ( property, value ) => {
  if( typeof property !== 'undefined' ){
    if( typeof value !== 'undefined' ){
      localStorage.setItem( property, value );
    }
    return localStorage.getItem(property);
  }
  return null;
}

  //
  let brightness = ls('brightness') || '1.00';
  let fontsize   = ls('fontsize')   || '15';
  let lineheight = ls('lineheight') || '1.25';

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
  }
  
  // Apply CSS Variables
  x('html').cssvar( 'brightness', brightness        );
  x('html').cssvar(   'fontsize', fontsize   + 'px' );
  x('html').cssvar( 'lineheight', lineheight + 'em' );
  x('html').data( 'stylemode', stylemode );
  
  //
  renderHeader();
  toc({ container: '#toc', selectors: 'h2, h3, h4, h5, h6' });
  
}

let renderHeader = () => {
  
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
              oninput="ls('fontsize',this.value); x('html').cssvar('fontsize',this.value+'px')"
              >
          </div>
          <div>
            <label for="lineheight">Zeilenabstand</label>
            <input 
              type="range" id="lineheight" name="lineheight" 
              min="1" max="2" step="0.05" value="${lineheight}" 
              oninput="ls('lineheight',this.value); x('html').cssvar('lineheight',this.value+'em')"
              >
          </div>
        </div>
      </div>
       <div>
        <i class="fa-solid fa-palette" onclick="x('#colorsettings').toggleClass('hidden')"></i>
        <div class="subtab hidden" id="colorsettings">
           <div>
            <label for="stylemode">Theme</label>
            <select id="stylemode" name="stylemode" onchange="ls('stylemode',this.value); x('html').data('stylemode',this.value)">
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
              oninput="ls('brightness',this.value); x('html').cssvar('brightness',this.value)"
              >
          </div>
        </div>
      </div>
    </div>
  `
  
  document.querySelector('header').innerHTML = html;
  
}