const fetchPost = async () => {
  // fetchメソッドでURI向けにリクエストを投げる
  // Web APIで情報を取得する処理は時間がかかるので、他の処理を邪魔しないように非同期処理(async、await)を使って受け取る
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");

  // 受け取ったresponseをjson形式に変換する
  // json形式にする処理も時間がかかるのでasync awaitを使って非同期処理を行う
  const json = await response.json();

  // jsonをコンソールに出力する
  console.log(json);
}

// 画面のボタンをクリックしたときにfetchPostを実行する
const button = document.getElementById("button");
button.addEventListener("click", fetchPost);
