import { ENV_MODE } from "../config/env"

const printLogInDevMode = (str, ...vars) => {
  if (ENV_MODE === 'dev')
    console.log(str, ...vars)
}

export default printLogInDevMode
