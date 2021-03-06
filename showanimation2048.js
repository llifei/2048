function showNumberWithAnimation(i,j,number){
    var numbercell = $('#number-cell-'+i+'-'+j);
    
    numbercell.css('background-color',getNumberBackgroundColor(number));
    numbercell.css('color',getNumberColor(number));
    numbercell.text(number);

    numbercell.animate({
        width:"100px",
        height:"100px",
        top:getPosTop(i,j),
        left:getPosLeft(i,j)
    },50);
}

function showMoveAnimation(fromx,fromy,tox,toy){
    var numberCell = $('#number-cell-'+fromx+'-'+fromy);
    numberCell.animate({
        top:getPosTop(tox,toy),
        left:getPosLeft(tox,toy)
    },200);
}