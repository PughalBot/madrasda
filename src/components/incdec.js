import React from 'react'

export default function ncdec() {
    function increaseValue() {
        var value = parseInt(document.getElementById('number').value, 10);
        value = isNaN(value) ? 0 : value;
        value++;
        document.getElementById('number').value = value;
      }
      
      function decreaseValue() {
        var value = parseInt(document.getElementById('number').value, 10);
        value = isNaN(value) ? 0 : value;
        value < 1 ? value = 1 : '';
        value--;
        document.getElementById('number').value = value;
      }
  return (  
    <>
    <div className="value-button" id="decrease" onclick={decreaseValue} value="Decrease Value">-</div>
    <input type="numeric" id="number" value="0" />
    <div className="value-button" id="increase" onclick={increaseValue} value="Increase Value">+</div>
    </>
  )
}
