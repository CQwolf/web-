var imgItemStyle = [
    "#18E1E5",
    "#1459F9",
    "#1BD2B6",
    "#29FFD7",
    "#658FE2",
    "#47AAFF",
],
function itemStyleRound(colorArray, count) {
    if (Array.isArray(colorArray)) {
        if (colorArray.length <= count) {
            return colorArray;
        } else {
            var needNum = count - colorArray.length;
            var colorArrayChoice = [
                "0",
                "1",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "A",
                "B",
                "C",
                "D",
                "E",
                "F",
            ];
            var i = 0;
            while (i <= needNum) {
                var colorString = "#";
                for (var j = 0; j < 6; j++) {
                    colorString += colorArrayChoice[Math.ceil(Math.random() * 15)];
                }
                if (!colorArray.includes(colorString)) {
                    colorArray.push(colorString);
                    i++;
                }
            }
            return colorArray;
        }
    }
}

console.log(itemStyleRound(imgItemStyle, 5));
console.log(itemStyleRound(imgItemStyle, 6));
console.log(itemStyleRound(imgItemStyle, 10));
