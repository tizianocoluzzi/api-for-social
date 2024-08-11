import {allowedOrigins} from '../config/allowedOrigins.js';

export const corsOptions = {
    origin: (origin, callback)=>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin){
            callback(null, true);
        }
        else{
            callback(new Error('not allowed by Cors'));
        }
    },
    optionSuccessStatus: 200,
}
