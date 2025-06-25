local prompts = {
  [==[ddd ddd]==],
  [==[ddd ggg]==],
  [==[ddd hhh]==],
}

hs.hotkey.bind({"cmd", "alt", "ctrl"}, "M", function()
  hs.alert.show("🚀 Sending prompts to Discord...")
  for i, prompt in ipairs(prompts) do
    hs.eventtap.keyStrokes("/imagine")
    hs.timer.usleep(300000)
    hs.eventtap.keyStroke({}, "return")
    hs.timer.usleep(300000)
    hs.eventtap.keyStrokes(prompt)
    hs.timer.usleep(300000)
    hs.eventtap.keyStroke({}, "return")
    hs.timer.usleep(3000000)
  end
  hs.alert.show("✅ All prompts sent!")
end)