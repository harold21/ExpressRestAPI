const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/playground', { useNewUrlParser: true })
    .then(() => console.log('DB created...'))
    .catch(err => console.error('Could not connect to mongoDb...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    price: Number,
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
    const course = new Course({
        name: 'Angular Course',
        author: 'Harold',
        tags: ['angular', 'frontend'],
        price: 10,
        isPublished: true
    });
    
    const result = await course.save();
    console.log(result);
}

async function getCourses() {
    // comparison operators:
    // eq (equal) ne (not equal) gt (greater than) gte (greater than equal) lt (less than) lte (less than equal) in nin (not in)
    const courses = await Course
        // .find( { author: 'Harold', isPublished: true })
        // .find( { price: { $gte: 10, $lte: 20 } })
        // .find( { price: { $in: [10, 15, 20] } })
        // .find()
        // .or([{ author: Harold, isPublished: true }])
        .find({ author: /^Harold/ }) //All courses that start with 'Harold'
        .find({ author: /Buenaventura$/i }) // Ends with 'Buenaventura' *i is used for indicate no case sensitive
        .find({ author: /.*Harold.*/i }) // Contains Harold
        .limit(10)
        .sort({name: 1})
        .select({name:1, tags: 1})
    console.log(courses);
}

getCourses();