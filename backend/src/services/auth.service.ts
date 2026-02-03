export type CreateAccountParams = {
  email: string;
  password: string;
  authAgent?: string;
};

export const createAccount = async (data: CreateAccountParams) => {
  // verify existing user doesnt exist
  // create user
  // create verification code
  // send verifaction email
  // create session
  // sign access token & refresh token
  // return user & tokens
};
