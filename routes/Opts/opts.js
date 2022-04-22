
const addNovel = require('../../controllers/novel')

const addPostOpts = {
    schema: addNovelSchema, // will be created in schemas/posts.js
    handler: addNovel, // will be created in handlers/posts.js
};