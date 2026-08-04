const STORAGE_KEYS = {
  favorites: "keywordGame.favorites",
  history: "keywordGame.history",
  soundEnabled: "keywordGame.soundEnabled",
};

const DIFFICULTIES = {
  easy: "초급",
  normal: "중급",
  hard: "상급",
  all: "전체",
  mixed: "섞기",
};

const DEFAULT_MIX = { easy: 3, normal: 3, hard: 4 };
const TIMER_PRESETS = [15, 30, 60, 120, 180, 300];
const dictionaries = window.KEYWORD_GAME_DICTIONARIES || {};
const WORD_DIFFICULTIES = ["easy", "normal", "hard"];
const WORD_DIFFICULTY_LABELS = {
  easy: "초급",
  normal: "중급",
  hard: "상급",
  all: "전체",
  mixed: "혼합",
};

const ICONS = {
  activity: '<path d="M22 12h-4l-3 8-6-16-3 8H2"/>',
  smile: '<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01"/><path d="M15 9h.01"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  pencil: '<path d="M17 3a2.85 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',
  gamepad: '<path d="M6 12h4"/><path d="M8 10v4"/><path d="M15 13h.01"/><path d="M18 11h.01"/><rect x="2" y="7" width="20" height="10" rx="5"/>',
  star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z"/>',
  "star-fill": '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9L12 3Z" fill="currentColor"/>',
  left: '<path d="m15 18-6-6 6-6"/>',
  right: '<path d="m9 18 6-6-6-6"/>',
  minus: '<path d="M5 12h14"/>',
  plus: '<path d="M12 5v14"/><path d="M5 12h14"/>',
  refresh: '<path d="M21 12a9 9 0 0 1-15.5 6.2"/><path d="M3 12A9 9 0 0 1 18.5 5.8"/><path d="M18 2v4h4"/><path d="M6 22v-4H2"/>',
  infinity: '<path d="M6.5 15C4 15 2 13.5 2 12s2-3 4.5-3c3.5 0 4.5 6 8 6C17 15 22 13.5 22 12s-5-3-7.5-3c-3.5 0-4.5 6-8 6Z"/>',
  timer: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2 2"/><path d="M9 2h6"/>',
  stopwatch: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4"/><path d="M9 2h6"/><path d="m17 5 1.5-1.5"/>',
  play: '<path d="m8 5 11 7-11 7V5Z" fill="currentColor"/>',
  flag: '<path d="M5 22V4"/><path d="M5 4h12l-1 4 1 4H5"/>',
  check: '<path d="m20 6-11 11-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  skip: '<path d="m5 6 8 6-8 6V6Z"/><path d="M19 5v14"/>',
  list: '<path d="M9 6h12"/><path d="M9 12h12"/><path d="M9 18h12"/><path d="M3 6h.01"/><path d="M3 12h.01"/><path d="M3 18h.01"/>',
  home: '<path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5"/><path d="M12 7v5l3 2"/>',
  trash: '<path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v5"/><path d="M14 11v5"/>',
  heart: '<path d="M19 5.5a5 5 0 0 0-7 0L12 6l-.5-.5a5 5 0 0 0-7 7L12 20l7.5-7.5a5 5 0 0 0 0-7Z"/>',
  volume: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a9 9 0 0 1 0 14"/>',
  mute: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="m22 9-6 6"/><path d="m16 9 6 6"/>',
};

const RI_ICON_MAP = {
  "ri-gamepad-line": "gamepad",
  "ri-star-line": "star",
  "ri-star-fill": "star-fill",
  "ri-arrow-left-line": "left",
  "ri-arrow-right-line": "right",
  "ri-subtract-line": "minus",
  "ri-add-line": "plus",
  "ri-refresh-line": "refresh",
  "ri-infinity-line": "infinity",
  "ri-timer-line": "timer",
  "ri-timer-flash-line": "stopwatch",
  "ri-play-fill": "play",
  "ri-flag-line": "flag",
  "ri-check-line": "check",
  "ri-close-line": "x",
  "ri-skip-forward-line": "skip",
  "ri-list-check": "list",
  "ri-home-line": "home",
  "ri-user-smile-line": "user",
  "ri-search-line": "search",
  "ri-history-line": "history",
  "ri-delete-bin-line": "trash",
};

function iconSvg(name, className = "icon") {
  const path = ICONS[name] || ICONS.gamepad;
  return `<svg class="${className}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${path}</svg>`;
}

function hydrateIcons(root = document) {
  root.querySelectorAll("i[class*='ri-']").forEach((node) => {
    const iconClass = Array.from(node.classList).find((className) => RI_ICON_MAP[className]);
    if (!iconClass) return;
    node.outerHTML = iconSvg(RI_ICON_MAP[iconClass]);
  });
}

const games = [
  {
    id: "charades",
    name: "몸으로 말해요",
    iconName: "activity",
    color: "yellow",
    description: "말 없이 몸짓만으로 제시어를 설명하고 맞히는 게임입니다.",
    tags: ["파티", "대면", "몸짓"],
    rule: "",
    words: dictionaries.charades,
  },
  {
    id: "charades-funny",
    name: "몸으로 말해요 - 웃긴 버전",
    iconName: "smile",
    color: "pink",
    description: "우스꽝스러운 몸짓과 반전 오답이 나오기 좋은 제시어만 모은 버전입니다.",
    tags: ["파티", "몸짓", "웃긴 버전"],
    rule: "난이도 구분 없이 웃긴 제시어만 사용합니다.",
    words: dictionaries.charadesFunny,
    fixedDifficulty: "all",
    hideDifficulty: true,
  },
  {
    id: "silent-shout",
    name: "고요 속의 외침",
    iconName: "megaphone",
    color: "sky",
    description: "제시어 자체를 말하지 않고 뜻과 상황 설명만 입모양으로 전달하는 게임입니다.",
    tags: ["입모양", "설명", "대면"],
    rule: "제시어 글자를 직접 말하지 말고, 뜻과 상황만 입모양으로 설명하세요.",
    words: dictionaries.silentShout,
  },
  {
    id: "telestrations",
    name: "텔레스트레이션",
    iconName: "pencil",
    color: "green",
    description: "제시어를 보고 그림과 추측을 번갈아 이어가는 게임입니다.",
    tags: ["그림", "추측", "웃음"],
    rule: "제시어를 보고 그림으로 표현하고, 다음 사람은 그림만 보고 추측합니다.",
    words: dictionaries.telestrations,
  },
  {
    id: "emotion-words",
    name: "86가지 감정단어",
    iconName: "heart",
    color: "purple",
    description: "감정을 나타내는 단어를 몸으로 설명해서 맞히는 게임입니다. 정해진 개수를 빨리 맞히면 승리!",
    tags: ["감정", "몸짓", "대면"],
    rule: "감정 단어를 말 없이 몸짓과 표정으로만 표현하세요. 정해진 개수를 먼저 다 맞히는 쪽이 승리합니다.",
    words: dictionaries.emotionWords,
    fixedDifficulty: "all",
    hideDifficulty: true,
  },
];

