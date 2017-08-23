class S extends Block {
    constructor(i, j) {
        super(i, j);
        this.rotations = [[
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 0, 1]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
        ];
        this.rotation = 0;
        this.shape = this.rotations[this.rotation];
        this.color = "green";
    }
}