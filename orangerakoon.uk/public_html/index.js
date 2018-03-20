function switchStyle() {
    if (document.styleSheets[0].disabled == false) {
        document.styleSheets[0].disabled = true;
        document.styleSheets[1].disabled = false;
    }
    else {
        document.styleSheets[1].disabled = true;
        document.styleSheets[0].disabled = false;
    }
}

function buildRgbString(r, g, b) {
    return "rgb(" + r + "," + g + "," + b + ")"
}

function writeRgbToScreen(r, g, b, irgb) {
    document.getElementById('rgb').innerHTML = buildRgbString(r, g, b) + ", " + buildRgbString(irgb.r, irgb.g, irgb.b);
}

function invert(r, g, b) {
    return {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b
    };
}

function colourLinks(r, g, b)
{
    var links = document.getElementsByTagName("a");
    for (var i=0; i < links.length; i++)
    {
        if (links[i].href)
        {
            links[i].style.color = buildRgbString(r, g, b);  
        }
    }  
}

function recolourScreen(r, g, b) {
    irgb = invert(r, g, b)
    document.body.style.color = buildRgbString(r, g, b);
    document.body.style.background = buildRgbString(irgb.r, irgb.g, irgb.b);
    colourLinks(r, g, b);
    writeRgbToScreen(r, g, b, irgb);
}

function rainbow() {
    document.getElementById('rainbow').innerHTML = rainbowTextList[rainbowCount];
    if (rainbowCount < rainbowTextList.length - 1) {
        rainbowCount += 1;
    
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);

        recolourScreen(r, g, b);
    }

    else {
        setInterval(colourFade, 20);
    }
}

function colourFade() {
    if (b == 0) {
        r -= 1;
        g += 1;

        if (g == 255) {
            recolourScreen(r, g, b);
            g -= 1;
            b += 1;
        }
    } else if (r == 0) {
        g -= 1;
        b += 1;

        if (b == 255) {
            recolourScreen(r, g, b);
            b -= 1;
            r += 1;
        }
    } else if (g == 0) {
        b -= 1;
        r += 1;

        if (r == 255) {
            recolourScreen(r, g, b);
            r -= 1;
            g += 1;
        }
    }

    recolourScreen(r, g, b);
}

