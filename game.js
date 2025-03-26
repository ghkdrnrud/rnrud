const gameContainer = document.getElementById('game');
let level = 1; // 초기 단계
let symbols = []; // 각 단계에서 사용할 심볼 배열
let revealedBlocks = [];
let matchedBlocks = [];
let totalBlocks = level * 2; // 각 단계에서 블록의 수 계산

// 심볼 초기화 함수
function initSymbols() {
  const baseSymbols = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍍', '🍒', '🥝'];
  symbols = [];
  for (let i = 0; i < totalBlocks / 2; i++) {
    symbols.push(baseSymbols[i % baseSymbols.length]);
  }
  symbols = [...symbols, ...symbols].sort(() => Math.random() - 0.5); // 랜덤으로 섞기
}

// 게임 초기화 함수
function initGame() {
  revealedBlocks = [];
  matchedBlocks = [];
  totalBlocks = level * 2; // 단계별 블록 개수 증가
  gameContainer.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(totalBlocks))}, 100px)`;
  gameContainer.innerHTML = ''; // 이전 단계의 블록 삭제
  initSymbols();

  symbols.forEach((symbol, index) => {
    const block = document.createElement('div');
    block.classList.add('block', 'hidden');
    block.setAttribute('data-index', index);
    block.setAttribute('data-symbol', symbol);
    gameContainer.appendChild(block);

    block.addEventListener('click', () => {
      if (matchedBlocks.includes(index) || revealedBlocks.length === 2) {
        return;
      }

      block.textContent = symbol;
      block.classList.remove('hidden');
      revealedBlocks.push(index);

      if (revealedBlocks.length === 2) {
        const [firstIndex, secondIndex] = revealedBlocks;
        const firstBlock = document.querySelector(`[data-index="${firstIndex}"]`);
        const secondBlock = document.querySelector(`[data-index="${secondIndex}"]`);

        if (firstBlock.dataset.symbol === secondBlock.dataset.symbol) {
          matchedBlocks.push(firstIndex, secondIndex);
          revealedBlocks = [];
        } else {
          setTimeout(() => {
            firstBlock.textContent = '';
            firstBlock.classList.add('hidden');
            secondBlock.textContent = '';
            secondBlock.classList.add('hidden');
            revealedBlocks = [];
          }, 1000);
        }
      }

      if (matchedBlocks.length === symbols.length) {
        setTimeout(() => {
          alert(`Level ${level} Complete!`);
          level++;
          if (level > 100) {
            alert('You have completed all levels! 🎉');
            level = 1; // 게임을 다시 시작
          }
          initGame(); // 다음 단계 시작
        }, 500);
      }
    });
  });
}

// 게임 시작
initGame();
