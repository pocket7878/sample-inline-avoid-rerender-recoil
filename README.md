# sample-inline-form-recoil

サーバーから一つのエンドポイントで取得したプロフィールの各項目を、Recoilでデータ管理をして独立したインラインフォームで更新するサンプルです。

## 背景

サーバーからは、プロフィール取得APIと、プロフィールの更新APIが公開されている状況を想定しており、json-serverでモックしています.
そういった状況で、プロフィールの取得をAPIから実施して、各フィールドをインラインフォームで更新するUIを想定しています。

## 実装

インラインフォームとしては、複数のフォームを編集した後に順番にサブミットされた場合にも動くように、
どれか1つをサブミットしても他のフィールドの編集状況はキープされてほしいです。

また、個別のフィールドで独立してプロフィール取得APIを叩くようにしてしまうと、
ページのロード時のサーバーとの通信回数がフィールド数に比例して増えてしまうのでそれも避けたいです。

![スクリーンショット 2021-06-27 22 15 29](https://user-images.githubusercontent.com/236528/123545867-46089a80-d795-11eb-987f-33c7dfc5d106.png)

プロフィール取得をRecoilの[useRecoilValueLoadable](https://recoiljs.org/docs/api-reference/core/useRecoilValueLoadable/)で単純に実施すると、
サーバーにサブミットする度に、インラインフォームがDOMから外されてしまって編集内容が失なわれてしまいます。
そこで

- loadableの結果をuseStateにキャッシュする
- Suspenseを利用してfallbackし、DOMから取りのぞかれるのではなくdisplay: noneにされるようにする

のどちらかの方式を採用すると動かせそうでした。

```ts
export const useCachedRecoilValueLoadableSelector = <S, T>(loadable: Loadable<S>, fn: (arg0: S) => T) => {
  const [value, setValue] = useState<T | undefined>(undefined);
  useEffect(() => {
    if (loadable.state === "hasValue") {
      setValue(fn(loadable.contents));
    }
  }, [loadable.state, loadable.contents, fn]);

  return value;
};
```

## Usage

まずAPIのモックのjson-serverをポート3001番で起動します。

```
yarn start-json-server
```

次に、Reactのアプリを起動します

```
yarn start
```