const CDP_PORT = Number(process.argv[2] || process.env.CDP_PORT || 9231);
const TARGET_URL = process.argv[3] || process.env.TARGET_URL || "file:///C:/Users/dhlee/dahye_ai_project/game/index.html";

let nextId = 1;

async function getTarget() {
  const targets = await fetch(`http://127.0.0.1:${CDP_PORT}/json`).then((response) => response.json());
  return targets.find((target) => target.url === TARGET_URL) || targets.find((target) => target.type === "page");
}

async function connect() {
  const target = await getTarget();
  if (!target?.webSocketDebuggerUrl) {
    throw new Error("Chrome debugging target was not found.");
  }

  const socket = new WebSocket(target.webSocketDebuggerUrl);
  const pending = new Map();

  socket.addEventListener("message", (event) => {
    const payload = JSON.parse(event.data);
    if (payload.id && pending.has(payload.id)) {
      const { resolve, reject } = pending.get(payload.id);
      pending.delete(payload.id);
      if (payload.error) reject(new Error(payload.error.message));
      else resolve(payload.result);
    }
  });

  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });

  function send(method, params = {}) {
    const id = nextId++;
    socket.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
  }

  return { socket, send };
}

async function evaluate(send, expression) {
  const result = await send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });

  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
  }

  return result.result.value;
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
  console.log(`OK ${message}`);
}