const state = {
  view: "home",
  selectedGameId: null,
  activeSession: null,
  lastSettings: null,
  timerId: null,
  audioContext: null,
  routeRestoring: false,
  soundEnabled: true,
  bgmSchedulerId: null,
  bgmNextTime: 0,
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const elements = {
  gameList: $("#game-list"),
  search: $("#game-search"),
  setupTitle: $("#setup-title"),
  setupIcon: $("#setup-icon"),
  setupGameName: $("#setup-game-name"),
  setupGameDescription: $("#setup-game-description"),
  setupTags: $("#setup-tags"),
  setupStats: $("#setup-stats"),
  setupRule: $("#setup-rule"),
  difficultyOptions: $("#difficulty-options"),
  mixPanel: $("#mix-panel"),
  mixEasy: $("#mix-easy"),
  mixNormal: $("#mix-normal"),
  mixHard: $("#mix-hard"),
  mixEasyMax: $("#mix-easy-max"),
  mixNormalMax: $("#mix-normal-max"),
  mixHardMax: $("#mix-hard-max"),
  totalWordCount: $("#total-word-count"),
  singleCountPanel: $("#single-count-panel"),
  setupForm: $("#setup-form"),
  wordCount: $("#word-count"),
  timeMode: $("#time-mode"),
  timerSecondsWrap: $("#timer-seconds-wrap"),
  timerSeconds: $("#timer-seconds"),
  timerLabel: $("#timer-label"),
  playGameIcon: $("#play-game-icon"),
  playGameName: $("#play-game-name"),
  soundToggle: $("#sound-toggle"),
  soundToggleIcon: $("#sound-toggle-icon"),
  soundToggleLabel: $("#sound-toggle-label"),
  playClockLabel: $("#play-clock-label"),
  playProgress: $("#play-progress"),
  playProgressFill: $("#play-progress-fill"),
  playClock: $("#play-clock"),
  miniScore: $("#mini-score"),
  keyword: $("#keyword"),
  playRule: $("#play-rule"),
  answerState: $("#answer-state"),
  resultIcon: $("#result-icon"),
  resultTitle: $("#result-title"),
  resultSummary: $("#result-summary"),
  resultMeta: $("#result-meta"),
  resultWords: $("#result-words"),
  favoriteList: $("#favorite-list"),
  favoriteCount: $("#favorite-count"),
  historyList: $("#history-list"),
  historyCount: $("#history-count"),
  historyTotal: $("#history-total"),
  historyResultModal: $("#history-result-modal"),
  historyResultIcon: $("#history-result-icon"),
  historyResultTitle: $("#history-result-title"),
  historyResultSubtitle: $("#history-result-subtitle"),
  historyResultSummary: $("#history-result-summary"),
  historyResultMeta: $("#history-result-meta"),
  historyResultWords: $("#history-result-words"),
  toast: $("#toast"),
};

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getFavorites() {
  return readStorage(STORAGE_KEYS.favorites, []);
}

function setFavorites(value) {
  writeStorage(STORAGE_KEYS.favorites, value);
}

function getHistory() {
  return readStorage(STORAGE_KEYS.history, []);
}

function setHistory(value) {
  writeStorage(STORAGE_KEYS.history, value);
}

function getGame(gameId) {
  return games.find((game) => game.id === gameId);
}

function getAllWords(game, difficulty = "all") {
  if (!game?.words) return [];
  if (game.words.all) return game.words.all;
  if (difficulty === "all" || difficulty === "mixed") {
    return ["easy", "normal", "hard"].flatMap((level) => game.words[level] ?? []);
  }
  return game.words[difficulty] ?? [];
}

function getAvailableCounts(game) {
  if (game.words?.all) {
    return { all: game.words.all.length, easy: 0, normal: 0, hard: 0 };
  }
  return {
    all: getAllWords(game, "all").length,
    easy: game.words?.easy?.length ?? 0,
    normal: game.words?.normal?.length ?? 0,
    hard: game.words?.hard?.length ?? 0,
  };
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function takeShuffledWords(sourceWords, count, allowRepeats = true) {
  const words = sourceWords.filter(Boolean);
  if (!words.length || count <= 0) return [];
  if (!allowRepeats) return shuffle(words).slice(0, count);

  const selected = [];
  while (selected.length < count) selected.push(...shuffle(words));
  return selected.slice(0, count);
}

function makeWordEntry(word, difficulty) {
  return { word, difficulty };
}

function getWordValue(entry) {
  return typeof entry === "string" ? entry : entry?.word ?? "";
}

function getWordDifficulty(entry, fallback = "all") {
  return typeof entry === "string" ? fallback : entry?.difficulty || fallback;
}

function getWordEntries(game, difficulty = "all") {
  if (game.words?.all) return (game.words.all ?? []).map((word) => makeWordEntry(word, "all"));
  if (difficulty === "all" || difficulty === "mixed") {
    return WORD_DIFFICULTIES.flatMap((level) => (game.words?.[level] ?? []).map((word) => makeWordEntry(word, level)));
  }
  return (game.words?.[difficulty] ?? []).map((word) => makeWordEntry(word, difficulty));
}

function getDifficultyLabel(difficulty) {
  return WORD_DIFFICULTY_LABELS[difficulty] || WORD_DIFFICULTY_LABELS.all;
}

function formatClock(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function formatDuration(totalSeconds) {
  const seconds = Math.max(0, Number(totalSeconds) || 0);
  if (seconds >= 60) {
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    return rest ? `${minutes}분 ${rest}초` : `${minutes}분`;
  }
  return `${seconds}초`;
}

function formatDate(date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function makeDefaultTitle(gameName, date) {
  const stamp = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  })
    .format(date)
    .replaceAll(". ", "-")
    .replace(".", "")
    .replace(" ", "_");
  return `${gameName}_${stamp}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 1800);
}

function getRouteUrl(viewName, gameId = state.selectedGameId) {
  if (viewName === "setup" && gameId) return `#setup/${encodeURIComponent(gameId)}`;
  if (viewName === "play" && gameId) return `#play/${encodeURIComponent(gameId)}`;
  if (viewName === "result") return "#result";
  if (viewName === "mypage") return "#mypage";
  return "#home";
}

function pushRoute(viewName, gameId = state.selectedGameId, replace = false) {
  const routeState = { view: viewName, gameId: gameId || null };
  const url = getRouteUrl(viewName, gameId);
  if (replace) history.replaceState(routeState, "", url);
  else history.pushState(routeState, "", url);
}

function parseRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  const [view = "home", rawGameId = ""] = hash.split("/");
  return {
    view: ["home", "setup", "play", "result", "mypage"].includes(view) ? view : "home",
    gameId: rawGameId ? decodeURIComponent(rawGameId) : null,
  };
}

function setView(viewName, options = {}) {
  const { pushHistory = true, replaceHistory = false, gameId = state.selectedGameId } = options;

  if (state.view === "play" && viewName !== "play") {
    stopBgm();
    if (state.activeSession) {
      stopClock();
      state.activeSession = null;
    }
  }

  state.view = viewName;
  document.body.dataset.view = viewName;
  $$(".view").forEach((view) => view.classList.toggle("is-visible", view.id === `${viewName}-view`));
  $$(".nav-button").forEach((button) => button.classList.toggle("is-active", button.dataset.viewTarget === viewName));
  if (viewName === "mypage") renderMyPage();
  if (pushHistory && !state.routeRestoring) pushRoute(viewName, gameId, replaceHistory);
  window.scrollTo({ top: 0, behavior: "instant" });
}

function getWordCountLabel(game) {
  const counts = getAvailableCounts(game);
  if (game.words?.all) return `전체 ${counts.all}개`;
  return `초급 ${counts.easy}개 · 중급 ${counts.normal}개 · 상급 ${counts.hard}개`;
}

function renderGameCard(game, { compact = false } = {}) {
  const favorites = getFavorites();
  const isFavorite = favorites.includes(game.id);
  return `
    <article class="game-card ${compact ? "is-compact" : ""}" data-action="select-game" data-game-id="${game.id}" tabindex="0" role="button">
      <div class="game-card-inner">
        <span class="game-icon color-${game.color}">${iconSvg(game.iconName, "game-icon-svg")}</span>
        <div class="game-card-content">
          <div class="game-card-title-row">
            <h2>${escapeHtml(game.name)}</h2>
            <button
              class="favorite-button ${isFavorite ? "is-on" : ""}"
              type="button"
              data-action="toggle-favorite"
              data-game-id="${game.id}"
              aria-label="${escapeHtml(game.name)} 즐겨찾기"
            >
              ${iconSvg(isFavorite ? "star-fill" : "star")}
            </button>
          </div>
          <p>${escapeHtml(game.description)}</p>
          <div class="tag-row">
            ${game.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("")}
          </div>
          ${compact ? "" : `<div class="game-counts"><span>${getWordCountLabel(game)}</span></div>`}
        </div>
      </div>
    </article>
  `;
}

function renderGameList() {
  const query = elements.search.value.trim().toLowerCase();
  const filteredGames = games.filter((game) => {
    const text = `${game.name} ${game.description} ${game.tags.join(" ")}`.toLowerCase();
    return text.includes(query);
  });

  elements.gameList.innerHTML = filteredGames.map((game) => renderGameCard(game)).join("");
  if (!filteredGames.length) {
    elements.gameList.innerHTML = `
      <div class="empty">
        ${iconSvg("search")}
        검색 결과가 없어요. 다른 단어로 찾아보세요.
      </div>
    `;
  }
}

function getSetupStats(game) {
  const counts = getAvailableCounts(game);
  if (game.words?.all) return [`전체 ${counts.all}개`, "난이도 구분 없음"];
  return [`초급 ${counts.easy}개`, `중급 ${counts.normal}개`, `상급 ${counts.hard}개`];
}

function renderHiddenDifficultyOptions(game) {
  if (game.hideDifficulty) {
    elements.difficultyOptions.innerHTML = `
      <label><input type="radio" name="difficulty" value="all" checked /> 전체</label>
    `;
    return;
  }

  elements.difficultyOptions.innerHTML = [
    ["easy", "초급"],
    ["normal", "중급"],
    ["hard", "상급"],
    ["all", "전체"],
    ["mixed", "섞기"],
  ]
    .map(
      ([value, label]) => `
        <label>
          <input type="radio" name="difficulty" value="${value}" ${value === "mixed" ? "checked" : ""} />
          ${label}
        </label>
      `,
    )
    .join("");
}

function setMixCounts(counts) {
  elements.mixEasy.value = String(Math.max(0, counts.easy ?? 0));
  elements.mixNormal.value = String(Math.max(0, counts.normal ?? 0));
  elements.mixHard.value = String(Math.max(0, counts.hard ?? 0));
  syncWordCountFromMix();
}

function resetMixCounts() {
  const game = getGame(state.selectedGameId);
  if (!game) return;
  const counts = getAvailableCounts(game);
  setMixCounts({
    easy: Math.min(DEFAULT_MIX.easy, counts.easy),
    normal: Math.min(DEFAULT_MIX.normal, counts.normal),
    hard: Math.min(DEFAULT_MIX.hard, counts.hard),
  });
}

function updateMixAvailability(game) {
  const counts = getAvailableCounts(game);
  elements.mixEasyMax.textContent = `/ ${counts.easy}개`;
  elements.mixNormalMax.textContent = `/ ${counts.normal}개`;
  elements.mixHardMax.textContent = `/ ${counts.hard}개`;
  elements.mixEasy.max = counts.easy;
  elements.mixNormal.max = counts.normal;
  elements.mixHard.max = counts.hard;
}

function setWordCountMode(useSinglePool) {
  elements.mixPanel.hidden = useSinglePool;
  elements.singleCountPanel.hidden = !useSinglePool;
  [elements.mixEasy, elements.mixNormal, elements.mixHard].forEach((input) => {
    input.disabled = useSinglePool;
  });
  elements.wordCount.disabled = !useSinglePool;
}

function renderSetup(gameId, options = {}) {
  const game = getGame(gameId);
  if (!game) return;

  const counts = getAvailableCounts(game);
  state.selectedGameId = gameId;
  elements.setupTitle.textContent = game.name;
  elements.setupIcon.innerHTML = iconSvg(game.iconName, "game-icon-svg");
  elements.setupIcon.className = `game-icon color-${game.color}`;
  elements.setupGameName.textContent = game.name;
  elements.setupGameDescription.textContent = game.description;
  elements.setupTags.innerHTML = game.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join("");
  elements.setupStats.innerHTML = getSetupStats(game).map((item) => `<span>${item}</span>`).join("");
  elements.setupRule.textContent = game.rule;
  elements.setupRule.hidden = !game.rule;

  renderHiddenDifficultyOptions(game);
  updateMixAvailability(game);

  if (game.words?.all) {
    setWordCountMode(true);
    const available = Math.max(1, counts.all || 0);
    elements.wordCount.max = String(available);
    elements.wordCount.value = String(Math.min(10, available));
  } else {
    setWordCountMode(false);
    elements.wordCount.removeAttribute("max");
    resetMixCounts();
  }

  setTimeMode("timer");
  updateTimerLabel();
  setView("setup", { ...options, gameId });
}

function toggleFavorite(gameId) {
  const favorites = getFavorites();
  const nextFavorites = favorites.includes(gameId)
    ? favorites.filter((id) => id !== gameId)
    : [...favorites, gameId];
  setFavorites(nextFavorites);
  renderGameList();
  if (state.view === "mypage") renderMyPage();
}

function buildWordList(game, settings) {
  if (settings.useAllWords) {
    const words = getWordEntries(game, settings.difficulty);
    return takeShuffledWords(words, words.length, false);
  }

  if (settings.difficulty === "mixed" && settings.mixCounts && !game.words?.all) {
    return shuffle([
      ...takeShuffledWords((game.words?.easy ?? []).map((word) => makeWordEntry(word, "easy")), settings.mixCounts.easy),
      ...takeShuffledWords((game.words?.normal ?? []).map((word) => makeWordEntry(word, "normal")), settings.mixCounts.normal),
      ...takeShuffledWords((game.words?.hard ?? []).map((word) => makeWordEntry(word, "hard")), settings.mixCounts.hard),
    ]);
  }

  return takeShuffledWords(getWordEntries(game, settings.difficulty), settings.wordCount);
}

function createSession(settings) {
  const game = getGame(settings.gameId);
  const words = buildWordList(game, settings);
  return {
    id: window.crypto?.randomUUID ? window.crypto.randomUUID() : String(Date.now()),
    gameId: game.id,
    gameName: game.name,
    gameIconName: game.iconName,
    gameColor: game.color,
    gameRule: game.rule,
    difficulty: settings.difficulty,
    words,
    currentIndex: 0,
    answers: [],
    mode: settings.mode,
    totalSeconds: settings.mode === "timer" ? settings.timerSeconds : 0,
    elapsedSeconds: 0,
    startedAt: new Date(),
  };
}

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!state.audioContext) {
    state.audioContext = new AudioContextClass();
    // iOS 16.4+: 무음(mute) 스위치가 켜져 있어도 소리가 나도록 재생 세션으로 지정
    try {
      if (navigator.audioSession) navigator.audioSession.type = "playback";
    } catch (_) {}
  }
  return state.audioContext;
}

