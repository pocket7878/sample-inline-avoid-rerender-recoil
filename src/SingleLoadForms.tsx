import React, { Fragment } from 'react';
import { useCallback } from 'react';
import { atom, selector, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';

const requestIDState = atom({
  key: 'SingleRequestID',
  default: 0,
});

const userName = atom({
  key: 'SingleUserName',
  default: '田中太郎'
});

const userEmail = atom({
  key: 'SingleUserEmail',
  default: 'sample@example.com'
});

const userProfile = selector({
  key: 'SingleUserProfile',
  get: async ({get}) => {
    get(requestIDState);
    const name = get(userName);
    const email = get(userEmail);
    console.log(`SeparateUserProfile reload: ${name}, ${email}`);
    return {
      name: name,
      email: email,
    };
  },
});

export default function SingleLoadForms() {
  const setUserName = useSetRecoilState(userName);
  const setUserEmail = useSetRecoilState(userEmail);

  const handleSubmitName = useCallback((name: string) => {
    console.log(`Set Single Load UserName to: ${name}`);
    setUserName(name);
  },[setUserName]);

  const handleSubmitEmail = useCallback((email: string) => {
    console.log(`Set Single Load UserEmail to: ${email}`);
    setUserEmail(email);
  },[setUserEmail]);

  const loadable = useRecoilValueLoadable(userProfile);

  return (
    <Fragment>
      <h1>Single load Forms</h1>
      {loadable.state === "hasValue" &&
        <Fragment>
          <InlineForm title="name" initialValue={loadable.contents.name} onSubmit={handleSubmitName} />
          <InlineForm title="email" initialValue={loadable.contents.email} onSubmit={handleSubmitEmail} />
        </Fragment>
      }
    </Fragment>
  );
}