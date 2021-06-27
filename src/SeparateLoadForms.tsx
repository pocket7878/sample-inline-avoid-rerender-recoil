import React, { Fragment } from 'react';
import { useCallback } from 'react';
import { atom, selector, useRecoilValueLoadable } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';
import { useSetInvalidateRecoilValue } from './utils';
import { getProfile, updateEmail, updateName } from './api';

const requestIDState = atom({
  key: 'SeparateRequestID',
  default: 0,
});

const userProfile = selector({
  key: 'SeparateUserProfile',
  get: async ({get}) => {
    get(requestIDState);
    const profile = await getProfile()
    return profile;
  },
});

export default function SeparateLoadForms() {
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