// 모바일(iOS/Safari)은 사용자 제스처 안에서 컨텍스트를 resume하고
// 무음 버퍼를 한 번 재생해야 이후 소리가 안정적으로 납니다.
function unlockAudio() {
  const audioContext = getAudioContext();
  if (!audioContext) return;
  if (audioContext.state === "suspended") audioContext.resume().catch(() => {});
  try {
    const buffer = audioContext.createBuffer(1, 1, 22050);
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
  } catch (_) {}
}

function primeAlarmSound() {
  unlockAudio();
}

function playTone({ frequency, endFrequency, startAt, duration, volume = 0.18, type = "sine" }) {
  if (!state.soundEnabled) return;
  const audioContext = getAudioContext();
  if (!audioContext) return;

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startAt);
  if (endFrequency) oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startAt + duration);
  gain.gain.setValueAtTime(0.0001, startAt);
  gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  oscillator.connect(gain);
  gain.connect(audioContext.destination);
  oscillator.start(startAt);
  oscillator.stop(startAt + duration + 0.03);
}

// 오락실 8비트 느낌의 짧은 효과음. 모두 square/sawtooth 파형으로 합성한다.
function playSequence(notes) {
  if (!state.soundEnabled) return;
  const audioContext = getAudioContext();
  if (!audioContext) return;
  audioContext.resume?.().catch(() => {});
  const base = audioContext.currentTime + 0.02;
  notes.forEach((note) => playTone({ ...note, startAt: base + (note.offset || 0) }));
}

