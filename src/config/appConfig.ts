import * as dotenv from 'dotenv'
dotenv.config();

const appConfig = {

    PORT: Number(process.env.PORT) || 3000

}

export default appConfig