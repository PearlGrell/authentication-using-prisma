interface ValidatorParams {
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
}

interface ValidatorResponse {
    error: Error | null;
    value: boolean;
}

export function validator({ firstName, lastName, email, dob }: ValidatorParams) : ValidatorResponse {

    if( !firstName || !lastName || !email || !dob){
        return {
            error: new Error('Missing required fields'),
            value: false
        };
    }
    if( !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ){
        return {
            error: new Error('Invalid email address'),
            value: false
        };
    }
    if(!/^\d{4}-\d{2}-\d{2}$/.test(dob)){
        return {
            error: new Error('Invalid date of birth'),
            value: false
        };
    }
    return {
        error: null,
        value: true
    };
}