// 정답: 밝게 반짝이는 상승 벨 "딩동댕" (기음 + 옥타브 스파클)
function playCorrectSound() {
  playSequence([
    { frequency: 783.99, duration: 0.16, volume: 0.15, type: "triangle", offset: 0 }, // G5
    { frequency: 1046.5, duration: 0.16, volume: 0.15, type: "triangle", offset: 0.1 }, // C6
    { frequency: 1567.98, duration: 0.36, volume: 0.16, type: "triangle", offset: 0.2 }, // G6
    { frequency: 2093.0, duration: 0.36, volume: 0.045, type: "sine", offset: 0.2 }, // C7 스파클
  ]);
}

// 틀림: 게임쇼 "wrong" 부저음 (낮고 거친 두 음 동시, 살짝 하강)
function playWrongSound() {
  playSequence([
    { frequency: 196, endFrequency: 174, duration: 0.46, volume: 0.14, type: "sawtooth", offset: 0 },
    { frequency: 185, endFrequency: 164, duration: 0.46, volume: 0.12, type: "sawtooth", offset: 0 },
  ]);
}

// Pass: "슝" 위로 날아가는 상승 스윕
function playPassSound() {
  playSequence([
    { frequency: 320, endFrequency: 1500, duration: 0.26, volume: 0.13, type: "triangle", offset: 0 },
  ]);
}

// 오락실 느낌의 반복 칩튠 BGM. 16스텝 루프를 오디오 클럭에 맞춰 이어 붙여 재생한다.
// 마리오풍: 밝은 장조, 큰 음정 점프, 스타카토, 루트-5도 바운싱 베이스.
const BGM = {
  step: 0.13, // 한 스텝 길이(초) — 빠르고 경쾌하게
  steps: 16,
  // 리드 멜로디(square). null은 쉼표.
  lead: [
    659.25, null, 1046.5, null, 987.77, 880.0, 783.99, null,
    659.25, 783.99, 1046.5, null, 1318.51, null, 1046.5, null,
  ],
  // 베이스(triangle). 2스텝마다 루트-5도 바운싱 (C-G / F-C).
  bass: [
    130.81, null, 196.0, null, 130.81, null, 196.0, null,
    174.61, null, 130.81, null, 196.0, null, 130.81, null,
  ],
};

function scheduleBgmLoop(loopStart) {
  for (let i = 0; i < BGM.steps; i += 1) {
    const at = loopStart + i * BGM.step;
    if (BGM.lead[i]) {
      playTone({ frequency: BGM.lead[i], startAt: at, duration: BGM.step * 0.7, volume: 0.05, type: "square" });
    }
    if (BGM.bass[i]) {
      playTone({ frequency: BGM.bass[i], startAt: at, duration: BGM.step * 1.5, volume: 0.05, type: "triangle" });
    }
  }
}

