//Accepts a string of either length 3 or 6
//representing a hex color. '#' signs aren't allowed or accepted
//Returns Red Green and Blue equivalent in an object
function convertHexToRGB(hexString) {
  var rgbArr = [];
  if (hexString.length === 3) {
    rgbArr = hexString.split('');
    rgbArr.forEach((element, index, arr) => {
      arr[index] = element + '' + element;
    });
  } else if (hexString.length === 6) {
    for (var i = 0; i < 6; i += 2) {
      rgbArr.push(hexString.substring(i, i + 2));
    }
  }
  var rgb = {};
  rgb.red = parseInt(rgbArr[0], 16);
  rgb.green = parseInt(rgbArr[1], 16);
  rgb.blue = parseInt(rgbArr[2], 16);
  return rgb;
}

//Accepts 3 numbers each between 0 and 255
//representing their Red Green and Blue values respectively
//Returns a string that's the equivalent color in Hex
function convertRGBToHex(red, green, blue) {
  var hex1,
    hex2,
    hex3 = 0;
  hex1 = red.toString(16);
  if (hex1.length < 2) {
    hex1 = '0' + hex1;
  }
  hex2 = green.toString(16);
  if (hex2.length < 2) {
    hex2 = '0' + hex2;
  }
  hex3 = blue.toString(16);
  if (hex3.length < 2) {
    hex3 = '0' + hex3;
  }
  return hex1 + '' + hex2 + '' + hex3;
}

document.addEventListener('click', e => {
  //Currently triggerable by a button.
  //Can be switched to keyup but it gets
  //more annoying than it's worth.
  if (e.target.id == 'convertHex') {
    const input = document.querySelector('#hexInput');

    if (input.value.length === 3 || input.value.length === 6) {
      const rgb = convertHexToRGB(input.value);
      document.querySelector('#redRGBInput').value = rgb.red;
      document.querySelector('#greenRGBInput').value = rgb.green;
      document.querySelector('#blueRGBInput').value = rgb.blue;
      document.querySelector('#demo').style.backgroundColor =
        'rgb(' + rgb.red + ',' + rgb.green + ',' + rgb.blue + ')';
    }
  } else if (e.target.id == 'convertRGB') {
    const red = document.querySelector('#redRGBInput').value;
    const green = document.querySelector('#greenRGBInput').value;
    const blue = document.querySelector('#blueRGBInput').value;
    if (
      red.length > 0 &&
      red >= 0 &&
      red < 256 &&
      green.length > 0 &&
      green >= 0 &&
      green < 256 &&
      blue.length > 0 &&
      blue >= 0 &&
      blue < 256
    ) {
      let hex = convertRGBToHex(parseInt(red), parseInt(green), parseInt(blue));
      document.querySelector('#hexInput').value = hex.toUpperCase();
      document.querySelector('#demo').style.backgroundColor = '#' + hex;
    }
  }
});

document.addEventListener('keyup', e => {
  if (e.target.id === 'hexInput') {
    const input = document.querySelector('#hexInput');
    input.value = input.value.replace(/[^a-fA-F\d]+/g, '');
  } else {
    var error = false;
    var rgbInputs = [];
    if (e.target.id === 'blueRGBInput') {
      rgbInputs.push(document.querySelector('#blueRGBInput'));
    } else if (e.target.id === 'redRGBInput') {
      rgbInputs.push(document.querySelector('#redRGBInput'));
    } else if (e.target.id === 'greenRGBInput') {
      rgbInputs.push(document.querySelector('#greenRGBInput'));
    }

    rgbInputs.forEach(element => {
      if (element.value < 0) {
        error = true;
        element.value = 0;
      } else if (element.value > 255) {
        error = true;
        element.value = 255;
      }
    });
    const errorEl = document.querySelector('#rgbError');
    if (error === true) {
      errorEl.classList.remove('hidden');
    } else {
      errorEl.classList.add('hidden');
    }
  }
});
