var board = new Array();
var score = 0;
var hasConflicted = new Array();

$(document).ready(function(){
    newgame();
})

function newgame(){
    //初始化棋盘格
    init();
    //在随机两个棋子生成数字
    generateOneNumber(board);
    generateOneNumber(board);
}

function init(){
    for(var i = 0;i<4;i++)
        for(var j = 0;j<4;j++){
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));
        }
    for(var i = 0;i < 4;i++){
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j = 0;j < 4;j++){
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
        
    updateBoardView();

    score=0;
}

function updateBoardView(){
    $(".number-cell").remove();
    for(var i = 0;i < 4;i++){
        for(var j = 0;j < 4;j++){
            
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var thenumbercell = $("#number-cell-"+i+"-"+j);
            
            if(board[i][j]==0){
                thenumbercell.css("width","0px");
                thenumbercell.css("height","0px");
                thenumbercell.css("top",getPosTop(i,j)+50);
                thenumbercell.css("left",getPosLeft(i,j)+50);
            }else{
                thenumbercell.css("width","100px");
                thenumbercell.css("height","100px");
                thenumbercell.css("top",getPosTop(i,j));
                thenumbercell.css("left",getPosLeft(i,j));

                thenumbercell.css("background-color",getNumberBackgroundColor(board[i][j]));
                thenumbercell.css("color",getNumberColor(board[i][j]));
                thenumbercell.text(board[i][j]);
            }
            hasConflicted[i][j]=false;
        }
    }
}

$(document).keydown(function(event){
    switch(event.keyCode){
        case 37://left
            if(moveLeft()){
                setTimeout("generateOneNumber(board)",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 38://up
            if(moveUp()){
                setTimeout("generateOneNumber(board)",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            if(moveRight()){
                setTimeout("generateOneNumber(board)",210);
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            if(moveDown()){
                setTimeout("generateOneNumber(board)",210);
                setTimeout("isgameover()",300);
            }
            break;
    }
});

function moveLeft(){
    if(!canmoveLeft(board))
        return false;
    
    for(var i = 0;i < 4;i ++)
        for(var j = 1;j < 4;j ++){
            if(board[i][j]!=0){
                for(var k = 0;k < j;k ++){
                    if(board[i][k] == 0 && noBlockHorizontal(i,k,j,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board)){
                        if(!hasConflicted[i][k]){
                            showMoveAnimation(i,j,i,k);
                            board[i][k] += board[i][j];
                            hasConflicted[i][k]=true;
                            board[i][j]=0;
                            
                            score+=board[i][k];
                            updateScore(score);
                        }
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;    
}

function moveUp(){
    if(!canmoveUp(board))
        return false;
    
    for(var i = 0;i < 4;i ++)
        for(var j = 1;j < 4;j ++){
            if(board[j][i]!=0){
                for(var k = 0;k < j;k ++){
                    if(board[k][i] == 0 && noBlockVertical(i,k,j,board)){
                        showMoveAnimation(j,i,k,i);
                        board[k][i] = board[j][i];
                        board[j][i] = 0;
                        continue;
                    }
                    else if(board[k][i] == board[j][i] && noBlockVertical(i,k,j,board)){
                        if(!hasConflicted[k][i]){
                            showMoveAnimation(j,i,k,i);
                            board[k][i] += board[j][i];
                            hasConflicted[k][i]=true;
                            board[j][i] = 0;

                            score+=board[k][i];
                            updateScore(score);
                        }
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;    
}

function moveRight(){
    if(!canmoveRight(board))
        return false;
    
    for(var i = 0;i < 4;i ++)
        for(var j = 2;j >= 0;j --){
            if(board[i][j]!=0){
                for(var k = 3;k > j;k --){
                    if(board[i][k] == 0 && noBlockHorizontal(i,j,k,board)){
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board)){
                        if(!hasConflicted[i][k]){
                            showMoveAnimation(i,j,i,k);
                            board[i][k] += board[i][j];
                            hasConflicted[i][k]=true;
                            board[i][j]=0;
                            
                            score+=board[i][k];
                            updateScore(score);
                        }
                        continue;
                    }
                }
            }
        }

    setTimeout("updateBoardView()",200);
    return true;    
}

function moveDown(){
    if(!canmoveDown(board))
        return false;
    
        for(var i = 0;i < 4;i ++)
            for(var j = 2;j >= 0;j --){
                if(board[j][i]!=0){
                    for(var k = 3;k > j;k --){
                        if(board[k][i] == 0 && noBlockVertical(i,j,k,board)){
                            showMoveAnimation(j,i,k,i);
                            board[k][i] = board[j][i];
                            board[j][i] = 0;
                            continue;
                        }
                        else if(board[k][i] == board[j][i] && noBlockVertical(i,j,k,board)){
                            if(!hasConflicted[k][i]){
                                showMoveAnimation(j,i,k,i);
                                board[k][i] += board[j][i];
                                hasConflicted[k][i]=true;
                                board[j][i] = 0;
    
                                score+=board[k][i];
                                updateScore(score);
                            }
                            continue;
                        }
                    }
                }
            }

    setTimeout("updateBoardView()",200);
    return true;    
}

function isgameover(){
    if(nospace(board)&&nomove(board)){
        gameover();
    }
}

function gameover(){
    alert("gameover!");
}

function updateScore(score){
    $("#score").text(score);
}