function startBgm() {
  if (!state.soundEnabled || state.bgmSchedulerId) return;
  const audioContext = getAudioContext();
  if (!audioContext) return;
  audioContext.resume?.().catch(() => {});
  const loopDuration = BGM.step * BGM.steps;
  state.bgmNextTime = audioContext.currentTime + 0.1;
  const tick = () => {
    const ctx = getAudioContext();
    // 소리 꺼짐·play 화면 이탈·세션 종료 시 스케줄러를 스스로 정리해 BGM을 확실히 멈춘다.
    if (!ctx || !state.soundEnabled || state.view !== "play" || !state.activeSession) {
      stopBgm();
      return;
    }
    // 백그라운드 복귀 등으로 스케줄이 밀렸으면 과거 음이 몰리지 않게 현재로 당긴다.
    if (state.bgmNextTime < ctx.currentTime) state.bgmNextTime = ctx.currentTime + 0.05;
    // 오디오 클럭 기준 0.4초 앞까지 미리 예약해 끊김 없이 반복시킨다.
    while (state.bgmNextTime < ctx.currentTime + 0.4) {
      scheduleBgmLoop(state.bgmNextTime);
      state.bgmNextTime += loopDuration;
    }
  };
  tick();
  state.bgmSchedulerId = window.setInterval(tick, 120);
}

function stopBgm() {
  if (state.bgmSchedulerId) {
    window.clearInterval(state.bgmSchedulerId);
    state.bgmSchedulerId = null;
  }
}

function renderSoundToggle() {
  if (!elements.soundToggle) return;
  const on = state.soundEnabled;
  elements.soundToggleIcon.innerHTML = iconSvg(on ? "volume" : "mute", "icon");
  elements.soundToggleLabel.textContent = on ? "소리 켜짐" : "소리 꺼짐";
  elements.soundToggle.setAttribute("aria-pressed", String(on));
  elements.soundToggle.classList.toggle("is-muted", !on);
}

function toggleSound() {
  state.soundEnabled = !state.soundEnabled;
  writeStorage(STORAGE_KEYS.soundEnabled, state.soundEnabled);
  renderSoundToggle();
  if (state.soundEnabled) {
    unlockAudio();
    playPassSound();
    if (state.view === "play" && state.activeSession) startBgm();
  } else {
    stopBgm();
  }
}

function playCountdownTick() {
  const audioContext = getAudioContext();
  if (!audioContext) return;
  audioContext.resume?.().catch(() => {});
  playTone({
    frequency: 740,
    startAt: audioContext.currentTime + 0.02,
    duration: 0.085,
    volume: 0.13,
    type: "triangle",
  });
}

function playTimerEndSound() {
  const audioContext = getAudioContext();
  if (!audioContext) return;
  audioContext.resume?.().catch(() => {});

  const startAt = audioContext.currentTime + 0.03;
  const ringNotes = [880, 1174.66, 1396.91, 1174.66];
  Array.from({ length: 26 }, (_, index) => ({
    frequency: ringNotes[index % ringNotes.length],
    offset: index * 0.105,
    duration: 0.09,
    volume: index < 21 ? 0.24 : 0.18,
    type: index % 2 ? "sine" : "triangle",
  }))
    .concat([
      { frequency: 1760, offset: 2.72, duration: 0.16, volume: 0.2, type: "triangle" },
      { frequency: 1567.98, offset: 2.88, duration: 0.18, volume: 0.18, type: "sine" },
      { frequency: 1318.51, offset: 3.06, duration: 0.34, volume: 0.14, type: "sine" },
    ])
    .forEach((tone) => {
    playTone({
      ...tone,
      startAt: startAt + tone.offset,
    });
  });
}

function startGame(settings) {
  stopClock();
  stopBgm();
  primeAlarmSound();
  state.lastSettings = settings;
  state.activeSession = createSession(settings);

  if (!state.activeSession.words.length) {
    showToast("제시어 개수를 1개 이상 선택해주세요.");
    state.activeSession = null;
    return;
  }

  setView("play", { gameId: settings.gameId });
  renderPlay();
  startBgm();
  startClock();
}

function startClock() {
  if (
    state.activeSession?.mode === "timer" &&
    state.activeSession.totalSeconds > 0 &&
    state.activeSession.totalSeconds <= 5
  ) {
    playCountdownTick();
  }

  state.timerId = window.setInterval(() => {
    const session = state.activeSession;
    if (!session) return;

    session.elapsedSeconds += 1;
    if (session.mode === "timer") {
      session.totalSeconds -= 1;
      if (session.totalSeconds <= 0) {
        session.totalSeconds = 0;
        renderPlayClock();
        playTimerEndSound();
        finishGame("타이머 종료");
        return;
      }
      if (session.totalSeconds <= 5) playCountdownTick();
    }
    renderPlayClock();
  }, 1000);
}

function stopClock() {
  if (state.timerId) {
    window.clearInterval(state.timerId);
    state.timerId = null;
  }
}

function renderPlayClock() {
  const session = state.activeSession;
  if (!session) return;
  const seconds = session.mode === "timer" ? session.totalSeconds : session.elapsedSeconds;
  elements.playClock.textContent = formatClock(seconds);
  elements.playClock.classList.toggle("is-warning", session.mode === "timer" && seconds <= 10);
}

function getAnswerForCurrentWord(session) {
  return session.answers.find((answer) => answer.order === session.currentIndex + 1);
}

function setKeywordFont(word) {
  const length = [...String(word || "")].length;
  let size = "clamp(5.4rem, 9vw, 9.2rem)";

  if (length >= 5) size = "clamp(4.8rem, 7.8vw, 7.8rem)";
  if (length >= 8) size = "clamp(3.5rem, 5.9vw, 6rem)";
  if (length >= 11) size = "clamp(2.9rem, 4.8vw, 4.7rem)";
  if (length >= 15) size = "clamp(2.35rem, 3.8vw, 3.7rem)";
  if (length >= 20) size = "clamp(2rem, 3.2vw, 3rem)";

  elements.keyword.style.setProperty("--keyword-size", size);
}

function renderPlay() {
  const session = state.activeSession;
  if (!session) return;

  const currentWordEntry = session.words[session.currentIndex];
  const currentWord = getWordValue(currentWordEntry);
  const correct = session.answers.filter((answer) => answer.result === "correct").length;
  const wrong = session.answers.filter((answer) => answer.result === "wrong").length;
  const passed = session.answers.filter((answer) => answer.result === "pass").length;
  const completed = session.answers.length;
  const percent = session.words.length ? Math.min(100, (completed / session.words.length) * 100) : 0;
  const currentAnswer = getAnswerForCurrentWord(session);

  elements.playGameIcon.innerHTML = iconSvg(session.gameIconName, "game-icon-svg");
  elements.playGameIcon.className = `play-game-icon color-${session.gameColor}`;
  elements.playGameName.textContent = session.gameName;
  elements.playClockLabel.textContent = session.mode === "timer" ? "남은 시간" : "경과 시간";
  elements.playProgress.textContent = `${session.currentIndex + 1} / ${session.words.length}`;
  elements.playProgressFill.style.width = `${percent}%`;
  elements.miniScore.innerHTML = `
    <span class="green">${iconSvg("check")}${correct}</span>
    <span class="red">${iconSvg("x")}${wrong}</span>
    <span class="sky">${iconSvg("skip")}${passed}</span>
  `;
  elements.keyword.textContent = currentWord ?? "";
  setKeywordFont(currentWord);
  elements.playRule.textContent = session.gameRule;
  elements.playRule.hidden = !session.gameRule;
  elements.answerState.textContent = currentAnswer
    ? `${getResultLabel(currentAnswer.result)} 처리됨 · ← 이전 / → 다음`
    : "O/Enter 맞힘 · X/Backspace 틀림 · → 다음은 Pass";

  elements.keyword.parentElement.classList.toggle("is-correct", currentAnswer?.result === "correct");
  elements.keyword.parentElement.classList.toggle("is-wrong", currentAnswer?.result === "wrong");
  elements.keyword.parentElement.classList.toggle("is-pass", currentAnswer?.result === "pass");
  renderPlayClock();
}

