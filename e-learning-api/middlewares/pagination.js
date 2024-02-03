const pagination = (model)=>{
    return async (req,resp,next)=>{
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page -1 ) * limit
        const endIndex = page * limit

        const results = {}

        results.results = await model.find().limit(limit).skip(startIndex).exec()
        resp.paginationResult = results
        next()
    }
}

module.exports = {pagination}