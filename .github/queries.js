//use plp_bookstore

//Find all books in the Fiction genre
db.books.find({
    genre: "Fiction"
});

//Find all books published after 1851

db.books.find({
    published_year:{
        $gt: 1851
    }
});

//Find a book by a specific author
db.books.find({
    author: "F. Scott Fitzgerald"
});

//Updating a book's price
db.books.updateOne(
    {title: "Brave New World"},
    {$set:{price: 15.99}}
);


//Deleting a book by its title
db.books.deleteOne(
    {title: "Animal Farm"}
);

//Find all books published after 2010 that are in stock
db.books.find({
        in_stock: true,
        published_year: {$gt: 2010}
    
});
// I probably deleted the book that had the year 2010 but there was no returned output because the books in the database had no year 2010 or above.

//Find all books and only return the title, author, and price fields
db.books.find({}, 
    {title: 1, author: 1, price: 1, _id: 0});

//Sort books by price in ascending and descending order
db.books.find().sort({price: 1});
db.books.find().sort({price: -1});

//Pagination
db.books.find().limit(5).skip(0);
db.books.find().limit(5).skip(5);

// ### Task 1: Aggregation Pipelines
// Using the Aggregation pipeline to find average price by genre
db.books.aggregate([
    {$group: {_id: "$genre", avg_price: {$avg: "$price"}}}
]);

// - Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
    {$group: {_id: "$author", count: {$sum: 1}}},
    {$sort: {count: -1}},
    {$limit: 1}
]);



// pipeline that groups by publication year and counts them
db.books.aggregate([
    {
        $group: {
            _id: {
                $concat: [
                    { $toString: "$published_year" },
                    "s"
                ]
            },
            count: { $sum: 1 }
        }
    },
    { $sort: { count: -1 } }
]);

//Because the publication year is a number i had to convert it to a string to be able to concatenate it with the count.


// ### Task 5: Indexing
// - Create an index on the `title` field for faster searches
db.books.createIndex({title: 1});

// - Create a compound index on `author` and `published_year`
db.books.createIndex({author: 1, published_year: 1});

// - Use the `explain()` method to demonstrate the performance improvement with your indexes
db.books.explain("executionStats").find({title: "The Great Gatsby"});
