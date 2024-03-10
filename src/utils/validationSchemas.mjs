export const createUserValidationSchemas = {
    username: {
        isLength: {
            options:{
                min : 5,
                max : 10
            },
            errorMessage: "Username must be at least 5 characters with a max of 10 chacracters "
        },

        notEmpty : {
            errorMessage: "Username can't be Empty"
        },
        isString : {
            errorMessage: "Username must be a String!"
        }
    },
    password: {
        notEmpty: true
    }
}