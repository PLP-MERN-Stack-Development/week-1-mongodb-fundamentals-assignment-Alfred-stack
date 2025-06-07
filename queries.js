// Write MongoDB queries to:
//   - Find all books in a specific genre
//   - Find books published after a certain year
//   - Find books by a specific author
//   - Update the price of a specific book
//   - Delete a book by its title

// ### Task 3: Advanced Queries
// - Write a query to find books that are both in stock and published after 2010
// - Use projection to return only the title, author, and price fields in your queries
// - Implement sorting to display books by price (both ascending and descending)
// - Use the `limit` and `skip` methods to implement pagination (5 books per page)

// ### Task 4: Aggregation Pipeline
// - Create an aggregation pipeline to calculate the average price of books by genre
// - Create an aggregation pipeline to find the author with the most books in the collection
// - Implement a pipeline that groups books by publication decade and counts them

// ### Task 5: Indexing
// - Create an index on the `title` field for faster searches
// - Create a compound index on `author` and `published_year`
// - Use the `explain()` method to demonstrate the performance improvement with your indexes

// MongoDB queries for the tasks

// Finding all books in a specific genre
db.books.find({ genre: "Fiction" });

// Finding books published after a certain year
db.books.find({ published_year: { $gt: 1851 } });

// Find books by a specific author
db.books.find({ author: "F. Scott Fitzgerald"});

// Update the price of a specific book
db.books.updateOne(
  { title: "Brave New World" },
  { $set: { price: 15.99 } }
);

// Delete a book by its title
db.books.deleteOne({ title: "George Orwell" });

// Task 3: Advanced Queries

// Find books that are both in stock and published after 2010
db.books.find(
  { in_stock: true, published_year: { $gt: 2010 } },
  { title: 1, author: 1, price: 1 }
);

// Sort books by price in ascending order
db.books.find().sort({ price: 1 });

// Sort books by price in descending order
db.books.find().sort({ price: -1 });

// Pagination: Limit to 5 books per page and skip the first 5 books (page 2)
db.books.find().limit(5).skip(5);

// Task 4: Aggregation Pipeline

// Calculate the average price of books by genre
db.books.aggregate([
  { $group: { _id: "$genre", avg_price: { $avg: "$price" } } }
]);

// Find the author with the most books in the collection
db.books.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 1 }
]);

// Group books by publication decade and count them
db.books.aggregate([
    {
        $group: {
            _id: { $concat: [ { $toString: "$published_year" }, "s" ] },
            count: { $sum: 1 }
        }
    },
    { $sort: { count: -1 } }
]);

// Task 5: Indexing

// Create an index on the title field
db.books.createIndex({ title: 1 });

// Create a compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// Use the explain() method to demonstrate performance improvement
db.books.explain("executionStats").find({ title: "The Great Gatsby"});
