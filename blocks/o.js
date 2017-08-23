class O extends Block {
    constructor(i, j) {
        super(i, j);
        this.rotations = [[
            [1, 1],
            [1, 1]
        ]];
        this.rotation = 0;
        this.shape = this.rotations[this.rotation];
        this.color = "yellow";
    }
}