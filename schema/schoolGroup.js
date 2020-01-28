import mongoose from 'mongoose';

const schoolGroupSchema = new mongoose.Schema({
    groupName: String,
    description: String,
    students: [mongoose.SchemaTypes.ObjectId]
});

export default mongoose.model('schoolGroup', schoolGroup);