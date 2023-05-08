import { Octokit } from "https://cdn.skypack.dev/@octokit/core?dts";

// TODO GitHub上でTokenの作成が必要
const TOKEN = "GitHub上で作成したTokenをここにコピペする";
const octokit = new Octokit({auth: TOKEN});

const fetchUser = async (name) => {
  // @see https://docs.github.com/ja/rest/users/users?apiVersion=2022-11-28#get-the-authenticated-user
  // GitHub APIのドキュメントに従ってAPIをコールする
  const res = await octokit.request(`GET /users/${name}`, {
    username: 'USERNAME',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });
  // 取得できたデータを使って画面を更新する
  updateView(res);
}

const updateView = (res) => {
  // ユーザーネーム
  const username = document.getElementById("username");
  username.textContent = res.data.login;
  // 紹介文
  const biography = document.getElementById("biography");
  biography.textContent = res.data.bio;
  // リンク
  const link = document.getElementById("link");
  link.textContent = res.data.html_url;
  link.href = res.data.html_url;
  // 画像
  const avator = document.getElementById("avator");
  avator.src = res.data.avatar_url;
}

const button = document.getElementById("button");
const input = document.getElementById("input");
button.addEventListener("click", () => fetchUser(input.value));