function setAnswer(session, answer) {
  const index = session.answers.findIndex((item) => item.order === answer.order);
  if (index >= 0) session.answers[index] = answer;
  else session.answers.push(answer);
}

function markAnswer(result) {
  const session = state.activeSession;
  if (!session) return;

  const wordEntry = session.words[session.currentIndex];
  const word = getWordValue(wordEntry);
  if (!word) {
    finishGame();
    return;
  }

  setAnswer(session, { word, difficulty: getWordDifficulty(wordEntry, session.difficulty), result, order: session.currentIndex + 1 });
  if (result === "correct") playCorrectSound();
  else if (result === "wrong") playWrongSound();
  moveNext(false);
}

function moveNext(markPassIfEmpty = true) {
  const session = state.activeSession;
  if (!session) return;

  const wordEntry = session.words[session.currentIndex];
  const word = getWordValue(wordEntry);
  if (markPassIfEmpty && word && !getAnswerForCurrentWord(session)) {
    setAnswer(session, { word, difficulty: getWordDifficulty(wordEntry, session.difficulty), result: "pass", order: session.currentIndex + 1 });
    playPassSound();
  }

  session.currentIndex += 1;
  if (session.currentIndex >= session.words.length) {
    finishGame();
    return;
  }
  renderPlay();
}

function movePrevious() {
  const session = state.activeSession;
  if (!session) return;
  session.currentIndex = Math.max(0, session.currentIndex - 1);
  renderPlay();
}

function resetWords() {
  if (!state.lastSettings || !state.activeSession) return;
  startGame(state.lastSettings);
  showToast("제시어를 새로 섞었습니다.");
}

function finishGame(reason = "") {
  const session = state.activeSession;
  if (!session) return;

  stopClock();
  stopBgm();
  const finishedAt = new Date();
  const answerByOrder = new Map(session.answers.map((answer) => [answer.order, answer]));
  const playedWords = session.words.map((wordEntry, index) => {
    const answer = answerByOrder.get(index + 1);
    return {
      word: answer?.word || getWordValue(wordEntry),
      difficulty: answer?.difficulty || getWordDifficulty(wordEntry, session.difficulty),
      result: answer?.result || "unplayed",
      order: index + 1,
    };
  });
  const correct = session.answers.filter((answer) => answer.result === "correct").length;
  const wrong = session.answers.filter((answer) => answer.result === "wrong").length;
  const passed = session.answers.filter((answer) => answer.result === "pass").length;
  const unplayed = playedWords.filter((answer) => answer.result === "unplayed").length;
  const historyItem = {
    id: session.id,
    title: makeDefaultTitle(session.gameName, finishedAt),
    gameId: session.gameId,
    gameName: session.gameName,
    gameIconName: session.gameIconName,
    gameColor: session.gameColor,
    difficulty: session.difficulty,
    total: session.words.length,
    correct,
    wrong,
    passed,
    unplayed,
    words: playedWords,
    elapsedSeconds: session.elapsedSeconds,
    playedAt: finishedAt.toISOString(),
    reason,
  };

  setHistory([historyItem, ...getHistory()].slice(0, 100));
  renderResult(historyItem);
  state.activeSession = null;
  setView("result", { gameId: session.gameId });
  if (reason) showToast(reason);
}

function getResultLabel(result) {
  if (result === "correct") return "맞힘";
  if (result === "wrong") return "틀림";
  if (result === "pass") return "Pass";
  return "미진행";
}

function renderResultWordItems(words, fallbackDifficulty = "all") {
  return words
    .map((item, index) => {
      const difficulty = getWordDifficulty(item, fallbackDifficulty);
      return `
        <div class="result-word-item">
          <span>${item.order || index + 1}</span>
          <span class="result-word-main">
            <strong>${escapeHtml(getWordValue(item))}</strong>
            <small class="difficulty-badge difficulty-${difficulty}">${getDifficultyLabel(difficulty)}</small>
          </span>
          <em class="result-badge ${item.result || "unplayed"}">${getResultLabel(item.result)}</em>
        </div>
      `;
    })
    .join("");
}

function renderResult(result) {
  const rate = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
  elements.resultIcon.innerHTML = iconSvg(result.gameIconName || getGame(result.gameId)?.iconName || "gamepad", "game-icon-svg");
  elements.resultIcon.className = `game-icon color-${result.gameColor || getGame(result.gameId)?.color || "yellow"}`;
  elements.resultTitle.textContent = result.gameName;
  elements.resultSummary.innerHTML = `
    <div class="score-box green"><strong>${result.correct}</strong><span>맞힘</span></div>
    <div class="score-box red"><strong>${result.wrong}</strong><span>틀림</span></div>
    <div class="score-box sky"><strong>${result.passed}</strong><span>Pass</span></div>
  `;
  elements.resultMeta.innerHTML = `
    <span><strong>${rate}%</strong><small>정답률</small></span>
    <span><strong>${formatDuration(result.elapsedSeconds)}</strong><small>소요 시간</small></span>
    <span><strong>${result.total}</strong><small>전체</small></span>
    <span><strong>${result.unplayed ?? 0}</strong><small>미진행</small></span>
  `;
  elements.resultWords.innerHTML = renderResultWordItems(result.words, result.difficulty);
}

