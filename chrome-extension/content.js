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

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'PROMPT_LIST') {
    const prompts = msg.prompts;
    const delay = 3000;

    const insertPrompt = (prompt) => {
      const inputBox = document.querySelector(
        'div[data-slate-editor="true"][contenteditable="true"][aria-label^="Message"]'
      );

      if (!inputBox) {
        console.error('❌ 输入框没找到，请确认在 Discord 文本频道');
        return;
      }

      inputBox.focus();
      inputBox.innerHTML = '';
      inputBox.textContent = prompt;

      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(inputBox);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);

      inputBox.dispatchEvent(new InputEvent('input', {
        bubbles: true,
        inputType: 'insertText',
        data: prompt
      }));

      console.log('📝 已插入 prompt，请手动输入 /imagine 并粘贴:', prompt);
    };

    prompts.forEach((prompt, i) => {
      setTimeout(() => insertPrompt(prompt), i * delay);
    });
  }
});