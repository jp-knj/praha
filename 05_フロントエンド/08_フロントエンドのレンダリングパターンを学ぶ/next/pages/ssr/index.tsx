import { GetServerSideProps } from "next";
import { useCallback, useEffect, useRef, useState } from "react";
import { useCounter, usePrevious, SomeComponent } from "../index";

type Props = {
  subscribers?: number;
  stars?: number;
};

const SSR = (props: Props) => {
  const [count, handleCountClick] = useCounter();
  const { current, handleFlagClick } = usePrevious(count);

  const handleClick = useCallback(() => {
    handleFlagClick();
    handleCountClick();
  }, [handleCountClick, handleFlagClick]);

  return (
    <>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button onClick={handleClick}>レンダリング！</button>
      <SomeComponent  current={current} />
      <div>
        <p>ここにReactのGitHubレポジトリに付いたスターの数を表示してみよう</p>
        <p>{props.stars} stars</p>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // APIやDBからのデータ取得処理などを記載
  const res = await fetch("https://api.github.com/repos/facebook/react");
  const response = await res.json();
  const { watchers, subscribers_count } = response;

  const props: Props = {
    subscribers: subscribers_count,
    stars: watchers
  };

  return {
    props: props,
  };
};

export default SSR