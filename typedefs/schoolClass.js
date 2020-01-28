import { gql } from "apollo-server-express";

export const typeDefs = gql`
    input NewSchoolClass{
        className: String,
        schoolYear: Int,
        host: String
    }

    type SchoolClass{
        className: String,
        schoolYear: Int,
        host: String,
        students: [Student]
    }

    extend type Query{
        getAllSchoolClass(cursor: Int, limit: Int):[SchoolClass],
        getSchoolClassByClassName(className: String):SchoolClass,
        getSchoolClassBySchoolYear(schoolYear: Int):[SchoolClass]
    }

    extend type Mutation{
        addSchoolClass(data: NewSchoolClass): Int,
        editSchoolClass(id: String, data: NewSchoolClass): Int,
        deleteSchoolClass(id: String): Int
    }
`;