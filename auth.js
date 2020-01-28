export const secret = 'TRAN NHAT VY';
import jwt from 'jsonwebtoken';
import { ApolloError } from 'apollo-server-express';

export const decodeToken = (token) => {
    try {
        const decoded = jwt.verify(token, secret);
        console.log(decoded);
        return decoded;
    } catch (error) {
        throw new Error('The token is invalid!');
    }
}

export const checkPrivillege = (authInfo, requiredPrivilege) => {
    try {
        let userPrivilege = authInfo.privilege;
        if (requiredPrivilege.indexOf(userPrivilege)!==-1)
        {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.log('There is an error checking privilege ' + error);
        return false;
    }
}