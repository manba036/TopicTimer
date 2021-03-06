# Topic Timer

ミーティングやプレゼンテーションでのタイムキーピングのためのアプリです。  
決められた時間通りに物事を進めたいという場合にご活用ください。

## Usage

「分:秒,トピック名」の形式でトピックを入力します。

```text
5:00,前回MTGの振り返り
15:00,話し合い
```

「秒」と「トピック名」は省略可能です。

```text
5,前回MTGの振り返り
15
```

タイマーが動いている間はトピック入力できません。  
トピック情報を入力する場合はタイマーを止めてください。

タイマー画面で Tab キーを何回か押すと画面中央の「メモ入力」にフォーカスが当たりますので、そこで Enter キーを押すと、メモ入力できます。  
「メモ入力」を直接マウスでクリックしてもメモ入力できます。  
メモ入力中に Enter キーまたは Esc キーを押すか、メモ入力エリア外をクリックするとメモ入力が完了します。  
入力されたメモ情報は、経過時間やトピック名と共に記録されます。  
記録されているメモ情報はメモ画面で確認できます。

入力されたトピック情報は localStorage に保持されます。  
削除したい場合はトピック画面の入力エリアを空にしてください。

入力されたメモ情報も localStorage に保持されます。  
削除したい場合はメモ画面の入力エリアを空にしてください。

タイマー画面で Tab キーを何回か押すと 前 → 開始/停止 → 次 と順番にフォーカスが当たりますので、Enter キーを押すと、タイマーを操作できます。  
直接マウスでクリックしてもタイマーを操作できます。

タイマー画面右下のサウンド設定が ON になっていると、残り時間が 03:00※, 01:00, 00:00 になったときに音が鳴ります。  
時間オーバーになった場合は 1 分毎に音が鳴ります。

※03:00 の音は予定時間が 06:00 以上の場合に有効

---

## manba036 追記 for Ubuntu

[Node.js 公式ページ](https://nodejs.org/ja/download/package-manager/#debian-and-ubuntu-based-linux-distributions-enterprise-linux-fedora-and-snap-packages)などを参考にして、TopicTimer の実行環境を構築します。

```bash
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs

git clone https://github.com/manba036/TopicTimer
cd TopicTimer

npm install
```

## manba036 追記 for Windows

[Node.js 公式ページ](https://nodejs.org/ja/download/)から Node.js 12.x をダウンロードしてインストールします。  
[TopicTimer](https://github.com/manba036/TopicTimer)を git clone または zip をダウンロード＆解凍するなどします。  
スタートメニューから"Node.js"→"Node.js command prompt"を起動して、TopicTimer の実行環境を構築します。

```bash
cd TopicTimer

npm install
```

## manba036 追記 for Ubuntu / Windows 共通

### 開発時

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### 正式運用時

```bash
npm install serve -g
npm run build
serve -s ./build
```

Open [http://localhost:5000](http://localhost:5000) to view it in the browser.

## 以上
