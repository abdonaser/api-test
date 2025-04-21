const fs = require('fs')
const path = require('path');


// Path to the JSON file
const DATA_FILE = path.join(__dirname, '../public', 'data', 'course.json');
const course = '/public/data/course.json'

// const data = fs.readFileSync("../public/data", 'utf-8');

// Helper to read JSON file
const allCourses = () => {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper to write JSON file
const writeData = (data) => {

    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
};




module.exports = {
    allCourses,
    writeData
}