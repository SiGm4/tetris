function Tile(i,j){
    this.full = false;
    this.color = 196;
}

Tile.checkLines = function(){
    for (i = grid.length-1 ; i >= 0; i--){
        var filled = true;
        for ( j = 0; j< grid[i].length; j++){
            if (!grid[i][j].full){
                filled = false;
                break;
            }
        }
        if (filled){
            grid.splice(i, 1);
            score += 1;
        }
    }
    while (grid.length<rows){
        var newRow = new Array(cols);
        for ( i = 0; i< newRow.length; i++){
            newRow[i] = new Tile();
        }
        grid.unshift(newRow);
    }
}