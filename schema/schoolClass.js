import mongoose from 'mongoose';

const schoolClassSchema = new mongoose.Schema({
    className: String,
    schoolYear: Number,
    host: String,
    students: [mongoose.SchemaTypes.ObjectId]
});

export default mongoose.model('schoolClass', schoolClassSchema);