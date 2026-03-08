const { pipeline } = require("@xenova/transformers");

let embedder;

async function loadModel(){
    embedder = await pipeline(
        "feature-extraction",
        "Xenova/all-MiniLM-L6-v2"
    );
}

async function createEmbedding(text){

    const result = await embedder(text);

    return Array.from(result.data);

}

module.exports = { loadModel, createEmbedding };