function renderHistoryResultModal(result) {
  const rate = result.total > 0 ? Math.round((result.correct / result.total) * 100) : 0;
  elements.historyResultIcon.innerHTML = iconSvg(
    result.gameIconName || getGame(result.gameId)?.iconName || "gamepad",
    "game-icon-svg",
  );
  elements.historyResultIcon.className = `game-icon color-${result.gameColor || getGame(result.gameId)?.color || "yellow"}`;
  elements.historyResultTitle.textContent = result.gameName || result.title || "게임 결과";
  elements.historyResultSubtitle.textContent = `${result.title || "저장된 기록"} · ${formatDate(new Date(result.playedAt))}`;
  elements.historyResultSummary.innerHTML = `
    <div class="score-box green"><strong>${result.correct}</strong><span>맞힘</span></div>
    <div class="score-box red"><strong>${result.wrong}</strong><span>틀림</span></div>
    <div class="score-box sky"><strong>${result.passed}</strong><span>Pass</span></div>
  `;
  elements.historyResultMeta.innerHTML = `
    <span><strong>${rate}%</strong><small>정답률</small></span>
    <span><strong>${formatDuration(result.elapsedSeconds)}</strong><small>소요 시간</small></span>
    <span><strong>${result.total}</strong><small>전체</small></span>
    <span><strong>${result.unplayed ?? 0}</strong><small>미진행</small></span>
  `;
  elements.historyResultWords.innerHTML = renderResultWordItems(result.words, result.difficulty);
  hydrateIcons(elements.historyResultModal);
}

function openHistoryResult(historyId) {
  const result = getHistory().find((item) => item.id === historyId);
  if (!result) return;
  renderHistoryResultModal(result);
  elements.historyResultModal.hidden = false;
  document.body.classList.add("modal-open");
}

function closeHistoryResult() {
  elements.historyResultModal.hidden = true;
  document.body.classList.remove("modal-open");
}

function renderMyPage() {
  renderFavorites();
  renderHistory();
}

function setMyPageTab(tabName) {
  $$("[data-mypage-panel]").forEach((panel) => {
    panel.classList.toggle("is-visible", panel.dataset.mypagePanel === tabName);
  });
  $$(".tab-button").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tab === tabName);
  });
}

function renderFavorites() {
  const favorites = getFavorites().map(getGame).filter(Boolean);
  elements.favoriteCount.textContent = `(${favorites.length})`;
  if (!favorites.length) {
    elements.favoriteList.innerHTML = `
      <div class="empty">
        ${iconSvg("star")}
        즐겨찾기한 게임이 없어요.
        <button type="button" data-action="go-home">게임 찾으러 가기</button>
      </div>
    `;
    return;
  }
  elements.favoriteList.innerHTML = favorites.map((game) => renderGameCard(game, { compact: true })).join("");
}

