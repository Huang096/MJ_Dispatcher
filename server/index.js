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

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../web-ui')));

app.post('/generate', (req, res) => {
  const prompts = req.body.prompts || [];
  const luaLines = [
    'local prompts = {',
    ...prompts.map(p => `  [==[${p}]==],`),
    '}',
    '',
    'hs.hotkey.bind({"cmd", "alt", "ctrl"}, "M", function()',
    '  hs.alert.show("🚀 Sending prompts to Discord...")',
    '  for i, prompt in ipairs(prompts) do',
    '    hs.eventtap.keyStrokes("/imagine")',
    '    hs.timer.usleep(300000)',
    '    hs.eventtap.keyStroke({}, "return")',
    '    hs.timer.usleep(300000)',
    '    hs.eventtap.keyStrokes(prompt)',
    '    hs.timer.usleep(300000)',
    '    hs.eventtap.keyStroke({}, "return")',
    '    hs.timer.usleep(3000000)',
    '  end',
    '  hs.alert.show("✅ All prompts sent!")',
    'end)'
  ];

  const targetPath = path.join(process.env.HOME, '.hammerspoon/init.lua');
  console.log('📍 正在写入 Lua 文件到:', targetPath);

  fs.writeFileSync(
    path.join(process.env.HOME, '.hammerspoon/init.lua'),
    luaLines.join('\n'),
    'utf8'
    );

  res.send('✅ 成功生成 Hammerspoon 脚本！请点击 Reload Config 后按 ⌘⌥⌃M');
});

const PORT = 12345;
app.listen(PORT, () => console.log(`🟢 服务器运行中：http://localhost:${PORT}`));
