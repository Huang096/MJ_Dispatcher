// Copyright 2025 huangzheheng
// 
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     https://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

document.getElementById("submitBtn").onclick = async () => {
  const imgUrl = document.getElementById("imgUrl").value.trim();
  const promptLines = document.getElementById("prompts").value.trim().split("\n").filter(Boolean);

  // 拼接：如果提供了图片链接 → 每行加上
  const prompts = promptLines.map(p => imgUrl ? `${imgUrl} ${p}` : p);

  const res = await fetch("/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompts })
  });

  const msg = await res.text();
  document.getElementById("status").textContent = msg;
};