async function run() {
  const { socket, send } = await connect();

  await send("Runtime.enable");
  await send("Page.enable");
  await send("Page.navigate", { url: TARGET_URL });
  await new Promise((resolve) => setTimeout(resolve, 1500));

  await evaluate(send, `localStorage.clear();`);

  const initialGameCount = await evaluate(send, `document.querySelectorAll('.game-card').length`);
  assert(initialGameCount === 4, "game list renders 4 cards");

  const favoriteSaved = await evaluate(send, `
    document.querySelector('[data-action="toggle-favorite"][data-game-id="charades"]').click();
    JSON.parse(localStorage.getItem('keywordGame.favorites')).includes('charades');
  `);
  assert(favoriteSaved, "favorite saves to localStorage");

  const favoriteVisible = await evaluate(send, `
    document.querySelector('[data-action="toggle-favorite"][data-game-id="charades"]').classList.contains('is-on');
  `);
  assert(favoriteVisible, "favorite state reflects localStorage");

  const gameStarted = await evaluate(send, `
    document.querySelector('[data-action="select-game"][data-game-id="silent-shout"]').click();
    document.querySelector('#mix-easy').value = '2';
    document.querySelector('#mix-normal').value = '2';
    document.querySelector('#mix-hard').value = '2';
    document.querySelector('#mix-hard').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#time-mode').value = 'stopwatch';
    document.querySelector('#time-mode').dispatchEvent(new Event('change', { bubbles: true }));
    document.querySelector('#setup-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    document.querySelector('#play-view').classList.contains('is-visible') && document.querySelector('#keyword').textContent.length > 0;
  `);
  assert(gameStarted, "game starts with real dictionary data");

  const resultSaved = await evaluate(send, `
    for (const key of ['o', 'Enter', 'x', 'Backspace', 'ArrowRight', 'ArrowRight']) {
      document.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true }));
    }
    JSON.parse(localStorage.getItem('keywordGame.history')).length === 1 &&
      JSON.parse(localStorage.getItem('keywordGame.history'))[0].correct === 2 &&
      JSON.parse(localStorage.getItem('keywordGame.history'))[0].wrong === 2 &&
      JSON.parse(localStorage.getItem('keywordGame.history'))[0].passed === 2 &&
      JSON.parse(localStorage.getItem('keywordGame.history'))[0].words.length === 6 &&
      document.querySelector('#result-view').classList.contains('is-visible');
  `);
  assert(resultSaved, "keyboard shortcuts save O/X and ArrowRight Pass history");

  const previousAndResetWork = await evaluate(send, `
    document.querySelector('[data-view-target="home"]').click();
    document.querySelector('[data-action="select-game"][data-game-id="silent-shout"]').click();
    document.querySelector('#mix-easy').value = '1';
    document.querySelector('#mix-normal').value = '1';
    document.querySelector('#mix-hard').value = '1';
    document.querySelector('#mix-hard').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#time-mode').value = 'stopwatch';
    document.querySelector('#time-mode').dispatchEvent(new Event('change', { bubbles: true }));
    document.querySelector('#setup-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    const firstWord = document.querySelector('#keyword').textContent;
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    const returnedToFirst = document.querySelector('#play-progress').textContent.trim() === '1 / 3';
    document.querySelector('[data-action="reset-words"]').click();
    returnedToFirst && document.querySelector('#play-view').classList.contains('is-visible') && document.querySelector('#keyword').textContent.length > 0;
  `);
  assert(previousAndResetWork, "ArrowLeft previous and reset words work");

  const mixedSetupWorks = await evaluate(send, `
    document.querySelector('[data-view-target="home"]').click();
    document.querySelector('[data-action="select-game"][data-game-id="charades"]').click();
    document.querySelector('input[name="difficulty"][value="mixed"]').click();
    document.querySelector('input[name="difficulty"][value="mixed"]').dispatchEvent(new Event('change', { bubbles: true }));
    document.querySelector('#mix-easy').value = '1';
    document.querySelector('#mix-normal').value = '1';
    document.querySelector('#mix-hard').value = '1';
    document.querySelector('#mix-hard').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#setup-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    state.activeSession.words.length === 3 && state.activeSession.difficulty === 'mixed';
  `);
  assert(mixedSetupWorks, "mixed difficulty count setup works");

  const titleUpdated = await evaluate(send, `
    document.querySelector('[data-view-target="mypage"]').click();
    const input = document.querySelector('[data-action="update-history-title"]');
    input.value = '테스트 기록';
    input.dispatchEvent(new Event('input', { bubbles: true }));
    JSON.parse(localStorage.getItem('keywordGame.history'))[0].title === '테스트 기록';
  `);
  assert(titleUpdated, "history title update saves");

  const directFinishSaved = await evaluate(send, `
    document.querySelector('[data-view-target="home"]').click();
    document.querySelector('[data-action="select-game"][data-game-id="charades"]').click();
    document.querySelector('#mix-easy').value = '1';
    document.querySelector('#mix-normal').value = '1';
    document.querySelector('#mix-hard').value = '0';
    document.querySelector('#mix-hard').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#time-mode').value = 'stopwatch';
    document.querySelector('#time-mode').dispatchEvent(new Event('change', { bubbles: true }));
    document.querySelector('#setup-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    document.querySelector('[data-action="finish-game"]').click();
    JSON.parse(localStorage.getItem('keywordGame.history'))[0].reason === '직접 종료' &&
      JSON.parse(localStorage.getItem('keywordGame.history'))[0].unplayed === 2;
  `);
  assert(directFinishSaved, "direct finish saves unplayed words");

  const historyDeleted = await evaluate(send, `
    document.querySelector('[data-view-target="mypage"]').click();
    document.querySelector('[data-action="delete-history"]').click();
    JSON.parse(localStorage.getItem('keywordGame.history')).length === 1;
  `);
  assert(historyDeleted, "single history delete works");

  const timerDecreases = await evaluate(send, `
    document.querySelector('[data-view-target="home"]').click();
    document.querySelector('[data-action="select-game"][data-game-id="telestrations"]').click();
    document.querySelector('#mix-easy').value = '1';
    document.querySelector('#mix-normal').value = '1';
    document.querySelector('#mix-hard').value = '0';
    document.querySelector('#mix-hard').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#time-mode').value = 'timer';
    document.querySelector('#time-mode').dispatchEvent(new Event('change', { bubbles: true }));
    document.querySelector('#timer-seconds').value = '15';
    document.querySelector('#setup-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    new Promise((resolve) => setTimeout(() => {
      const value = document.querySelector('#play-clock').textContent;
      document.querySelector('[data-action="finish-game"]').click();
      resolve(value === '00:14' || value === '00:13');
    }, 1250));
  `);
  assert(timerDecreases, "timer mode decreases time");

  const timerAutoEnds = await evaluate(send, `
    document.querySelector('[data-view-target="home"]').click();
    document.querySelector('[data-action="select-game"][data-game-id="telestrations"]').click();
    document.querySelector('#mix-easy').value = '1';
    document.querySelector('#mix-normal').value = '1';
    document.querySelector('#mix-hard').value = '0';
    document.querySelector('#mix-hard').dispatchEvent(new Event('input', { bubbles: true }));
    document.querySelector('#time-mode').value = 'timer';
    document.querySelector('#time-mode').dispatchEvent(new Event('change', { bubbles: true }));
    document.querySelector('#timer-seconds').value = '15';
    document.querySelector('#setup-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    state.activeSession.totalSeconds = 1;
    new Promise((resolve) => setTimeout(() => {
      const historyItems = JSON.parse(localStorage.getItem('keywordGame.history'));
      resolve(
        document.querySelector('#result-view').classList.contains('is-visible') &&
        historyItems[0].reason === '타이머 종료'
      );
    }, 1250));
  `);
  assert(timerAutoEnds, "timer auto-end saves result");

  const cleared = await evaluate(send, `
    document.querySelector('[data-view-target="mypage"]').click();
    document.querySelector('[data-action="clear-history"]').click();
    JSON.parse(localStorage.getItem('keywordGame.history')).length === 0;
  `);
  assert(cleared, "clear history works");

  socket.close();
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
