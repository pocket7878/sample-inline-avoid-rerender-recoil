import React, { Fragment, useEffect, useState } from 'react';
import { useCallback } from 'react';
import { atom, Loadable, selector, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import './App.css';
import { InlineForm } from './InlineForm';

const requestIDState = atom({
  key: 'CachedLoadRequestID',
  default: 0,
});

const userName = atom({
  key: 'CachedLoadUserName',
  default: '田中太郎'
});

const userEmail = atom({
  key: 'CachedLoadUserEmail',
  default: 'sample@example.com'
});

const userProfile = selector({
  key: 'CachedLoadUserProfile',
  get: async ({get}) => {
    get(requestIDState);
    const name = get(userName);
    const email = get(userEmail);
    console.log("CachedLoadUserProfile reload");
    return {
      name: name,
      email: email,
    };
  },
});

const useCachedRecoilValueLoadableSelector = <S, T>(loadable: Loadable<S>, fn: (arg0: S) => T) => {
  const [value, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    if (loadable.state === "hasValue") {
      setValue(fn(loadable.contents));
    }
  }, [loadable.state, loadable.contents, fn]);

  return value;
};

export default function CachedLoadForms() {
  const setUserName = useSetRecoilState(userName);
  const setUserEmail = useSetRecoilState(userEmail);

  const handleSubmitName = useCallback((name: string) => {
    setUserName(name);
  },[setUserName]);

  const handleSubmitEmail = useCallback((email: string) => {
    setUserEmail(email);
  },[setUserEmail]);

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
