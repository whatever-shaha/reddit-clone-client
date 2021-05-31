import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  repeatNewPassword: Scalars['String'];
  token?: Maybe<Scalars['String']>;
  currentPassword?: Maybe<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  updatePost?: Maybe<Post>;
  deletePost?: Maybe<Scalars['Boolean']>;
  clearPosts: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  passwordRecovery: Scalars['Boolean'];
  passwordChange: UserResponse;
  logout: Scalars['Boolean'];
  clearUsers: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  body: Scalars['String'];
  title: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  body?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationRegisterArgs = {
  options: WithEmailInput;
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};


export type MutationPasswordRecoveryArgs = {
  usernameOrEmail: Scalars['String'];
};


export type MutationPasswordChangeArgs = {
  options: ChangePasswordInput;
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  title: Scalars['String'];
  body: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  posts: Array<Post>;
  post: Post;
  me?: Maybe<User>;
  isTokenValid: Scalars['Boolean'];
  users: Array<User>;
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryIsTokenValidArgs = {
  token: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  error?: Maybe<FieldError>;
  user?: Maybe<User>;
};

export type WithEmailInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};

export type UserFieldsFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'username'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFieldsFragment
    )> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type PasswordChangeMutationVariables = Exact<{
  options: ChangePasswordInput;
}>;


export type PasswordChangeMutation = (
  { __typename?: 'Mutation' }
  & { passwordChange: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & UserFieldsFragment
    )>, error?: Maybe<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type PasswordRecoveryMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
}>;


export type PasswordRecoveryMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'passwordRecovery'>
);

export type RegisterMutationVariables = Exact<{
  options: WithEmailInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>>, user?: Maybe<(
      { __typename?: 'User' }
      & UserFieldsFragment
    )> }
  ) }
);

export type IsTokenValidQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type IsTokenValidQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isTokenValid'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & UserFieldsFragment
  )> }
);

export type PostsQueryVariables = Exact<{ [key: string]: never; }>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'body' | 'createdAt' | 'updatedAt'>
  )> }
);

export const UserFieldsFragmentDoc = gql`
    fragment userFields on User {
  id
  username
}
    `;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(usernameOrEmail: $usernameOrEmail, password: $password) {
    errors {
      field
      message
    }
    user {
      ...userFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const PasswordChangeDocument = gql`
    mutation PasswordChange($options: ChangePasswordInput!) {
  passwordChange(options: $options) {
    user {
      ...userFields
    }
    error {
      field
      message
    }
    errors {
      field
      message
    }
  }
}
    ${UserFieldsFragmentDoc}`;

export function usePasswordChangeMutation() {
  return Urql.useMutation<PasswordChangeMutation, PasswordChangeMutationVariables>(PasswordChangeDocument);
};
export const PasswordRecoveryDocument = gql`
    mutation PasswordRecovery($usernameOrEmail: String!) {
  passwordRecovery(usernameOrEmail: $usernameOrEmail)
}
    `;

export function usePasswordRecoveryMutation() {
  return Urql.useMutation<PasswordRecoveryMutation, PasswordRecoveryMutationVariables>(PasswordRecoveryDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: withEmailInput!) {
  register(options: $options) {
    errors {
      field
      message
    }
    user {
      ...userFields
    }
  }
}
    ${UserFieldsFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const IsTokenValidDocument = gql`
    query IsTokenValid($token: String!) {
  isTokenValid(token: $token)
}
    `;

export function useIsTokenValidQuery(options: Omit<Urql.UseQueryArgs<IsTokenValidQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<IsTokenValidQuery>({ query: IsTokenValidDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    ...userFields
  }
}
    ${UserFieldsFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const PostsDocument = gql`
    query Posts {
  posts {
    id
    title
    body
    createdAt
    updatedAt
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};