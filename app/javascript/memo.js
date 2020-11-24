function memo() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/posts", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        // エラー用
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const item = XHR.response.post;
      // レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");
      // HTMLを描画する場所を指定する際に使用する描画する親要素listを取得
      const formText = document.getElementById("content");
      // メモの入力フォームをリセットするため、
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
        // メモとして描画するHTMLの部分
      list.insertAdjacentHTML("afterend", HTML);
      // list要素に対して、HTMLを追加し、afterendでlistの直後に挿入
      formText.value = "";
      // メモの入力フォームに入力されたままの文字はリセット
    };
    e.preventDefault();
  });
}
window.addEventListener("load", memo);