import React, { Fragment } from 'react';
import { useCallback } from 'react';
import { atom, selector, useRecoilValueLoadable } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';
import { useSetInvalidateRecoilValue, useCachedRecoilValueLoadableSelector } from './utils';
import { getProfile, updateEmail, updateName } from './api';

const requestIDState = atom({
  key: 'CachedLoadRequestID',
  default: 0,
});

const userProfile = selector({
  key: 'CachedLoadUserProfile',
  get: async ({get}) => {
    get(requestIDState);
    const profile = await getProfile()
    return profile;
  },
});

export default function CachedLoadForms() {
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

  const initialName = useCachedRecoilValueLoadableSelector(loadable, (profile) => {
    return profile.name;
  });
  const initialEmail = useCachedRecoilValueLoadableSelector(loadable, (profile) => {
    return profile.email;
  });

  return (
    <Fragment>
      <h1>Cached loadable</h1>
      {initialName &&
          <InlineForm title="cached_name" initialValue={initialName} onSubmit={handleSubmitName} />
      }
      {initialEmail &&
          <InlineForm title="cached_email" initialValue={initialEmail} onSubmit={handleSubmitEmail} />
      }
    </Fragment>
  );
}
