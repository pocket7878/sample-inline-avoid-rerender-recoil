import React, { Fragment } from 'react';
import { useCallback } from 'react';
import { atom, selector, useRecoilValueLoadable } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';
import { useSetInvalidateRecoilValue } from './utils';
import { getProfile, updateEmail, updateName } from './api';

const requestIDState = atom({
  key: 'SingleRequestID',
  default: 0,
});

const userProfile = selector({
  key: 'SingleUserProfile',
  get: async ({get}) => {
    get(requestIDState);
    const profile = await getProfile()
    return profile;
  },
});


export default function SingleLoadForms() {
  const invalidate = useSetInvalidateRecoilValue(requestIDState);

  const handleSubmitName = useCallback((name: string) => {
    updateName(name)
    invalidate();
  },[invalidate]);

  const handleSubmitEmail = useCallback((email: string) => {
    updateEmail(email)
    invalidate();
  },[invalidate]);

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