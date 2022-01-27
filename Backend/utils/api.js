class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'//case insesntive search 
            }
        } : {}
        //console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
        
    }

    filter() {

        const queryCopy = { ...this.queryStr };

        // Removing fields from the query 
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);//remove feilds like keyword ,
        //sice when selecting something specailly a category a keyword is not send to db 

        //filtering for product features such as ratings , price and etc 
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)//using regex to paass data to db mongo with $


        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;// if prodcuts are less displayed in one pg
        const skip = resPerPage * (currentPage - 1);// skipping products when selecting pg
        this.query = this.query.limit(resPerPage).skip(skip);// Skipping more eg: 10 prd 
        return this;
    }
}

module.exports = APIFeatures