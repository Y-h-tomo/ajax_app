function check() {
  const posts = document.querySelectorAll(".post");
  // postをクラス名にもつ要素を取得
  posts.forEach(function (post) {
    // それぞれの要素へ処理を記述する場所を用意
    if (post.getAttribute("data-load") != null) {
      // 重複したイベント処理が行われないように条件分岐(イベントおきている要素はまだtrueではない）
      return null;　　　     // JSの処理から抜ける（これ以下の処理をしないため）
    }
    post.setAttribute("data-load", "true");
   　　　 // 要素にdata-load = "true"と属性を追加
    post.addEventListener("click", () => {
      // addEventListenerで引数にクリックを指定
        const postId = post.getAttribute("data-id");
        // メモのidを取得
        const XHR = new XMLHttpRequest();
        // オブジェクトを生成
        XHR.open("GET", `/posts/${postId}`, true);
        // openメソッドを使用してリクエストの詳細を指定
        XHR.responseType = "json";
        // 　レスポンスの形式を指定
        XHR.send();
        // リクエストを送信
        XHR.onload = () => {
          // エラーかどうかをチェック
          if (XHR.status != 200) {
            // レスポンス200で正常処理なので、それ以外はエラー
            alert(`Error ${XHR.status}: ${XHR.statusText}`);
            // オブジェクトに含まれるエラーメッセージを表示
            return null;
            // JSの処理から抜ける（これ以下の処理をしないため）
          }
          // レスポンスなどの受診が成功した場合に呼び出されるもの
          const item = XHR.response.post;
          // レスポンスされてきたJSONにアクセスするため
          if (item.checked === true) {
            post.setAttribute("data-check", "true");
          } else if (item.checked === false) {
            post.removeAttribute("data-check");
          }
        };
    });
  });
}
setInterval(check, 1000);
// 1000ミリ秒ごとにcheck関数を実行する