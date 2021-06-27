import React, { Fragment, memo, Suspense } from 'react';
import { useCallback } from 'react';
import { atom, selector, useRecoilValue, useSetRecoilState } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';

const requestIDState = atom({
  key: 'SuspenseLoadRequestID',
  default: 0,
});

const userName = atom({
  key: 'SuspenseLoadUserName',
  default: '田中太郎'
});

const userEmail = atom({
  key: 'SuspenseLoadUserEmail',
  default: 'sample@example.com'
});

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const userProfile = selector({
  key: 'SuspenseLoadUserProfile',
  get: async ({get}) => {
    await sleep(1000);
    get(requestIDState);
    const name = get(userName);
    const email = get(userEmail);
    console.log("SuspenseLoadUserProfile reload");
    return {
      name: name,
      email: email,
    };
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
  const setUserName = useSetRecoilState(userName);
  const setUserEmail = useSetRecoilState(userEmail);

  const handleSubmitName = useCallback((name: string) => {
    setUserName(name);
  },[setUserName]);

  const handleSubmitEmail = useCallback((email: string) => {
    setUserEmail(email);
  },[setUserEmail]);

  const driverProfile = useRecoilValue(userProfile);
  
  return (
    <Fragment>
      <InlineForm title="suspense_name" initialValue={driverProfile.name} onSubmit={handleSubmitName} />
      <InlineForm title="suspense_email" initialValue={driverProfile.email} onSubmit={handleSubmitEmail} />
    </Fragment>
  );
});

