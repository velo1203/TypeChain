import * as crypto from "crypto";

interface BlockShape {
    hash: string;
    prevHash: string;
    height: number;
    data: string;
}

class Block implements BlockShape {
    public hash: string;
    constructor(
        public prevHash: string,
        public height: number,
        public data: string
    ) {
        this.hash = Block.caluateHash(prevHash, height, data);
    }

    static caluateHash(prevHash: string, height: number, data: string) {
        const toHash = `${prevHash}${height}${data}`;
        return crypto.createHash("sha256").update(toHash).digest("hex");
    }
}

class BlockChain {
    private blocks: Block[];
    constructor() {
        this.blocks = [];
    }
    private getPreviousHash() {
        if (this.blocks.length === 0) return "";
        return this.blocks[this.blocks.length - 1].hash;
    }
    public addBlock(data: string) {
        const block = new Block(
            this.getPreviousHash(),
            this.blocks.length + 1,
            data
        );
        this.blocks.push(block);
    }

    public getBlocks() {
        return this.blocks;
    }
}

const blockchain = new BlockChain();

blockchain.addBlock("First Block");
blockchain.addBlock("Second Block");
blockchain.addBlock("Third Block");

console.log(blockchain.getBlocks());
