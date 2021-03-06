/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Page from "./Page.jsx";
import Nav from "./Nav.jsx";

class Info extends React.Component {
  render() {
    return (
      <Page name="info">
        <Nav current="info" />
        <div className="pageContent">
          <h2>Info</h2>
          <h3>このアプリについて</h3>
          <p>
            Topic Timer
            は、ミーティングやプレゼンテーションでのタイムキーピングのためのアプリです。
            決められた時間通りに物事を進めたいという場合にご活用ください。
          </p>
          <h3>お問い合わせ</h3>
          <p>
            不具合・改善要望などありましたら、
            <a
              href="https://github.com/manba036/TopicTimer"
              target="_blank"
              tabIndex="-1"
            >
              GitHub
            </a>{" "}
            のIssueに書いてください。
          </p>
          <p>
            本家は
            <a
              href="https://github.com/hoto17296/TopicTimer"
              target="_blank"
              tabIndex="-1"
            >
              こちら
            </a>
            です。
          </p>
        </div>
      </Page>
    );
  }
}

export default Info;
