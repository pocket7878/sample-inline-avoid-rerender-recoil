import React, { Fragment } from 'react';
import { useCallback } from 'react';
import { atom, selector, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';

const requestIDState = atom({
  key: 'SeparateRequestID',
  default: 0,
});

const userName = atom({
  key: 'SeparateUserName',
  default: '田中太郎'
});

const userEmail = atom({
  key: 'SeparateUserEmail',
  default: 'sample@example.com'
});

const userProfile = selector({
  key: 'SeparateUserProfile',
  get: async ({get}) => {
    get(requestIDState);
    const name = get(userName);
    const email = get(userEmail);
    console.log("SeparateUserProfile reload");
    return {
      name: name,
      email: email,
    };
  },
});

export default function SeparateLoadForms() {
  const setUserName = useSetRecoilState(userName);
  const setUserEmail = useSetRecoilState(userEmail);

  const handleSubmitName = useCallback((name: string) => {
    setUserName(name);
  },[setUserName]);

  const handleSubmitEmail = useCallback((email: string) => {
    setUserEmail(email);
  },[setUserEmail]);

  const loadable = useRecoilValueLoadable(userProfile);

  return (
    <Fragment>
      <h1>Separate load</h1>
      {loadable.state === "hasValue" &&
          <InlineForm title="separate_name" initialValue={loadable.contents.name} onSubmit={handleSubmitName} />
      }
      {loadable.state === "hasValue" &&
          <InlineForm title="separate_email" initialValue={loadable.contents.email} onSubmit={handleSubmitEmail} />
      }
    </Fragment>
  );
}
