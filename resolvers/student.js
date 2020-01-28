import { AuthenticationError, ApolloError } from 'apollo-server-express'
import studentModel from '../schema/student'
import schoolClassModel from '../schema/schoolClass'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { secret, checkPrivillege } from '../auth'

export const resolvers = {
    Query: {
        getAllStudents: async (parent, {cursor, limit}, me, info) => {
            if (me==null || !checkPrivillege(me, ['admin']))
            {
                throw new AuthenticationError('User is not authorized to perform this action!');
            }
            return await studentModel.find({}, {}, { skip: cursor, limit: limit});
        },
        me: async (parent, _, me, info) => {
            if (me==null || !checkPrivillege(me, ['admin','user']))
            {
                throw new AuthenticationError('You must be logged in to see this info');
            }
            try {
            return await studentModel.findById(me.id);
            } catch (error) 
            {
                throw new ApolloError('Cannot query the user!');
            }
        },
        login: async (parent, { code, password }, _, __) => {
            let student = await studentModel.findOne({ code: code });
            if (!student) {
                throw new AuthenticationError('User does not exist!');
            }
            if (password === student.password) 
            {
                try {
                let authenticationInfo = {
                    id: student._id,
                    code: code,
                    issued: new Date(),
                    email: student.email,
                    privilege: student.privilege
                };
                const token = jwt.sign(authenticationInfo, secret);
                return {
                    dateOfIssue: new Date().toString(),
                    token: token,
                    privilege: student.privilege
                };
            } catch (error)
            {
                throw new ApolloError('Problem logging in: ' + error);
            }
            } else {
                throw new AuthenticationError('Password is invalid!');
            }
        }
    },
    Mutation: {
        addStudent: async (parent, {stu}, context, info) => {
            let existingUser = await studentModel.findOne({code: stu.code});
            if (existingUser)
            {
                throw new ApolloError('User already exists in database');
            }
            const newStudent = new studentModel({
                code: stu.code,
                password: stu.password,
                email: stu.email,
                address: stu.address,
                facebook: stu.facebook,
                phoneNumber: stu.phoneNumber,
                birthDate: new Date(stu.birthDate),
                birthPlace: stu.birthPlace,
                sex: stu.sex,
                dateOfJoiningYouthUnion: new Date(stu.dateOfJoiningYouthUnion),
                dateOfJoiningParty: new Date(stu.dateOfJoiningParty),
                privilege: stu.privilege,
                schoolClass: mongoose.Types.ObjectId(stu.schoolClass),
                dateCreated: new Date()
            });
            try {
                await newStudent.save();
                return 1;
            } catch (error) 
            {
                throw new ApolloError('Cannot create new student! ' + error);
            }
        },
        editMe: async (parent, { data }, me, info) => {
            try {
                await studentModel.findByIdAndUpdate(me.id, data);
                return 1;
            } catch (error) {
                throw new ApolloError('Cannot edit data ' + error);
            }
        },
        deleteMe: async (_, __, me, ___) => {
            try {
                await studentModel.findByIdAndDelete(me.id);
                return 1;
            } catch (error)
            {
                throw new ApolloError('Cannot delete the student from database');
            } finally {
                return 0;
            }
        }
    },
    Student: {
        schoolClass: async ( { schoolClass }, _, __, ___) => {
            return await schoolClassModel.findById(schoolClass);
        }
    }
}