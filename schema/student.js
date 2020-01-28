import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
    code: String,
    password: String,
    email: String,
    address: String,
    facebook: String,
    phoneNumber: String,
    birthDate: Date,
    birthPlace: String,
    sex: Boolean,
    dateOfJoiningYouthUnion: Date,
    dateOfJoiningParty: Date,
    privilege: String,
    schoolClass: mongoose.SchemaTypes.ObjectId,
    dateCreated: Date
});

export default mongoose.model('student', studentSchema);