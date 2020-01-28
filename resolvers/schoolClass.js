import schoolClassModel from '../schema/schoolClass';
import { ApolloError } from 'apollo-server-express';

export const resolvers = {
    Query: {
        // TODO: Implement
    },

    Mutation: {
        addSchoolClass: async (_, { data }, __, ___) => {
            let newSchoolClass = new schoolClassModel({
                className: data.className,
                schoolYear: data.schoolYear,
                host: data.host,
                students: []
            });
            try {
                await newSchoolClass.save();
                return 1;
            } catch (error) {
                throw new ApolloError('Cannot create new SchoolClass!');
            }
        },
        editSchoolClass: async (_, { id, data }, __, ___) => {
            let schoolClass = await schoolClassModel.findById(id);
            if (schoolClass)
            {
                try {
                await schoolClassModel.findByIdAndUpdate(id, data);
                return 1;
                } catch (error) {
                    throw new ApolloError('Cannot edit schoolClass ' + error);
                }
            } else {
                throw new ApolloError('Cannot find the schoolClass given by ID');
            }
        },
        deleteSchoolClass: async (_, { id }, __, ___) => {
            let schoolClass = await schoolClassModel.findById(id);
            if (schoolClass)
            {
                try {
                await schoolClass.remove();
                return 1;
                } catch (error) {
                    throw new ApolloError('Cannot delete schoolClass ' + error);
                }
            } else {
                throw new ApolloError('Cannot find the schoolClass given by ID');
            }
        }
    }
}