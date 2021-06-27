import React, { Fragment, memo, Suspense } from 'react';
import { useCallback } from 'react';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';
import { useSetInvalidateRecoilValue } from './utils';
import { getProfile, updateEmail, updateName } from './api';

const requestIDState = atom({
  key: 'SuspenseLoadRequestID',
  default: 0,
});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const userProfile = selector({
  key: 'SuspenseLoadUserProfile',
  get: async ({get}) => {
    await sleep(1000);
    get(requestIDState);
    const profile = await getProfile()
    return profile;
  },
});

export default function SuspenseLoadForms() {
  return (
    <Fragment>
      <h1>Suspense loadable</h1>
      <Suspense fallback={<Fallback/>}>
        <Component/>
      </Suspense>
    </Fragment>
  );
}

function Fallback() {
  return <div>Loading...</div>
}

const Component = memo(function Component() {
  const invalidate = useSetInvalidateRecoilValue(requestIDState);

  const handleSubmitName = useCallback((name: string) => {
    updateName(name)
    invalidate();
  },[invalidate]);

  const handleSubmitEmail = useCallback((email: string) => {
    updateEmail(email)
    invalidate();
  },[invalidate]);

  const driverProfile = useRecoilValue(userProfile);
  
  return (
    <Fragment>
      <InlineForm title="suspense_name" initialValue={driverProfile.name} onSubmit={handleSubmitName} />
      <InlineForm title="suspense_email" initialValue={driverProfile.email} onSubmit={handleSubmitEmail} />
    </Fragment>
  );
});

