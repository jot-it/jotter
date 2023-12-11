/**
 * Get an environment variable, if it doesn't exist throws an error
 * with the variable name.
 *
 * This ensures an error is thrown when accessing `undefined` environment variables
 *
 * @returns getter function
 */
function env(name: string, value?: string): () => string {
  if (!value) {
    throw new Error(`${name} is not set in environment variables`);
  }
  return () => value;
}

// Register all environment variables below and export their corresponding getter function
export const getCollabServerURL = env(
  "NEXT_PUBLIC_COLLAB_SERVER_URL",
  process.env.NEXT_PUBLIC_COLLAB_SERVER_URL,
);
