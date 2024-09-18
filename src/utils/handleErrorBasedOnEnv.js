// env variable
import { ENV_MODE } from "../env/env"

const handleErrorBasedOnEnv = (message, draft) => {
  if (ENV_MODE !== 'dev') {
    console.warn(message)

    if (draft)
      return draft

    // TODO: provide user feedback
  }

  throw new Error(message)
}

export default handleErrorBasedOnEnv
