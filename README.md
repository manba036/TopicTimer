# [Topic Timer](http://hotolab.net/TopicTimer/)

ミーティングやプレゼンテーションでのタイムキーピングのためのアプリです。
決められた時間通りに物事を進めたいという場合にご活用ください。

## Usage

「分:秒 トピック名」の形式でトピックを入力します。

```text
5:00 前回MTGの振り返り
15:00 話し合い
```

「秒」と「トピック名」は省略可能です。

```text
5 前回MTGの振り返り
15
```

入力されたトピック情報は Cookie に保持されます。削除したい場合は入力エリアを空にして保存してください。

タイマー画面右下のサウンド設定が ON になっていると、残り時間が 00:00 になったときに音が鳴ります。

___

## manba036追記 for Ubuntu

[Node.js公式ページ](https://nodejs.org/ja/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)などを参考にして、TopicTimerの実行環境を構築します。

```bash
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install -D
npx gulp build
```

___