function renderHistory() {
  const history = getHistory();
  elements.historyCount.textContent = `(${history.length})`;
  elements.historyTotal.textContent = `총 ${history.length}개의 기록`;
  if (!history.length) {
    elements.historyList.innerHTML = `
      <div class="empty">
        ${iconSvg("history")}
        게임 기록이 없어요.
        <button type="button" data-action="go-home">게임 하러 가기</button>
      </div>
    `;
    return;
  }

  elements.historyList.innerHTML = history
    .map((item) => {
      const game = getGame(item.gameId);
      const rate = item.total > 0 ? Math.round((item.correct / item.total) * 100) : 0;
      return `
        <article class="history-item" data-action="open-history-result" data-history-id="${item.id}" role="button" tabindex="0">
          <div class="history-main">
            <span class="game-icon color-${item.gameColor || game?.color || "yellow"}">${iconSvg(item.gameIconName || game?.iconName || "gamepad", "game-icon-svg")}</span>
            <div>
              <input type="text" value="${escapeHtml(item.title)}" data-action="update-history-title" data-history-id="${item.id}" aria-label="히스토리 제목" />
              <p>${formatDate(new Date(item.playedAt))}</p>
            </div>
          </div>
          <div class="history-score">
            <span class="green">${iconSvg("check")}${item.correct}</span>
            <span class="red">${iconSvg("x")}${item.wrong}</span>
            <span class="sky">${iconSvg("skip")}${item.passed}</span>
            <span>${rate}%</span>
            <span>${formatDuration(item.elapsedSeconds)}</span>
            <button type="button" data-action="select-game" data-game-id="${item.gameId}" aria-label="다시 하기">
              ${iconSvg("refresh")}
            </button>
            <button type="button" data-action="delete-history" data-history-id="${item.id}" aria-label="삭제">
              ${iconSvg("x")}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function updateHistoryTitle(historyId, title) {
  setHistory(getHistory().map((item) => (item.id === historyId ? { ...item, title } : item)));
}

function deleteHistory(historyId) {
  setHistory(getHistory().filter((item) => item.id !== historyId));
  renderHistory();
}

function clearHistory() {
  setHistory([]);
  renderHistory();
  showToast("히스토리를 삭제했습니다.");
}

function getMixCounts() {
  return {
    easy: Math.max(0, Number(elements.mixEasy.value) || 0),
    normal: Math.max(0, Number(elements.mixNormal.value) || 0),
    hard: Math.max(0, Number(elements.mixHard.value) || 0),
  };
}

function syncWordCountFromMix() {
  const game = getGame(state.selectedGameId);
  if (!game) return;
  const counts = getAvailableCounts(game);
  elements.mixEasy.value = String(Math.min(Math.max(0, Number(elements.mixEasy.value) || 0), counts.easy));
  elements.mixNormal.value = String(Math.min(Math.max(0, Number(elements.mixNormal.value) || 0), counts.normal));
  elements.mixHard.value = String(Math.min(Math.max(0, Number(elements.mixHard.value) || 0), counts.hard));
  const total = Object.values(getMixCounts()).reduce((sum, value) => sum + value, 0);
  elements.wordCount.value = String(Math.max(1, total));
  elements.totalWordCount.textContent = `${total}개`;
}

function adjustNumberInput(input, delta, min = 0, max = Number.POSITIVE_INFINITY) {
  input.value = String(Math.min(max, Math.max(min, (Number(input.value) || 0) + delta)));
}

function setAllWordsCount() {
  const game = getGame(state.selectedGameId);
  if (!game) return;
  const counts = getAvailableCounts(game);
  if (game.words?.all) {
    elements.wordCount.value = String(counts.all);
    return;
  }
  setMixCounts({ easy: counts.easy, normal: counts.normal, hard: counts.hard });
}

function setTimeMode(mode) {
  elements.timeMode.value = mode;
  elements.timerSecondsWrap.hidden = mode !== "timer";
  $$(".time-mode-toggle button").forEach((button) => button.classList.toggle("is-active", button.dataset.mode === mode));
}

function updateTimerLabel() {
  const seconds = Math.max(5, Number(elements.timerSeconds.value) || 180);
  elements.timerSeconds.value = String(seconds);
  elements.timerLabel.textContent = formatDuration(seconds);
  $$(".timer-presets button").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.seconds) === seconds);
  });
}

function handleSetupSubmit(event) {
  event.preventDefault();
  const game = getGame(state.selectedGameId);
  if (!game) return;

  const useSinglePool = Boolean(game.words?.all);
  const difficulty = game.fixedDifficulty || (useSinglePool ? "all" : "mixed");
  const mixCounts = getMixCounts();
  const counts = getAvailableCounts(game);
  const wordCountMax = useSinglePool ? Math.max(1, counts.all || 1) : Number.POSITIVE_INFINITY;
  const wordCount = Math.min(wordCountMax, Math.max(1, Number(elements.wordCount.value) || 1));
  const timerSeconds = Math.max(5, Number(elements.timerSeconds.value) || 60);

  startGame({
    gameId: game.id,
    difficulty,
    wordCount,
    mixCounts,
    useAllWords: false,
    mode: elements.timeMode.value,
    timerSeconds,
  });
}

function restoreRoute(route = parseRoute()) {
  state.routeRestoring = true;

  if (route.view === "setup" && route.gameId) {
    renderSetup(route.gameId, { pushHistory: false });
  } else if (route.view === "play" && route.gameId) {
    if (state.activeSession?.gameId === route.gameId) {
      setView("play", { pushHistory: false, gameId: route.gameId });
      renderPlay();
    } else {
      renderSetup(route.gameId, { pushHistory: false, replaceHistory: true });
      history.replaceState({ view: "setup", gameId: route.gameId }, "", getRouteUrl("setup", route.gameId));
    }
  } else if (route.view === "result") {
    setView("result", { pushHistory: false });
  } else if (route.view === "mypage") {
    setView("mypage", { pushHistory: false });
  } else {
    setView("home", { pushHistory: false });
  }

  state.routeRestoring = false;
}

window.addEventListener("popstate", (event) => {
  restoreRoute(event.state || parseRoute());
});

document.addEventListener("click", (event) => {
  if (event.target === elements.historyResultModal) {
    closeHistoryResult();
    return;
  }

  const target = event.target.closest("[data-action], [data-view-target]");
  if (!target) return;

  if (target.dataset.viewTarget) {
    setView(target.dataset.viewTarget);
    return;
  }

  const action = target.dataset.action;
  const gameId = target.dataset.gameId;
  const historyId = target.dataset.historyId;

  if (action === "go-home") setView("home");
  if (action === "back-to-setup" && state.activeSession) renderSetup(state.activeSession.gameId);
  if (action === "select-game") renderSetup(gameId);
  if (action === "toggle-favorite") {
    event.stopPropagation();
    toggleFavorite(gameId);
  }
  if (action === "mark") markAnswer(target.dataset.result);
  if (action === "next-word") moveNext(true);
  if (action === "previous-word") movePrevious();
  if (action === "reset-words") resetWords();
  if (action === "finish-game") finishGame("직접 종료");
  if (action === "restart-game" && state.lastSettings) startGame(state.lastSettings);
  if (action === "delete-history") deleteHistory(historyId);
  if (action === "clear-history") clearHistory();
  if (action === "set-mypage-tab") setMyPageTab(target.dataset.tab);
  if (action === "open-history-result") openHistoryResult(historyId);
  if (action === "close-history-result") closeHistoryResult();
  if (action === "reset-mix") resetMixCounts();
  if (action === "adjust-word-count") {
    const maxWords = Number(elements.wordCount.max) || Number.POSITIVE_INFINITY;
    adjustNumberInput(elements.wordCount, Number(target.dataset.delta), 1, maxWords);
  }
  if (action === "use-all-words") setAllWordsCount();
  if (action === "toggle-sound") toggleSound();
  if (action === "adjust-timer") {
    adjustNumberInput(elements.timerSeconds, Number(target.dataset.delta), 5, 600);
    updateTimerLabel();
  }
  if (action === "set-timer") {
    elements.timerSeconds.value = target.dataset.seconds;
    updateTimerLabel();
  }
  if (action === "set-time-mode") setTimeMode(target.dataset.mode);
  if (action === "adjust-mix") {
    const input = elements[`mix${target.dataset.level[0].toUpperCase()}${target.dataset.level.slice(1)}`];
    adjustNumberInput(input, Number(target.dataset.delta), 0, Number(input.max) || Number.POSITIVE_INFINITY);
    syncWordCountFromMix();
  }
});

document.addEventListener("input", (event) => {
  const target = event.target;
  if (target === elements.search) renderGameList();
  if ([elements.mixEasy, elements.mixNormal, elements.mixHard].includes(target)) syncWordCountFromMix();
  if (target === elements.timerSeconds) updateTimerLabel();
  if (target.dataset.action === "update-history-title") updateHistoryTitle(target.dataset.historyId, target.value);
});

document.addEventListener("change", (event) => {
  const target = event.target;
  if (target === elements.timeMode) setTimeMode(target.value);
  if (target === elements.wordCount) {
    const maxWords = Number(elements.wordCount.max) || Number.POSITIVE_INFINITY;
    elements.wordCount.value = String(Math.min(maxWords, Math.max(1, Number(elements.wordCount.value) || 1)));
  }
});

document.addEventListener("keydown", (event) => {
  if (!elements.historyResultModal.hidden && event.key === "Escape") {
    event.preventDefault();
    closeHistoryResult();
    return;
  }

  const isEditableTarget = ["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(event.target.tagName);
  const historyTarget = !isEditableTarget ? event.target.closest?.("[data-action='open-history-result']") : null;
  if (historyTarget && ["Enter", " "].includes(event.key)) {
    event.preventDefault();
    openHistoryResult(historyTarget.dataset.historyId);
    return;
  }

  if (state.view !== "play") return;
  const key = event.key.toLowerCase();

  if (["enter", "o"].includes(key)) {
    event.preventDefault();
    markAnswer("correct");
  }
  if (["backspace", "x"].includes(key)) {
    event.preventDefault();
    markAnswer("wrong");
  }
  if (key === "arrowright") {
    event.preventDefault();
    moveNext(true);
  }
  if (key === "arrowleft") {
    event.preventDefault();
    movePrevious();
  }
});

elements.setupForm.addEventListener("submit", handleSetupSubmit);

// 페이지에서 처음 발생하는 사용자 제스처에 오디오를 미리 잠금 해제한다.
(function primeAudioOnFirstGesture() {
  const events = ["pointerdown", "touchend", "click", "keydown"];
  const handler = () => {
    unlockAudio();
    if (state.audioContext && state.audioContext.state === "running") {
      events.forEach((type) => document.removeEventListener(type, handler));
    }
  };
  events.forEach((type) => document.addEventListener(type, handler, { passive: true }));
})();

// 모바일은 탭을 백그라운드로 보내면 컨텍스트가 suspended 되므로 복귀 시 재개한다.
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && state.audioContext?.state === "suspended") {
    state.audioContext.resume().catch(() => {});
  }
});

state.soundEnabled = readStorage(STORAGE_KEYS.soundEnabled, true) !== false;
renderSoundToggle();
renderGameList();
updateTimerLabel();
const initialRoute = parseRoute();
history.replaceState(initialRoute, "", getRouteUrl(initialRoute.view, initialRoute.gameId));
restoreRoute(initialRoute);
hydrateIcons(document);
