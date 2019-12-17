var React = require('react');
var Page = require('./Page.jsx').Page;
var Nav = require('./Nav.jsx');

module.exports = React.createClass({
  render: function() {
    return (
      <Page name='usage'>
        <Nav current='usage' />
        <div className='pageContent'>
          <h2>Usage</h2>
          <p>「分:秒,トピック名」の形式でトピックを入力します。</p>
          <code>5:00,前回MTGの振り返り<br/>15:00,話し合い</code>
          <p>「秒」と「トピック名」は省略可能です。</p>
          <code>5,前回MTGの振り返り<br/>15</code>
          <p>タイマーが動いている間はトピック入力できません。トピック情報を入力する場合はタイマーを止めてください。</p>
          <p>タイマー画面でTabキーを2回押すと、メモが入力できます。タイマー画面中央の「メモ入力」をマウスでクリックしても同様にメモが入力できます。</p>
          <p>メモ入力中にEnterキーまたはEscキーを押すか、メモ入力エリア外をクリックするとメモ入力が完了します。</p>
          <p>入力されたメモ情報は、経過時間やトピック名と共に記録されます。記録されているメモ情報は入力エリアで確認できます。</p>
          <p>入力されたトピック情報／メモ情報は localStorage に保持されます。削除したい場合は入力エリアを空にして保存してください。</p>
          <p>タイマー画面右下のサウンド設定が ON (<i className='bellOn' />) になっていると、残り時間が 03:00※, 01:00, 00:00 になったときに音が鳴ります。時間オーバーになった場合は1分毎に音が鳴ります。</p>
          <p className='notes'>※03:00の音は予定時間が06:00以上の場合に有効</p>
        </div>
      </Page>
    );
  }
});
