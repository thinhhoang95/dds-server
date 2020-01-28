import { gql } from "apollo-server-express";

export const typeDefs = gql`
    input StudentWithoutClass{
        code: String,
        email: String,
        password: String,
        address: String,
        facebook: String,
        phoneNumber: String,
        birthDate: String,
        birthPlace: String,
        sex: Boolean,
        dateOfJoiningYouthUnion: String,
        dateOfJoiningParty: String,
        privilege: String,
        schoolClass: String
    }

    input StudentEdit{
        email: String,
        password: String,
        address: String,
        facebook: String,
        phoneNumber: String,
        birthDate: String,
        birthPlace: String,
        sex: Boolean,
        dateOfJoiningYouthUnion: String,
        dateOfJoiningParty: String,
        privilege: String,
        schoolClass: String
    }

    type Student{
        _id: String,
        code: String,
        email: String,
        password: String,
        address: String,
        facebook: String,
        phoneNumber: String,
        birthDate: String,
        birthPlace: String,
        sex: Boolean,
        dateOfJoiningYouthUnion: String,
        dateOfJoiningParty: String,
        privilege: String,
        dateCreated: String
        schoolClass: SchoolClass
    }

    type Token{
        token: String,
        dateOfIssue: String,
        privilege: String
    }

    extend type Query {
        # admin privilege
        getAllStudents(cursor: Int, limit: Int): [Student],
        # getStudentByNameOrClass(query: String): [Student],
        # getStudentByCode(code: String): Student,
        # getStudentByName(studentName: String): [Student],
        # no privilege
        login(code: String, password: String): Token
        # user privilege
        me: Student,
    }

    extend type Mutation {
        # no privilege
        addStudent(stu: StudentWithoutClass): Int,
        # user privilege
        editMe(data: StudentEdit): Int,
        deleteMe: Int,
        # admin privilege
        # editStudent(id: ID!, info: Object!): Student,
        # deleteStudent(id: ID!): Int
    }
`;